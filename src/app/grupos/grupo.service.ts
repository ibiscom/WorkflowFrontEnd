import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { GrupoEntity } from './grupo.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de grupos.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class GrupoService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Crea una nueva grupo.
   * @param grupo La información de la grupo a crear.
   * @returns 
   */
  public createGrupo(grupo: GrupoEntity): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.put<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Tool/create`, grupo
      );
  }

/**
   * Obtiene el listado de grupos de un workflow seleccionado
   * @param filtros la informacion del workflow seleccionado Los filtros para la búsqueda de grupos.
   * @returns 
   */
  public getGrupos(workflowName: string): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Tool/getTools?workflowName=${workflowName}`
      );
  }

  /**
     * Edita la información de una grupo existente.
     * @param grupo La información de la grupo a modificar.
     * @returns 
     */
    public editGrupo(grupo: GrupoEntity): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.post<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/Tool/edit`, grupo
        );
    }

   /**
   * Obtiene la información de una grupo existente.
   * @param grupoName La información de la grupo a consultar.
   * @returns 
   */
  public getGrupo(workflowName: string, ToolName: string): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Tool/getTool?workflowName=${workflowName}&toolName=${ToolName}`
      );
  }

  /**
   * Obtiene el listado de los tipos que puede tener una grupo.
   * @returns 
   */
  public getTypes(): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Tool/types`);
  }
  /**
   * Elimina un grupo, dado su identificador
   * @param workflowName El nombre del workflow al que pertenece la grupo
   * @param grupoName Nombre de la grupo a eliminar
   * @returns 
   */
  public deleteGrupo(workflowName: string, grupoName: string): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.delete<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Tool/delete?workflowName=${workflowName}&toolName=${grupoName}`);
  }
}

