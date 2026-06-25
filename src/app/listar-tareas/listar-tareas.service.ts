import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { ListarTareasEntity } from './listar-tareas.entity';
import { ListarTareaFilterEntity } from './listar-tareas-filter.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de listartarea.
 * Incluye búsquedas y CRUD.
 */
export class ListarTareaService {
  createListarTarea(workflow: ListarTareasEntity) {
    throw new Error('Method not implemented.');
  }
  editListarTarea(workflow: ListarTareasEntity) {
    throw new Error('Method not implemented.');
  }
  getStatus() {
    throw new Error('Method not implemented.');
  }
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Crea un nuevo listartarea.
   * @param listartarea La información del listartarea a crear.
   * @returns 
   */
  public CargarListarTarea(listartarea: ListarTareasEntity): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.put<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/taskList/loadTask`, listartarea
      );
  }

  /**
   * Obtiene el listado de listartarea según los filtros proporcionados.
   * @param filtros Los filtros para la búsqueda de listartarea.
   * @returns 
   */
  public getListarTarea(filtros: ListarTareaFilterEntity): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.post<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/taskList/getAssignedTasks`, filtros
      );
  }

  /**
   * Obtiene los atributos del proceso.
   * @param atributoListarTareas El nombre del workflow al que pertenece el objeto workflow a obtener.
   * @returns Observable con la respuesta del servidor y el objeto workflow.
   */
  public obtenerAtributo(atributoListarTareas: string): Observable<FsResponseEntity<ListarTareasEntity>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.get<FsResponseEntity<ListarTareasEntity>>(
      environment.workflowApiUrl +
        `/taskList/getInfoWorkflow${atributoListarTareas}`,
    );
  }

    /**
   * Obtiene los atributos del proceso.
   * @param informacionTarea El nombre del workflow al que pertenece el objeto workflow a obtener.
   * @returns Observable con la respuesta del servidor y el objeto workflow.
   */
  public obtenerInformacion(informacionListarTareas: string): Observable<FsResponseEntity<ListarTareasEntity>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.get<FsResponseEntity<ListarTareasEntity>>(
      environment.workflowApiUrl +
        `/taskList/getInfoTask${informacionListarTareas}`,
    );
  }


     /**
   * Obtiene los documentos del proceso.
   * @param atributosTarea El nombre del workflow al que pertenece el objeto workflow a obtener.
   * @returns Observable con la respuesta del servidor y el objeto workflow.
   */
  public obtenerAtributos(atributosListarTareas: string): Observable<FsResponseEntity<ListarTareasEntity>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.get<FsResponseEntity<ListarTareasEntity>>(
      environment.workflowApiUrl +
        `/taskList/getDocsWorkflow${atributosListarTareas}`,
    );
  }

       /**
   * Obtiene los documentos del proceso.
   * @param documentosTarea El nombre del workflow al que pertenece el objeto workflow a obtener.
   * @returns Observable con la respuesta del servidor y el objeto workflow.
   */
  public obtenerDocumentos(documentosListarTareas: string): Observable<FsResponseEntity<ListarTareasEntity>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.get<FsResponseEntity<ListarTareasEntity>>(
      environment.workflowApiUrl +
        `/taskList/getDocsTask${documentosListarTareas}`,
    );
  }

         /**
   * Obtiene los documentos del evento de inicio.
   * @param documentoseventoTarea El nombre del workflow al que pertenece el objeto workflow a obtener.
   * @returns Observable con la respuesta del servidor y el objeto workflow.
   */
  public obtenerDocumentosEvento(documentoseventoTareas: string): Observable<FsResponseEntity<ListarTareasEntity>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.get<FsResponseEntity<ListarTareasEntity>>(
      environment.workflowApiUrl +
        `/taskList/getDocsStart${documentoseventoTareas}`,
    );
  }
  


  /**
   * Elimina un listartarea, dado su identificador
   * @param listartareaName Nombre del listartarea a eliminar
   * @returns 
   */
  public deleteListarTarea(listartareaName: string): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.delete<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/listartarea/delete?listartareaName=${listartareaName}`);
  }
}

