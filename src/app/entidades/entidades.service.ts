import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { EntidadesEntity } from './entidades.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de Entidades.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class EntidadesService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

    /**
     * Crea una nueva entidad.
     * @param entidades La información del rol a crear.
     * @returns 
     */
    public createEntidad(entidades: EntidadesEntity): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.put<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/BussinesUnit/create`, entidades
        );
    }/* OK1 */
  
   /*
     * Obtiene el listado de entidades según los filtros proporcionados.
     * @param filtros Los filtros para la búsqueda de entidades.
     * @returns 
     */
   
    public getEntidades(userName: string): Observable<FsResponseEntity<any>> {
  return this.http.get<FsResponseEntity<any>>(
    `${environment.workflowApiUrl}/BussinesUnit/getBussinesUnits`,
    {
      params: { userName: userName }
    }
  );
}
  
    /**
     * Edita la información de un rol existente.
     * @param entidades La información del rol a modificar.
     * @returns 
     */
    public editEntidad(entidad: EntidadesEntity): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.post<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/BussinesUnit/edit`, entidad
        );
    }
  
    /**
     * Obtiene la información de una entidad  existente.
     * @param entidadesName La información de la entidad a consultar.
     * @returns 
     */
    public getEntidad(entidadIde: number, entidadName: string): Observable<FsResponseEntity<any>> {
  let ip: string = this.cookieService.get('ip');

  return this.http.get<FsResponseEntity<any>>(
    `${environment.workflowApiUrl}/BussinesUnit/getBussinesUnit?bussinesUnitIde=${entidadIde}&bussinesUnitName=${entidadName}`
  );
}

  /*ok 8*/

    /**
     * Obtiene el listado de grupos (responsables).
     * @returns 
     */
    public getGroups(userName: string, groupName: string): Observable<FsResponseEntity<string[]>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.get<FsResponseEntity<string[]>>(
          environment.workflowApiUrl +
            `/BussinesUnit/getGroups?userName=${userName}&groupName=${groupName}`);
    }

    /**
     * Obtiene el listado de grupos (responsables) que puede tener un rol.
     * @returns 
     */
    public getGroupsRol(nombreRol: string, userName: string): Observable<FsResponseEntity<string[]>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.get<FsResponseEntity<string[]>>(
          environment.workflowApiUrl +
            `/BussinesUnit/getGroupsRol?rolName=${nombreRol}&userName=${userName}`);
    }
  /* ok 5 */

    /**
     * Elimina un rol, dado su identificador
     * @param entidadesName Nombre del rol a eliminar
     * @returns 
     */
    public deleteEntidad(entidadName: string): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.delete<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/BussinesUnit/delete?bussinesUnitName=${entidadName}bussinessUnitide={entidadIde}`);
    }
  }
  