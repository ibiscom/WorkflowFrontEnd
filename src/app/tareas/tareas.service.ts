import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { TareasEntity } from './tareas.entity';
import { TareasFilterEntity } from './TareasFilterEntity';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de grupos.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class TareasService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
       * Crea un nueva tarea.
       * @param tarea La información de la tarea a crear.
       * @returns 
       */
      public createTarea(tarea: TareasEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.put<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/task/create`, tarea
          );
      }
  
     /**
       * Obtiene el listado de dependencias según los filtros proporcionados.
       * @param filtros Los filtros para la búsqueda de dependencias.
       * @returns 
       */
  
     
      public getTareas(filtros: TareasFilterEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.post<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/task/getTasks`, filtros
          );
      }
        
    
      /**
       * Edita la información de una tarea existente.
       * @param tarea La información de la tarea a modificar.
       * @returns 
       */
      public editTareas(tarea: TareasEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.post<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/task/edit`, tarea
          );
      }
    
      /**
       * Obtiene la información de una tarea existente.
       * @param tareaName La información de la tarea a consultar.
       * @returns 
       */
      public getTarea(tareaName: string): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.get<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/task/getTask?taskName=${tareaName}`
          );
      }
    
      /**
       * Obtiene el listado de los tipos que puede tener una tarea.
       * @returns 
       */
      public getTipos(): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.get<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/task/getTypes`);
      }

      /**
   * Obtiene el listado de herramientas de un workflow seleccionado
   * @param filtros la informacion del workflow seleccionado Los filtros para la búsqueda de herramientas.
   * @returns 
   */
  public getHerramientas(workflowName: string): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Task/getTools?workflowName=${workflowName}`
      );
  }
    

        /**
   * Obtiene el listado de herramientas de un workflow seleccionado
   * @param filtros la informacion del workflow seleccionado Los filtros para la búsqueda de herramientas.
   * @returns 
   */
  public getRoles(workflowName: string): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Task/getRoles?workflowName=${workflowName}`
      );
  }
      /**
       * Elimina un tarea, dado su identificador
       * @param tareaName Nombre del tarea a eliminar
       * @returns 
       */
      public deleteTarea(tareaName: string): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.delete<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/task/delete?taskName=${tareaName}`);
      }
    }
    
    