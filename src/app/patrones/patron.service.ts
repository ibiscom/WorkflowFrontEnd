import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { PatronEntity } from './patron.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de herramientas.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class PatronService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Crea una nueva herramienta.
   * @param herramienta La información de la herramienta a crear.
   * @returns 
   */
  public createPatron(herramienta: PatronEntity): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.put<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Gateway/create`, herramienta
      );
  }

/**
   * Obtiene el listado de herramientas de un workflow seleccionado
   * @param filtros la informacion del workflow seleccionado Los filtros para la búsqueda de herramientas.
   * @returns 
   */
  public getPatrones(workflowName: string): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Gateway/getGateways${workflowName}`
      );
  }

  /**
     * Edita la información de una herramienta existente.
     * @param herramienta La información de la herramienta a modificar.
     * @returns 
     */
    public editPatron(herramienta: PatronEntity): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.post<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/Gateway/edit`, herramienta
        );
    }

   /**
   * Obtiene la información de una herramienta existente.
   * @param herramientaName La información de la herramienta a consultar.
   * @returns 
   */
  public getPatron(workflowName: string, ToolName: string): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Gateway/getGateway${workflowName}&toolName=${ToolName}`
      );
  }

  /**
   * Obtiene el listado de los tipos que puede tener una herramienta.
   * @returns 
   */
  public getTypes(): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Gateway/types`);
  }

   /**
   * Obtiene el listado de los tipos que puede tener una herramienta.
   * @returns 
   */
  public getDependencies(): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Gateway/getDependencies`);
  }

   /**
   * Obtiene el listado de los tipos que puede tener una herramienta.
   * @returns 
   */
  public getDependenciesGateway(): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Gateway/getDependenciesGateway`);
  }
  /**
   * Elimina un herramienta, dado su identificador
   * @param workflowName El nombre del workflow al que pertenece la herramienta
   * @param herramientaName Nombre de la herramienta a eliminar
   * @returns 
   */
  public deletePatron(workflowName: string, herramientaName: string): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.delete<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Gateway/delete?workflowName=${workflowName}&toolName=${herramientaName}`);
  }
}

