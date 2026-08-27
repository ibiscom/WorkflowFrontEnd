import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { SimulacionEntity } from './simulacion.entity';
import { SimulacionFilterEntity } from './simulacionFilterEntity';


@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de grupos.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class SimulacionService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  
     /**
       * Obtiene el listado de procesos según los filtros proporcionados.
       * @param filtros Los filtros para la búsqueda de procesos.
       * @returns 
       */
  
     
      public getConsultarproceso(filtros: SimulacionFilterEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.post<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/workflow/getWorkflowsName`, filtros
          );
      }
        

          /**
       * Obtiene el listado de procesos instanciados según los filtros proporcionados.
       * @param filtros Los filtros para la búsqueda de procesos instanciados.
       * @returns 
       */
  
     
      public getProcesosInstanciados(filtros: SimulacionFilterEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.post<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/workflowEngine/getWorkflowsEngine`, filtros
          );
      }
    

          /**
       * Permite finalizar procesos finalizados
       * @param filtros Los filtros para la búsqueda de dependencias.
       * @returns 
       */
  
     
      public getSimulacion(filtros: SimulacionFilterEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.post<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/workflowEngine/end`, filtros
          );
      }
    
      /**
       * Elimina un proceso
       * @param tareaName Nombre del proceso a eliminar
       * @returns 
       */
      public deleteSimulacion(tareaName: string): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.delete<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/workflowEngine/endWorkflow/${tareaName}`);
      }
}
    