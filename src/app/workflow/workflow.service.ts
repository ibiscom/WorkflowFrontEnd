import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { WorkflowEntity } from './workflow.entity';
import { WorkflowFilterEntity } from './workflow-filter.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de workflows.
 * Incluye búsquedas y CRUD.
 */
export class WorkflowService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Crea un nuevo workflow.
   * @param workflow La información del workflow a crear.
   * @returns 
   */
  public createWorkflow(workflow: WorkflowEntity): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.put<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/workflow/create`, workflow
      );
  }

  /**
   * Obtiene el listado de workflows según los filtros proporcionados.
   * @param filtros Los filtros para la búsqueda de workflows.
   * @returns 
   */
  public getWorkflows(filtros: WorkflowFilterEntity): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.post<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/workflow/getWorkflows`, filtros
      );
  }

  /**
   * Edita la información de un workflow existente.
   * @param workflow La información del workflow a modificar.
   * @returns 
   */
  public editWorkflow(workflow: WorkflowEntity): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.post<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/workflow/edit`, workflow
      );
  }

  /**
   * Obtiene la información de un workflow existente.
   * @param workflowName La información del workflow a consultar.
   * @returns 
   */
  public getWorkflow(workflowName: string): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/workflow/getWorkflow?workflowName=${workflowName}`
      );
  }

  /**
   * Obtiene el listado de los estados que puede tener un workflow.
   * @returns 
   */
  public getStatus(): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/workflow/getStatus`);
  }

  /**
   * Elimina un workflow, dado su identificador
   * @param workflowName Nombre del workflow a eliminar
   * @returns 
   */
  public deleteWorkflow(workflowName: string): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.delete<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/workflow/delete?workflowName=${workflowName}`);
  }
}
