import { Injectable } from '@angular/core';
import { UserSearchFilterEntity } from '../entities/users/user-search-filter.entity';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { of, Observable, delay } from 'rxjs';
import { StatusEntity } from '../entities/domains/status.entity';
import { CreateUserEntity } from '../entities/users/create-user.entity';
import { UserMassiveLoadRequestEntity } from '../entities/users/user-massive-load-request.entity';
import { UserEntity } from '../entities/users/user.entity';
import { AreaEntity } from '../entities/areas/area.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { ProfileEntity } from '../entities/profiles/profile.entity';
import { DocumentTypeEntity } from '../entities/domains/document-type.entity';
import { CompanyEntity } from '../entities/companies/company.entity';

/**
 * Servicio para la gestión de usuarios en el sistema.
 * Proporciona métodos para consultar, crear, editar, eliminar usuarios,
 * así como gestionar áreas, grupos, perfiles, permisos y restricciones.
 */
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  public constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Busca usuarios según los filtros indicados.
   * @param userFilter Filtros de búsqueda (nombre, documento, estado, etc.).
   * @returns Observable con la respuesta y el listado de usuarios.
   */
  public searchUsers(
    userFilter: UserSearchFilterEntity,
  ): Observable<FsResponseEntity<UserEntity[]>> {
    return this.http.post<FsResponseEntity<UserEntity[]>>(
      environment.frameSecApiUrl + '/user/getUsers',
      userFilter,
    );
  }

  /**
   * Obtiene el listado de áreas disponibles.
   * @param userGenerator Usuario que realiza la consulta.
   * @returns Observable con la respuesta y el listado de áreas.
   */
  public getAreasList(
    userGenerator: string,
  ): Observable<FsResponseEntity<AreaEntity[]>> {
    return this.http.get<FsResponseEntity<AreaEntity[]>>(
      environment.frameSecApiUrl + `/area/getAll?userName=${userGenerator}`,
    );
  }

  /**
   * Obtiene los grupos a los que pertenece un usuario.
   * @param userGenerator Usuario que realiza la consulta.
   * @param userName Nombre del usuario consultado.
   * @returns Observable con la respuesta y la lista de nombres de grupo.
   */
  public getGroupsOfUserList(
    userGenerator: string,
    userName: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/user/getGroups?userName=${userName}&userGenerator=${userGenerator}`,
    );
  }

  /**
   * Obtiene el listado de grupos existentes.
   * @param userGenerator Usuario que realiza la consulta.
   * @returns Observable con la respuesta y el listado de grupos.
   */
  public getGroupsList(
    userGenerator: string,
  ): Observable<FsResponseEntity<GroupEntity[]>> {
    return this.http.get<FsResponseEntity<GroupEntity[]>>(
      environment.frameSecApiUrl + `/group/getAll?userName=${userGenerator}`,
    );
  }

  /**
   * Obtiene el perfil asignado a un usuario.
   * @param userGenerator Usuario que realiza la consulta.
   * @param userName Nombre del usuario consultado.
   * @returns Observable con la respuesta y el nombre del perfil.
   */
  public getUserProfile(
    userGenerator: string,
    userName: string,
  ): Observable<FsResponseEntity<string>> {
    return this.http.get<FsResponseEntity<string>>(
      environment.frameSecApiUrl +
        `/user/getProfile?userName=${userName}&userGenerator=${userGenerator}`,
    );
  }

  /**
   * Obtiene el listado de perfiles disponibles.
   * @param userGenerator Usuario que realiza la consulta.
   * @returns Observable con la respuesta y el listado de perfiles.
   */
  public getProfilesList(
    userGenerator: string,
  ): Observable<FsResponseEntity<ProfileEntity[]>> {
    return this.http.get<FsResponseEntity<ProfileEntity[]>>(
      environment.frameSecApiUrl + `/profile/getAll?userName=${userGenerator}`,
    );
  }

  /**
   * Obtiene el listado de tipos de documento.
   * @param userGenerator Usuario que realiza la consulta.
   * @returns Observable con la respuesta y la lista de tipos de documento.
   */
  public getDocumentTypesList(
    userGenerator: string,
  ): Observable<FsResponseEntity<DocumentTypeEntity[]>> {
    return this.http.get<FsResponseEntity<DocumentTypeEntity[]>>(
      environment.frameSecApiUrl + `/typeId/getAll`,
    );
  }

  /**
   * Obtiene el listado de estados disponibles.
   * @param userGenerator Usuario que realiza la consulta.
   * @returns Observable con la respuesta y la lista de estados.
   */
  public getStatusesList(
    userGenerator: string,
  ): Observable<FsResponseEntity<StatusEntity[]>> {
    return of({
      codigo: 200,
      mensaje: 'Estados obtenidos correctamente',
      respuesta: [
        {
          name: 'Activo',
          description: 'Activo',
        },
        {
          name: 'Inactivo',
          description: 'Inactivo',
        },
      ] as StatusEntity[],
    } as FsResponseEntity<StatusEntity[]>).pipe(delay(1000));
  }

  /**
   * Obtiene el listado de compañías.
   * @param userGenerator Usuario que realiza la consulta.
   * @returns Observable con la respuesta y la lista de compañías.
   */
  public getCompaniesList(
    userGenerator: string,
  ): Observable<FsResponseEntity<CompanyEntity[]>> {
    return this.http.get<FsResponseEntity<CompanyEntity[]>>(
      environment.frameSecApiUrl + `/company/getAll?userName=${userGenerator}`,
    );
  }

  /**
   * Genera un reporte de usuarios según los filtros indicados.
   * @param userFilter Filtros de consulta del reporte.
   * @returns Observable con la respuesta y los datos del reporte.
   */
  public getReport(
    userFilter: UserSearchFilterEntity,
  ): Observable<FsResponseEntity<any>> {
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl + '/user/getReport',
      userFilter,
    );
  }

  /**
   * Obtiene las operaciones explícitas del usuario.
   * @param userGenerator Usuario que realiza la consulta.
   * @param userName Usuario consultado.
   * @returns Observable con la respuesta y la lista de operaciones.
   */
  public getOperationsList(
    userGenerator: string,
    userName: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/user/getPermissions?userGenerator=${userGenerator}&userName=${userName}`,
    );
  }

  /**
   * Obtiene las operaciones asociadas a un perfil.
   * @param profileName Nombre del perfil.
   * @param userGenerator Usuario que realiza la consulta.
   * @returns Observable con la respuesta y la lista de operaciones.
   */
  public getOperationsByProfile(
    profileName: string,
    userGenerator: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/profile/getPermissions?userName=${userGenerator}&profileName=${profileName}`,
    );
  }

  /**
   * Obtiene las operaciones asociadas a un grupo.
   * @param groupName Nombre del grupo.
   * @param userGenerator Usuario que realiza la consulta.
   * @returns Observable con la respuesta y la lista de operaciones.
   */
  public getOperationsByGroup(
    groupName: string,
    userGenerator: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/group/getPermissions?userName=${userGenerator}&groupName=${groupName}`,
    );
  }

  /**
   * Obtiene las operaciones restringidas (denegadas) del usuario.
   * @param userGenerator Usuario que realiza la consulta.
   * @param userName Usuario consultado.
   * @returns Observable con la respuesta y la lista de restricciones.
   */
  public getRestrictedOperationsList(
    userGenerator: string,
    userName: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/user/getRestrictions?userGenerator=${userGenerator}&userName=${userName}`,
    );
  }

  /**
   * Crea un nuevo usuario.
   * @param userEntity Entidad del usuario a crear.
   * @returns Observable con la respuesta del servidor.
   */
  public createUser(
    userEntity: CreateUserEntity,
  ): Observable<FsResponseEntity<any>> {
    userEntity.ip = this.cookieService.get('ip');
    return this.http.put<FsResponseEntity<any>>(
      environment.frameSecApiUrl + '/user/create',
      userEntity,
    );
  }

  /**
   * Edita un usuario existente.
   * @param userEntity Entidad del usuario con los datos a modificar.
   * @returns Observable con la respuesta del servidor.
   */
  public editUser(
    userEntity: CreateUserEntity,
  ): Observable<FsResponseEntity<any>> {
    userEntity.ip = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl + '/user/edit',
      userEntity,
    );
  }

  /**
   * Elimina un usuario.
   * @param userGenerator Usuario que realiza la acción.
   * @param userName Nombre del usuario a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  public deleteUser(
    userGenerator: string,
    userName: string,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.delete<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/user/delete?userGenerator=${userGenerator}&userName=${userName}&ip=${ip}`,
      {},
    );
  }

  /**
   * Obtiene la información de un usuario.
   * @param userGenerator Usuario que realiza la consulta.
   * @param userName Nombre del usuario consultado.
   * @returns Observable con la respuesta y la entidad de usuario.
   */
  public getUser(
    userGenerator: string,
    userName: string,
  ): Observable<FsResponseEntity<UserEntity>> {
    return this.http.get<FsResponseEntity<UserEntity>>(
      environment.frameSecApiUrl +
        `/user/getUser?userGenerator=${userGenerator}&userName=${userName}`,
    );
  }

  /**
   * Agrega un permiso a un usuario.
   * @param userGenerator Usuario que realiza la acción.
   * @param userName Usuario destino.
   * @param permission Nombre del permiso/operación.
   * @returns Observable con la respuesta del servidor.
   */
  public addPermissionToUser(
    userGenerator: string,
    userName: string,
    permission: string,
  ): Observable<FsResponseEntity<any>> {
    let ip = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/user/addPermission?userGenerator=${userGenerator}&userName=${userName}&permission=${permission}&ip=${ip}`,
      {},
    );
  }

  /**
   * Agrega una restricción a un usuario.
   * @param userGenerator Usuario que realiza la acción.
   * @param userName Usuario destino.
   * @param restriction Restricción a aplicar.
   * @returns Observable con la respuesta del servidor.
   */
  public addRestrictionToUser(
    userGenerator: string,
    userName: string,
    restriction: string,
  ): Observable<FsResponseEntity<any>> {
    let ip = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/user/addRestriction?userGenerator=${userGenerator}&userName=${userName}&restriction=${restriction}&ip=${ip}`,
      {},
    );
  }

  /**
   * Asigna un perfil a un usuario.
   * @param userGenerator Usuario que realiza la acción.
   * @param userName Usuario destino.
   * @param profile Nombre del perfil a asignar.
   * @returns Observable con la respuesta del servidor.
   */
  public assignProfileToUser(
    userGenerator: string,
    userName: string,
    profile: string,
  ): Observable<FsResponseEntity<any>> {
    let ip = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/user/addProfile?userGenerator=${userGenerator}&userName=${userName}&profile=${profile}&ip=${ip}`,
      {},
    );
  }

  /**
   * Agrega un grupo a un usuario.
   * @param userGenerator Usuario que realiza la acción.
   * @param userName Usuario destino.
   * @param group Nombre del grupo a agregar.
   * @returns Observable con la respuesta del servidor.
   */
  public addGroupToUser(
    userGenerator: string,
    userName: string,
    group: string,
  ): Observable<FsResponseEntity<any>> {
    let ip = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/user/addGroup?userGenerator=${userGenerator}&userName=${userName}&group=${group}&ip=${ip}`,
      {},
    );
  }

  /**
   * Elimina un grupo del usuario.
   * @param userGenerator Usuario que realiza la acción.
   * @param userName Usuario destino.
   * @param group Nombre del grupo a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  public removeGroupToUser(
    userGenerator: string,
    userName: string,
    group: string,
  ): Observable<FsResponseEntity<any>> {
    let ip = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/user/removeGroup?userGenerator=${userGenerator}&userName=${userName}&group=${group}&ip=${ip}`,
      {},
    );
  }

  /**
   * Realiza carga masiva de usuarios.
   * @param userMassiveLoadRequest Objeto con el archivo/contenido y metadatos.
   * @returns Observable con la respuesta del servidor.
   */
  public loadUsersMassively(
    userMassiveLoadRequest: UserMassiveLoadRequestEntity,
  ): Observable<FsResponseEntity<any>> {
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl + `/user/batchUpload`,
      userMassiveLoadRequest,
    );
  }

  /**
   * Realiza desactivación masiva de usuarios.
   * @param selectedUsersForMassiveActions lista de usuarios a desactivar.
   */
  public massDeactivateUsers(
    selectedUsersForMassiveActions: string[],
  ): Observable<FsResponseEntity<any>> {
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl + `/user/massDeactivate`,
      selectedUsersForMassiveActions,
    );
  }
}
