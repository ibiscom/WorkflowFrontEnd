import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { RolesEntity } from './roles.entity';
import { RolesFilterEntity } from './roles-filter.entity';


@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de roles.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class RolesService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

    /**
     * Crea un nuevo rol.
     * @param roles La información del rol a crear.
     * @returns 
     */
    public createRole(roles: RolesEntity): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.put<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/Rol/create`, roles
        );
    }
  
    /**
     * Obtiene el listado de roles según los filtros proporcionados.
     * @param filtros Los filtros para la búsqueda de roles.
     * @returns 
     */
    public getRols(filtros: RolesFilterEntity): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.post<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/Rol/getRols`, filtros
        );
    }
  
    /**
     * Edita la información de un rol existente.
     * @param roles La información del rol a modificar.
     * @returns 
     */
    public editRol(rol: RolesEntity): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.post<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/Rol/edit`, rol
        );
    }
  
    /**
     * Obtiene la información de un rol existente.
     * @param rolesName La información del rol a consultar.
     * @returns 
     */
    public getRol(rolesName: string): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.get<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/Rol/getRol?rolName=${rolesName}`
        );
    }
  
    /**
     * Obtiene el listado de grupos (responsables).
     * @returns 
     */
    public getGroups(): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.get<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/Rol/getGroups`);
    }

    /**
     * Obtiene el listado de grupos (responsables) que puede tener un rol.
     * @returns 
     */
    public getGroupsRol(): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.get<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/Rol/getGroupsRol`);
    }
  
    /**
     * Elimina un rol, dado su identificador
     * @param rolesName Nombre del rol a eliminar
     * @returns 
     */
    public deleteRol(rolesName: string): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.delete<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/Rol/delete?rolName=${rolesName}`);
    }
  }
  