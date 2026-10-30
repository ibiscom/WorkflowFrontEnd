import { Injectable } from '@angular/core';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  GetSimulateWorkflowItem,
  GetSimulateWorkflowRequest,
  InitSimulateRespuesta,
} from './simulacion.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Cliente HTTP de simulación: solo invoca servicios del backend.
 */
export class SimulacionService {
  constructor(private http: HttpClient) {}

  public getWorkflowsName(
    incluirSeleccione: boolean = true
  ): Observable<FsResponseEntity<{ code: string; name: string }[]>> {
    return this.http.get<FsResponseEntity<{ code: string; name: string }[]>>(
      environment.workflowApiUrl +
        `/workflow/getWorkflowsName?incluirSeleccione=${incluirSeleccione}`
    );
  }

  public getStartEventsName(
    workflowName: string,
    incluirSeleccione: boolean = true
  ): Observable<FsResponseEntity<{ code: string; name: string }[]>> {
    return this.http.get<FsResponseEntity<{ code: string; name: string }[]>>(
      environment.workflowApiUrl +
        `/startEvent/getStartEventsName?incluirSeleccione=${incluirSeleccione}` +
        `&workflowName=${encodeURIComponent(workflowName)}`
    );
  }

  /** Backend inicia la ejecución del proceso (evento de inicio). */
  public initSimulateWorkflow(
    workflowName: string,
    eventInicio: string,
    userName: string
  ): Observable<FsResponseEntity<InitSimulateRespuesta>> {
    return this.http.post<FsResponseEntity<InitSimulateRespuesta>>(
      environment.workflowApiUrl +
        `/workflowEngine/initSimulateWorkflow` +
        `?workflowName=${encodeURIComponent(workflowName)}` +
        `&eventInicio=${encodeURIComponent(eventInicio)}` +
        `&userName=${encodeURIComponent(userName)}`,
      {}
    );
  }

  /** Backend retorna el estado/tareas de la simulación. */
  public getSimulateWorkflow(
    userName: string,
    body: GetSimulateWorkflowRequest
  ): Observable<
    FsResponseEntity<GetSimulateWorkflowItem | GetSimulateWorkflowItem[]>
  > {
    return this.http.post<
      FsResponseEntity<GetSimulateWorkflowItem | GetSimulateWorkflowItem[]>
    >(
      environment.workflowApiUrl +
        `/workflowEngine/getSimulateWorkflow?userName=${encodeURIComponent(userName)}`,
      body
    );
  }
}
