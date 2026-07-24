import { Injectable } from '@angular/core';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { AlarmaEntity } from './alarmas.entity';
import { TipoAlarmaEntity } from './tipo-alarma.entity';


@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para la administración de grupos.
 * Incluye búsquedas, CRUD y gestión de permisos/restricciones.
 */
export class AlarmaService {
  obtenerObjetoWorkflow(workflowActual: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}


  /**
   * Crea una nueva alarma en el sistema.
   * @param alarma La alarma a crear, con su nombre, descripción y atributos.
   * @returns Observable con la respuesta del servidor.
   */
  public crearAlarma(alarma: AlarmaEntity): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.put<FsResponseEntity<any>>(
      environment.workflowApiUrl + 
        `/Alarm/create`,
      alarma,
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
        `/Alarm/edit`,
      alarma,
    );
  }



  /**
   * Obtiene los atributos de un objeto workflow por el nombre del workflow al que pertenecen.
   * @param nombreWorkflow El nombre del workflow al que pertenecen los atributos de objeto workflow a obtener.
   * @returns Observable con la respuesta del servidor y la lista de atributos de objeto workflow.
   */
  public obtenerAlarmas(workflowActual: string): Observable<FsResponseEntity<AlarmaEntity[]>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.get<FsResponseEntity<AlarmaEntity[]>>(
      environment.workflowApiUrl + 
        `/Alarm/getAlarms?workflowName=${workflowActual}`,
    );
  }

  /**
   * Elimina un atributo de un objeto workflow del sistema por su nombre de workflow y nombre de atributo.
   * @param nombreWorkflow El nombre del workflow al que pertenece el atributo de objeto workflow a eliminar.
   * @param nombreAtributo El nombre del atributo de objeto workflow a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  public eliminarAlarma(nombreWorkflow: string, nombreAtributo: string): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.delete<FsResponseEntity<any>>(
      environment.workflowApiUrl + 
        `/Alarm/deleteAlarm?workflowName=${nombreWorkflow}&attributeName=${nombreAtributo}`,
    );
  }


}
   
    