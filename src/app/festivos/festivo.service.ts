import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

export interface HolidayDTO {
  fecha: string;
  descripcion: string;
}

export interface SaveHolidaysRequestDTO {
  addHolidaysDTO: HolidayDTO[];
  removeHolidaysDTO: HolidayDTO[];
}

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de grupos.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class FestivoService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Busca grupos según los filtros proporcionados.
   * @param groupServerFilter Filtros de búsqueda (usuario, nombre de grupo, supervisor).
   * @returns Observable con la respuesta y el listado de grupos.
   */
  public searchGroups(
    groupServerFilter: GroupSearchFilterEntity,
  ): Observable<FsResponseEntity<GroupEntity[]>> {
    return this.http.get<FsResponseEntity<GroupEntity[]>>(
      environment.workflowApiUrl +
        `/group/getGroups?userName=${groupServerFilter.userName}&groupName=${groupServerFilter.groupName}&supervisor=${groupServerFilter.supervisor}`,
    );
  }

  /**
   * Obtiene la información de un grupo específico.
   * @param userGenerator Usuario que realiza la consulta.
   * @param groupName Nombre del grupo.
   * @returns Observable con la respuesta y la entidad de grupo.
   */
  public getGroup(
    userGenerator: string,
    groupName: string,
  ): Observable<FsResponseEntity<GroupEntity>> {
    return this.http.get<FsResponseEntity<GroupEntity>>(
      environment.workflowApiUrl +
        `/group/getGroup?userName=${userGenerator}&groupName=${groupName}`,
    );
  }

  /**
   * Obtiene las operaciones asociadas a un grupo.
   * @param userGenerator Usuario que realiza la consulta.
   * @param groupName Nombre del grupo.
   * @returns Observable con la respuesta y la lista de operaciones.
   */
  public getOperationsByGroup(
    userGenerator: string,
    groupName: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.workflowApiUrl +
        `/group/getPermissions?userName=${userGenerator}&groupName=${groupName}`,
    );
  }
  /**
   * Obtiene las operaciones restringidas (no permitidas) de un grupo.
   * @param userGenerator Usuario que realiza la consulta.
   * @param groupName Nombre del grupo.
   * @returns Observable con la respuesta y la lista de restricciones.
   */
  public getRestrictedOperationsByGroup(
    userGenerator: string,
    groupName: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.workflowApiUrl +
        `/group/getRestrictions?userName=${userGenerator}&groupName=${groupName}`,
    );
  }

  /**
   * Crea un nuevo grupo.
   * @param group Entidad del grupo a crear.
   * @returns Observable con la respuesta del servidor.
   */
  public createGroup(group: GroupEntity): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    group.ip = ip;
    return this.http.put<FsResponseEntity<any>>(
      environment.workflowApiUrl + `/group/create`,
      group,
    );
  }

  /**
   * Edita un grupo existente.
   * @param group Entidad del grupo con los datos a modificar.
   * @returns Observable con la respuesta del servidor.
   */
  public editGroup(group: GroupEntity): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    group.ip = ip;
    return this.http.post<FsResponseEntity<any>>(
      environment.workflowApiUrl + `/group/edit`,
      group,
    );
  }

  /**
   * Agrega una operación/permiso a un grupo.
   * @param userGenerator Usuario que realiza la acción.
   * @param groupName Nombre del grupo.
   * @param permission Operación/permiso a agregar.
   * @returns Observable con la respuesta del servidor.
   */
  public addOperationToGroup(
    userGenerator: string,
    groupName: string,
    permission: string,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.workflowApiUrl +
        `/group/addPermission?userName=${userGenerator}&groupName=${groupName}&permission=${permission}&ip=${ip}`,
      {},
    );
  }

  /**
   * Agrega una restricción (operación no permitida) a un grupo.
   * @param userGenerator Usuario que realiza la acción.
   * @param groupName Nombre del grupo.
   * @param operation Operación a restringir.
   * @returns Observable con la respuesta del servidor.
   */
  public removeOperationFromGroup(
    userGenerator: string,
    groupName: string,
    operation: string,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.workflowApiUrl +
        `/group/addRestriction?userName=${userGenerator}&groupName=${groupName}&restriction=${operation}&ip=${ip}`,
      {},
    );
  }

  /**
   * Elimina un grupo del sistema.
   * @param userGenerator Usuario que realiza la acción.
   * @param groupName Nombre del grupo a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  public deleteGroup(
    userGenerator: string,
    groupName: string | undefined,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.delete<FsResponseEntity<any>>(
      environment.workflowApiUrl +
        `/group/delete?userName=${userGenerator}&groupName=${groupName}&ip=${ip}`,
    );
  }

  /**
   * Convierte una fecha a ISO usando "UTC midnight" (siempre `T00:00:00.000Z`).
   * Esto evita que la zona horaria del navegador altere el valor.
   */
  private toIsoLocalMidday(date: Date): string {
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0,
      ),
    ).toISOString();
  }

  /**
   * Obtiene los festivos del mes indicado por la fecha base (p. ej. 2026-05-01).
   * Si el mes no tiene festivos, el backend puede responder HTTP 400.
   */
  public getHolidays(fechaBase: Date): Observable<FsResponseEntity<HolidayDTO[]>> {
    const iso = this.toIsoLocalMidday(fechaBase);
    return this.http.get<FsResponseEntity<HolidayDTO[]>>(
      `${environment.workflowApiUrl}/holiday/getHolidays`,
      { params: { fecha: iso } },
    );
  }

  /**
   * Consulta si una fecha específica es festivo.
   */
  public getHoliday(fecha: Date): Observable<FsResponseEntity<HolidayDTO[]>> {
    const iso = this.toIsoLocalMidday(fecha);
    return this.http.get<FsResponseEntity<HolidayDTO[]>>(
      `${environment.workflowApiUrl}/holiday/getHoliday`,
      { params: { fecha: iso } },
    );
  }

  /**
   * Guarda cambios agregando o quitando festivos de un calendario.
   */
  public saveHolidays(payload: SaveHolidaysRequestDTO): Observable<FsResponseEntity<boolean>> {
    return this.http.post<FsResponseEntity<boolean>>(
      `${environment.workflowApiUrl}/holiday/save`,
      payload,
    );
  }
}
