import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { DistribuirtareaEntity } from './distribuirtarea.entity';
import { DistribuirTareaFilterEntity } from './distribuirtareaFilterEntity';


@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de grupos.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class DistribuirtareaService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  
     /**
       * Obtiene el listado de dependencias según los filtros proporcionados.
       * @param filtros Los filtros para la búsqueda de dependencias.
       * @returns 
       */
  
     
      public getDistribuirtareas(filtros: DistribuirTareaFilterEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.post<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/workflowEngine/getWorkflowsEngine`, filtros
          );
      }

         /**
       * Obtiene el listado de dependencias según los filtros proporcionados.
       * @param filtros Los filtros para la búsqueda de dependencias.
       * @returns 
       */
  
     
      public getEstadotareas(filtros: DistribuirTareaFilterEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.post<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/taskList/status`, filtros
          );
      }
       /**
       * Obtiene la lista de tareas instantiadas.
       * @param list Los filtros para la búsqueda de tareas.
       * @returns 
       */

      public getTareasInstanciadas(list: DistribuirTareaFilterEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.post<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/taskList/getInstantiatedTasks`, list
          );
      }

      
       /**
       * Obtiene la lista de tareas instantiadas.
       * @param list Los filtros para la búsqueda de tareas.
       * @returns 
       */

      public getListaResponsables(list: DistribuirTareaFilterEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.post<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/UserRol/getResponsibleUsers`, list
          );
      }
    
}
    