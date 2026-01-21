import { Component } from '@angular/core';
import { LoginEntity } from '../login/login.entity';
import { AccessLogEntity } from '../entities/logs/access-log,entity';
import { LogsAccesoService } from './logs-acceso.service';
import { LoginService } from '../login/login.service';
import { LogsAccesoComponentInstanceService } from './logs-acceso-component-instance.service';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { SeleccionLogComponent } from './seleccion-log/seleccion-log.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AuthorizationStateEntity } from '../entities/authorization-states/authorization-state.entity';

@Component({
  selector: 'fs-logs-acceso',
  imports: [FormsModule, MatCardModule, RouterModule],
  templateUrl: './logs-acceso.component.html',
  styleUrl: './logs-acceso.component.scss',
})
/**
 * Componente principal para la consulta y visualización de logs de acceso.
 * Orquesta la carga de datos y comunica filtros desde subcomponentes.
 */
export class LogsAccesoComponent {
  public loggedUser?: LoginEntity;
  public accessLogsList: AccessLogEntity[] = [];
  public mensaje: string = '';

  constructor(
    private logsAccesoService: LogsAccesoService,
    private loginService: LoginService,
    private logsAccesoComponentInstanceService: LogsAccesoComponentInstanceService,
    public router: Router,
  ) {}

  /**
   * Inicializa el componente y carga logs de acceso.
   */
  ngOnInit() {
    this.logsAccesoComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    if (!this.loggedUser) {
      this.router.navigate(['/login']);
    } else {
      this.accessLogsList = [];
    }
  }

  /**
   * Carga los logs de acceso desde el servicio aplicando filtros.
   * @param userName Usuario que realizó la acción.
   * @param actionName Nombre de la acción realizada.
   * @param authorization Estado de autorización asociado.
   * @param ip Dirección IP de origen.
   * @param startDate Fecha inicio del rango (dd/MM/yyyy hh:mm:ss am/pm).
   * @param finishDate Fecha fin del rango (dd/MM/yyyy hh:mm:ss am/pm).
   * @param logFileName Nombre de archivo de log a consultar.
   */
  public loadAccessLogs(
    userName?: string,
    actionName?: string,
    authorization?: AuthorizationStateEntity,
    ip?: string,
    startDate?: string,
    finishDate?: string,
    logFileName?: string,
  ) {
    let filters: AccessLogEntity = {
      userName: userName,
      actionName: actionName,
      authorization: authorization?.code,
      ip: ip,
      startDate: startDate,
      finishDate: finishDate,
      logFileName: logFileName,
    };
    this.logsAccesoService.getAccessLog(filters).subscribe({
      next: (response) => {
        this.accessLogsList = response.respuesta;
        this.mensaje = '';
      },
      error: (error) => {
        console.error('Error al cargar los logs de acceso:', error);
        this.mensaje = 'Error al cargar los logs de acceso.';
        this.accessLogsList = [];
      },
    });
  }
}
