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
import { EstadoTareaAlarmaEntity } from './estado-tarea-alarma.entity';


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
   * Edita una alarma existente en el sistema.
   * @param alarma La alarma a modificar.
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
   * Obtiene una alarma específica por id.
   * @param workflowName Nombre del workflow.
   * @param id Identificador de la alarma.
   * @returns Observable con la alarma consultada.
   */
  public obtenerAlarma(
   idAlarma: string | number,
  ): Observable<FsResponseEntity<AlarmaEntity>> {
    return this.http.get<FsResponseEntity<AlarmaEntity>>(
      environment.workflowApiUrl +
        `/Alarm/getAlarm?alarmIde=${idAlarma}`
    );
  }

  /**
   * Obtiene los tipos de alarma disponibles.
   */
  public getTiposAlarma(): Observable<FsResponseEntity<TipoAlarmaEntity[]>> {
    return this.http.get<FsResponseEntity<TipoAlarmaEntity[]>>(
      environment.workflowApiUrl + `/Alarm/getAlarmTypes`,
    );
  }

  /**
   * Obtiene las alarmas del workflow indicado.
   * @param workflowActual Nombre del workflow.
   * @returns Observable con la lista de alarmas.
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

  /**
   * Obtiene el listado de estados de tarea para alarmas.
   * @returns Observable con la lista de estados de tarea.
   */
   public getEstadosTareasAlarma(): Observable<FsResponseEntity<EstadoTareaAlarmaEntity[]>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.get<FsResponseEntity<EstadoTareaAlarmaEntity[]>>(
      environment.workflowApiUrl +
        `/Alarm/getTaskStates`);
  
  }


}
   
    