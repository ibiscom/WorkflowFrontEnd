import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { FinalizarprocesoEntity } from './finalizarproceso.entity';
import { FinalizarprocesoFilterEntity } from './finalizarprocesoFilterEntity';


@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de grupos.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class FinalizarprocesoService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  
     /**
       * Obtiene el listado de dependencias según los filtros proporcionados.
       * @param filtros Los filtros para la búsqueda de dependencias.
       * @returns 
       */
  
     
      public getFinalizarproceso(filtros: FinalizarprocesoFilterEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.post<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/workflowEngine/getWorkflowsEngine`, filtros
          );
      }
        
    
    
      /**
       * Elimina un tarea, dado su identificador
       * @param tareaName Nombre del tarea a eliminar
       * @returns 
       */
      public deleteFinalizarproceso(tareaName: string): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.delete<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/workflowEngine/end${tareaName}`);
      }
    
}
    