import { Injectable } from '@angular/core';
import { ProfileSearchFilterEntity } from '../entities/profiles/profile-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { ProfileEntity } from '../entities/profiles/profile.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PerfilesService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Busca perfiles según los filtros proporcionados.
   * @param profileServerFilter Filtros de búsqueda (usuario, nombre de perfil).
   * @returns Observable con la respuesta y el listado de perfiles.
   */
  public searchProfiles(
    profileServerFilter: ProfileSearchFilterEntity,
  ): Observable<FsResponseEntity<ProfileEntity[]>> {
    return this.http.get<FsResponseEntity<ProfileEntity[]>>(
      environment.frameSecApiUrl +
        `/profile/getProfiles?userName=${profileServerFilter.userName}&profileName=${profileServerFilter.profileName}`,
    );
  }

  /**
   * Obtiene la información de un perfil específico.
   * @param userGenerator Usuario que realiza la consulta.
   * @param profileName Nombre del perfil.
   * @returns Observable con la respuesta y la entidad de perfil.
   */
  public getProfile(
    userGenerator: string,
    profileName: string,
  ): Observable<FsResponseEntity<ProfileEntity>> {
    return this.http.get<FsResponseEntity<ProfileEntity>>(
      environment.frameSecApiUrl +
        `/profile/getProfile?userName=${userGenerator}&profileName=${profileName}`,
    );
  }

  /**
   * Obtiene las operaciones asociadas a un perfil.
   * @param userGenerator Usuario que realiza la consulta.
   * @param profileName Nombre del perfil.
   * @returns Observable con la respuesta y la lista de operaciones.
   */
  public getOperationsByProfile(
    userGenerator: string,
    profileName: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/profile/getPermissions?userName=${userGenerator}&profileName=${profileName}`,
    );
  }
  /**
   * Obtiene las operaciones restringidas (no permitidas) de un perfil.
   * @param userGenerator Usuario que realiza la consulta.
   * @param profileName Nombre del perfil.
   * @returns Observable con la respuesta y la lista de restricciones.
   */
  public getRestrictedOperationsByProfile(
    userGenerator: string,
    profileName: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/profile/getRestrictions?userName=${userGenerator}&profileName=${profileName}`,
    );
  }

  /**
   * Crea un nuevo perfil.
   * @param profile Entidad del perfil a crear.
   * @returns Observable con la respuesta del servidor.
   */
  public createProfile(
    profile: ProfileEntity,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    profile.ip = ip;
    return this.http.put<FsResponseEntity<any>>(
      environment.frameSecApiUrl + `/profile/create`,
      profile,
    );
  }

  /**
   * Edita un perfil existente.
   * @param profile Entidad del perfil con los datos a modificar.
   * @returns Observable con la respuesta del servidor.
   */
  public editProfile(
    profile: ProfileEntity,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    profile.ip = ip;
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl + `/profile/edit`,
      profile,
    );
  }

  /**
   * Agrega una operación/permiso a un perfil.
   * @param userGenerator Usuario que realiza la acción.
   * @param profileName Nombre del perfil.
   * @param permission Operación/permiso a agregar.
   * @returns Observable con la respuesta del servidor.
   */
  public addOperationToProfile(
    userGenerator: string,
    profileName: string,
    permission: string,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/profile/addPermission?userName=${userGenerator}&profileName=${profileName}&permission=${permission}&ip=${ip}`,
      {},
    );
  }

  /**
   * Agrega una restricción (operación no permitida) a un perfil.
   * @param userGenerator Usuario que realiza la acción.
   * @param profileName Nombre del perfil.
   * @param operation Operación a restringir.
   * @returns Observable con la respuesta del servidor.
   */
  public removeOperationFromProfile(
    userGenerator: string,
    profileName: string,
    operation: string,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/profile/addRestriction?userName=${userGenerator}&profileName=${profileName}&restriction=${operation}&ip=${ip}`,
      {},
    );
  }

  /**
   * Elimina un perfil del sistema.
   * @param userGenerator Usuario que realiza la acción.
   * @param profileName Nombre del perfil a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  public deleteProfile(
    userGenerator: string,
    profileName: string | undefined,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.delete<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/profile/delete?userName=${userGenerator}&profileName=${profileName}&ip=${ip}`,
    );
  }
}
