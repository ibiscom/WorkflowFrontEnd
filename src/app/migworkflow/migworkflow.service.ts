import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { MigworkflowEntity } from './migworkflow.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de grupos.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class MigworkflowService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

   /**
     * Edita la información del proceso.
     * @param migworkflow La información del proceso a modificar.
     * @returns 
     */
    public editMigworkflow(migworkflow: MigworkflowEntity): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.post<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/importWorkflow/importW`, migworkflow
        );
    }

/**
   * Obtiene el listado de procesos aplicando filtro de nombre o nombre largo
   * @param filtros la informacion del workflow seleccionado Los filtros para la búsqueda de herramientas.
   * @returns 
   */
  public getWorkflows(migworkflowName: string): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/importWorkflow/getWorkflows${migworkflowName}`
      );
  }

  public importProcess(migworkflow: MigworkflowEntity): Observable<FsResponseEntity<string>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<string>>(
      environment.workflowApiUrl +
        `/importWorkflow/importW`, migworkflow
    );
  }
}

