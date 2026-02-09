import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { DependenciaEntity } from './dependencia.entity';
import { DependenciaFilterEntity } from './dependencia-filter.entity';



@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de grupos.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class DependenciaService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
     * Crea un nuevo dependencia.
     * @param dependencia La información del dependencia a crear.
     * @returns 
     */
    public createDependency(dependencia: DependenciaEntity): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.put<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/dependency/create`, dependencia
        );
    }

   /**
     * Obtiene el listado de dependencias según los filtros proporcionados.
     * @param filtros Los filtros para la búsqueda de dependencias.
     * @returns 
     */

   
    public buscarDependencia(filtros: DependenciaFilterEntity): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.post<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/dependency/getDependencies`, filtros
        );
    }
      
  
    /**
     * Edita la información de un dependencia existente.
     * @param dependencia La información del dependencia a modificar.
     * @returns 
     */
    public editDependencia(dependencia: DependenciaEntity): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.post<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/dependency/edit`, dependencia
        );
    }
  
    /**
     * Obtiene la información de un dependencia existente.
     * @param dependenciaName La información del dependencia a consultar.
     * @returns 
     */
    public getDependencia(dependenciaName: string): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.get<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/dependency/getDependency?dependencyName=${dependenciaName}`
        );
    }
  
    /**
     * Obtiene el listado de los estados que puede tener un dependency.
     * @returns 
     */
    public getEstado(): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.get<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/dependency/getStatus`);
    }
  
    /**
     * Elimina un dependencia, dado su identificador
     * @param dependenciaName Nombre del dependencia a eliminar
     * @returns 
     */
    public deleteDependencia(dependenciaName: string): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.delete<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/dependency/delete?dependencyName=${dependenciaName}`);
    }
  }
  
  