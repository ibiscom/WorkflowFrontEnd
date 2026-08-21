import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { ConsultarRolResponsableEntity } from './consultarrolresponsable.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de grupos.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class ConsultarRolResponsableService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

   /**
     * Obtiene la información de un responsable específico.
     * @param responsable La información del responsable a obtener.
     * @returns 
     */
    public getResponsables(responsable: ConsultarRolResponsableEntity): Observable<FsResponseEntity<any>> {
        let ip: string = this.cookieService.get('ip');
        return this.http.post<FsResponseEntity<any>>(
          environment.workflowApiUrl +
            `/UserRol/getResponsibleUsers`, responsable
        );
    }

/**
   * Obtiene el listado de herramientas de un workflow seleccionado
   * @param filtros la informacion del workflow seleccionado Los filtros para la búsqueda de herramientas.
   * @returns 
   */
  public getUsersRol(responsableName: string): Observable<FsResponseEntity<any>> {
      let ip: string = this.cookieService.get('ip');
      return this.http.get<FsResponseEntity<any>>(
        environment.workflowApiUrl +
          `/Rol/getRolesName=${responsableName}`
      );
  }
}

