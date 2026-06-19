import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { EventoInicioEntity } from './eventoinicio.entity';
import { EventoInicioFilterEntity } from './eventoinicio-filter.entity';
import { HerramientaEventoInicioEntity } from './herramienta-eventoinicio.entity';
import { MetodoAsignacionPrimeraTareaEntity } from './metodoasignacion-primeratarea.entity';
import { SerieEventoInicioEntity } from './serie-eventoinicio.entity';
import { TipoDocumentoEventoInicioEntity } from './tipodocumento-eventoinicio.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de eventos de inicio.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class EventoInicioService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
       * Crea un nuevo evento de inicio.
       * @param eventoInicio La información del evento de inicio a crear.
       * @returns 
       */
      public createEventoInicio(eventoInicio: EventoInicioEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.put<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/startEvent/create`, eventoInicio
          );
      }
  
     /**
       * Obtiene el listado de eventos de inicio según los filtros proporcionados.
       * @param filtros Los filtros para la búsqueda de eventos de inicio.
       * @returns 
       */
  
     
      public getEventoInicioList(filtros: EventoInicioFilterEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          const workflowName = encodeURIComponent(filtros.nombreWorkflow ?? '');
          const url =
            environment.workflowApiUrl +
            `/startEvent/getStartEvents?workflowName=${workflowName}`;
          return this.http.get<FsResponseEntity<any>>(url);
      }
        
    
      /**
       * Edita la información de un evento de inicio existente.
       * @param eventoInicio La información del evento de inicio a modificar.
       * @returns 
       */
      public editEventoInicio(eventoInicio: EventoInicioEntity): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.post<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/startEvent/edit`, eventoInicio
          );
      }
    
      /**
        * Obtiene la información de un evento de inicio existente.
       * @param workflowName El nombre del workflow al que pertenece el evento de inicio.
       * @param eventoInicioName El nombre del evento de inicio a consultar.
       * @param userName El nombre del usuario que realiza la consulta.
       * @returns 
       */
      public getEventoInicio(workflowName: string, eventoInicioName: string, userName: string): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          const url =
            environment.workflowApiUrl +
            `/startEvent/getStartEvent?workflowName=${encodeURIComponent(workflowName)}` +
            `&startEventName=${encodeURIComponent(eventoInicioName)}` +
            `&userName=${encodeURIComponent(userName)}`;
          return this.http.get<FsResponseEntity<any>>(url);
      }
    
      

      /**
   * Obtiene el listado de herramientas de un workflow seleccionado
   * @param filtros la informacion del workflow seleccionado Los filtros para la búsqueda de herramientas.
   * @returns 
   */
  public getHerramientas(workflowName: string): Observable<FsResponseEntity<HerramientaEventoInicioEntity[]>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<HerramientaEventoInicioEntity[]>>(
        environment.workflowApiUrl +
          `/startEvent/getTools?workflowName=${workflowName}`
      );
  }
    

  
      /**
       * Elimina un evento de inicio, dado su identificador
       * @param eventoInicioName Nombre del evento de inicio a eliminar
       * @returns 
       */
      public deleteEventoInicio(eventoInicioName: string): Observable<FsResponseEntity<any>> {
          let ip: string = this.cookieService.get('ip');
          return this.http.delete<FsResponseEntity<any>>(
            environment.workflowApiUrl +
              `/startEvent/delete?eventoInicioName=${eventoInicioName}`);
      }
    
    

 /**
   * Obtiene el listado de métodos de asignación de los eventos de inicio
   * @returns 
   */
  public getMetodosAsignacion(): Observable<FsResponseEntity<MetodoAsignacionPrimeraTareaEntity[]>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<MetodoAsignacionPrimeraTareaEntity[]>>(
        environment.workflowApiUrl +
          `/startEvent/options`
      );
  }

  /**
    * Obtiene el listado de series de los eventos de inicio para un usuario dado
   * @param username El nombre del usuario para el cual se desean obtener las series de eventos de inicio
   * @returns 
   */
  public getSeriesEventoInicio(username: string): Observable<FsResponseEntity<SerieEventoInicioEntity[]>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.get<FsResponseEntity<SerieEventoInicioEntity[]>>(
      environment.workflowApiUrl +
        `/startEvent/getFoldersModel?user=${username}`
    );
  }

  /**
   * Obtiene el listado de tipos de documento asociados a una serie de eventos de inicio dada
   * @param idFolderModel El identificador de la serie de eventos de inicio para la cual se desean obtener los tipos de documento asociados
   * @returns 
   */
  public getTiposDocumentoBySerie(idFolderModel: string): Observable<FsResponseEntity<TipoDocumentoEventoInicioEntity[]>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.get<FsResponseEntity<TipoDocumentoEventoInicioEntity[]>>(
      environment.workflowApiUrl +
        `/startEvent/getDocumentsModel?idFolderModel=${idFolderModel}`
    );
  }
}
    