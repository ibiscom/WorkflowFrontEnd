import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { SimulacionComponentInstanceService } from './simulacion-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { MessageUtil } from '../utils/message.util';
import {
  GetSimulateWorkflowRequest,
  InitSimulateRespuesta,
  mapSimulateWorkflowAFilas,
  SimulacionEntity,
} from './simulacion.entity';
import { SimulacionService } from './simulacion.service';

@Component({
  selector: 'ibpm-simulacion',
  imports: [MatCardModule, RouterModule],
  templateUrl: './simulacion.component.html',
  styleUrl: './simulacion.component.scss',
})
/**
 * Pantalla de simulación: solo orquesta llamadas al backend y muestra resultados.
 * La ejecución de tareas la realiza el backend vía servicios web.
 */
export class SimulacionComponent implements OnInit, OnDestroy {
  public loggedUser: LoginEntity | undefined;
  public simulacion: SimulacionEntity[] = [];
  public mensaje: string = '';

  public procesoActual: string = '';
  public instanciaActual: string = '';

  constructor(
    private simulacionService: SimulacionService,
    private simulacionComponentInstanceService: SimulacionComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.simulacionComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.simulacion = [];
  }

  ngOnDestroy(): void {
    this.simulacionComponentInstanceService.clearInstance();
  }

  /**
   * Llama al backend para iniciar la simulación y luego consulta el estado.
   */
  public simularProceso(
    workflowName: string,
    eventInicio: string,
    userName: string
  ): void {
    this.simulacionService
      .initSimulateWorkflow(workflowName, eventInicio, userName)
      .subscribe({
        next: (response) => {
          const resultado = response.respuesta as InitSimulateRespuesta;

          if (resultado?.exitoso === false) {
            this.mensaje =
              resultado?.mensaje ||
              response.mensaje ||
              'No se pudo iniciar la simulación.';
            this.simulacion = [];
            return;
          }

          this.procesoActual = workflowName;
          this.instanciaActual = String(resultado?.instancia ?? '');
          this.mensaje =
            resultado?.mensaje ||
            response.mensaje ||
            'Proceso iniciado correctamente';

          this.consultarSimulacion(userName);
        },
        error: (err) => {
          this.simulacion = [];
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            'Error al iniciar la simulación del proceso',
            err
          );
        },
      });
  }

  /**
   * Consulta al backend el estado de la simulación y pinta la tabla.
   */
  public consultarSimulacion(userName?: string): void {
    const usuario = userName || this.loggedUser?.user_name || '';
    if (!usuario) {
      this.mensaje = 'No se pudo obtener el usuario en sesión.';
      return;
    }

    const body: GetSimulateWorkflowRequest = {
      idInstancia: this.instanciaActual,
      nombreW: this.procesoActual,
      nombreLargo: '',
      fechaCreacion: '',
      fechaTerminacion: '',
      estadoW: '',
      porcentaje: '',
      observaciones: '',
      codigosInstanciasHijasString: '',
      codigoInstanciaPadreString: '',
      esSimulacion: 'true',
      fechaI: '',
      fechaF: '',
      usuario,
      seleccionado: false,
    };

    this.simulacionService.getSimulateWorkflow(usuario, body).subscribe({
      next: (response) => {
        this.simulacion = mapSimulateWorkflowAFilas(response.respuesta);
      },
      error: (err) => {
        this.simulacion = [];
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          'Error al consultar la simulación',
          err
        );
      },
    });
  }

  /**
   * Icono Ejecutar tarea: se cableará al servicio web de ejecución del backend.
   * Tras ejecutarse en el back, se vuelve a consultar getSimulateWorkflow.
   */
  public ejecutarTarea(_tarea: SimulacionEntity): void {
    this.mensaje =
      'Pendiente: indicar el servicio web del backend para ejecutar la tarea.';
  }

  public verExpediente(_tarea: SimulacionEntity): void {
    this.mensaje =
      'Pendiente: indicar el servicio web del backend para ver expediente.';
  }

  public verDetalle(_tarea: SimulacionEntity): void {
    this.mensaje =
      'Pendiente: indicar el servicio web del backend para ver detalle.';
  }
}
