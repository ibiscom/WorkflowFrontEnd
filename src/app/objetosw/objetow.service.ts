import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { ObjetowEntity } from './objetow.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de grupos.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class ObjetowService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
       * Crea un nuevo objeto workflow.
       * @param objetow La información del objeto workflow a crear.
       * @returns 
       */
      public createObjetow(objetow: ObjetowEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.put<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/WObject/create`, objetow
          );
      }

  /**
       * Crea un nuevo objeto workflow.
       * @param objetow La información del objeto workflow a crear.
       * @returns 
       */
      public createAttribute(objetow: ObjetowEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.put<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/WObject/createAttibute`, objetow
          );
      }
    
      /**
       * Edita la información de un objeto workflow existente.
       * @param objetow La información del dependencia a modificar.
       * @returns 
       */
      public editObjetow(objetow: ObjetowEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.post<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/WObject/edit`, objetow
          );
      }

      /**
       * Edita la información de un objeto workflow existente.
       * @param objetow La información del dependencia a modificar.
       * @returns 
       */
      public editAttribute(objetow: ObjetowEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.post<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/WObject/editAttributes`, objetow
          );
      }
    
      /**
       * Obtiene la información de un dependencia existente.
       * @param objetowName La información del dependencia a consultar.
       * @returns 
       */
      public getObjetow(objetowName: string): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.get<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/WObject/getWObject?objetowName=${objetowName}`
          );
      }
    
      /**
       * Obtiene el listado de los estados que puede tener un dependency.
       * @returns 
       */
      public getAttributes(): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.get<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/WObject/Attributes`);
      }

    /**
       * Obtiene el listado de los estados que puede tener un dependency.
       * @returns 
       */
      public getAttribute(): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.get<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/WObject/Attribute`);
      }
    
      /**
       * Elimina un dependencia, dado su identificador
       * @param objetowName Nombre del dependencia a eliminar
       * @returns 
       */
      public deleteObjetow(objetowName: string): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.delete<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/WObject/delete?objetowName=${objetowName}`);
      }

      /**
       * Elimina un dependencia, dado su identificador
       * @param attributeName Nombre del dependencia a eliminar
       * @returns 
       */
      public deleteAttribute(attributeName: string): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.delete<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/WObject/deleteattibute?attributeName=${attributeName}`);
      }
    }
    
    