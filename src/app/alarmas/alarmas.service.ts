import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { AlarmaEntity } from './alarma.entity';
import { AtributoAlarmaEntity } from './alarmas.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de grupos.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class AlarmaService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}


  /**
   * Crea un nuevo objeto workflow en el sistema.
   * @param alarma El objeto workflow a crear, con su nombre, descripción y atributos.
   * @returns Observable con la respuesta del servidor.
   */
  public crearAlarma(alarma: AlarmaEntity): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.put<FsResponseEntity<any>>(
      environment.workflowApiUrl + 
        `/WObject/create`,
      alarma,
    );
  }

  /**
   * Crea un nuevo atributo para un objeto workflow existente en el sistema.
   * @param atributoObjeto El atributo de objeto workflow a crear, con su nombre, valor, descripción e identificadores.
   * @returns Observable con la respuesta del servidor.
   */
  public crearAtributoAlarma(atributoObjeto: AtributoAlarmaEntity): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.put<FsResponseEntity<any>>(
      environment.workflowApiUrl + 
        `/WObject/createAttibute`,
      atributoObjeto,
    );
  }

  /**
   * Edita un objeto workflow en el sistema.
   * @param alarma El objeto workflow a modificar, con su nombre, descripción y atributos.
   * @returns Observable con la respuesta del servidor.
   */
  public editarAlarma(alarma: AlarmaEntity): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.workflowApiUrl + 
        `/WObject/edit`,
      alarma,
    );
  }

  /**
   * Edita un nuevo atributo para un objeto workflow existente en el sistema.
   * @param atributoObjeto El atributo de objeto workflow a crear, con su nombre, valor, descripción e identificadores.
   * @returns Observable con la respuesta del servidor.
   */
  public editarAtributoAlarma(atributoObjeto: AtributoAlarmaEntity): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.workflowApiUrl + 
        `/WObject/editAttibute`,
      atributoObjeto,
    );
  }

  /**
   * Obtiene un objeto workflow por su nombre de workflow.
   * @param nombreWorkflow El nombre del workflow al que pertenece el objeto workflow a obtener.
   * @returns Observable con la respuesta del servidor y el objeto workflow.
   */
  public obtenerAlarma(nombreWorkflow: string): Observable<FsResponseEntity<AlarmaEntity>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.get<FsResponseEntity<AlarmaEntity>>(
      environment.workflowApiUrl + 
        `/WObject/getWObject?workflowName=${nombreWorkflow}`,
    );
  }

  /**
   * Obtiene los atributos de un objeto workflow por el nombre del workflow al que pertenecen.
   * @param nombreWorkflow El nombre del workflow al que pertenecen los atributos de objeto workflow a obtener.
   * @returns Observable con la respuesta del servidor y la lista de atributos de objeto workflow.
   */
  public obtenerAtributosAlarma(nombreWorkflow: string): Observable<FsResponseEntity<AtributoAlarmaEntity[]>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.get<FsResponseEntity<AtributoAlarmaEntity[]>>(
      environment.workflowApiUrl + 
        `/WObject/getAttributes?workflowName=${nombreWorkflow}`,
    );
  }

  /**
   * Elimina un atributo de un objeto workflow del sistema por su nombre de workflow y nombre de atributo.
   * @param nombreWorkflow El nombre del workflow al que pertenece el atributo de objeto workflow a eliminar.
   * @param nombreAtributo El nombre del atributo de objeto workflow a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  public eliminarAtributoAlarma(nombreWorkflow: string, nombreAtributo: string): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.delete<FsResponseEntity<any>>(
      environment.workflowApiUrl + 
        `/WObject/deleteAttibute?workflowName=${nombreWorkflow}&attributeName=${nombreAtributo}`,
    );
  }


  /**
   * Elimina un objeto workflow del sistema por su nombre de workflow.
   * @param nombreWorkflow El nombre del workflow al que pertenece el objeto workflow a eliminar.
   * @returns Observable con la respuesta del servidor. 
   */
  public eliminarAlarma(nombreWorkflow: string): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.delete<FsResponseEntity<any>>(
      environment.workflowApiUrl + 
        `/WObject/delete?workflowName=${nombreWorkflow}`,
    );
  }


}
   
    