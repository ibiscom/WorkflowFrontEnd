import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LogInformationEntity } from '../entities/logs/log-information.entity';
import { OperationLogInfoEntity } from '../entities/logs/operation-log-info.entity';
import { LogsService } from './logs.service';
import { OperacionesService } from '../operaciones/operaciones.service';
import { LoginService } from '../login/login.service';
import { LoginEntity } from '../login/login.entity';
import { Constants } from '../utils/constants';
import { MessageUtil } from '../utils/message.util';
import { firstValueFrom } from 'rxjs';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { FileLogEntity } from '../entities/logs/file-log.entity';

@Component({
  selector: 'fs-administrar-logs',
  imports: [
    FormsModule,
    MatButton,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss',
})
/**
 * Administración de configuración de logs y atributos a registrar.
 */
export class LogsComponent {
  public mensaje?: string;
  public maxFileSizeN: string = '';
  public logFileNameN: string = '';
  public errorFileNameN: string = '';
  public operationsList: OperationLogInfoEntity[] = [];
  public informationList: LogInformationEntity[] = [];
  public loggedUser?: LoginEntity;

  public constructor(
    private logsService: LogsService,
    private operacionesService: OperacionesService,
    private loginService: LoginService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
  }

  /**
   * Inicializa el componente cargando configuración y operaciones.
   */
  public async ngOnInit(): Promise<void> {
    this.mensaje = '';
    await this.loadLogInformation();
    this.loadLogManagementInfo();
    this.loadOperationsLogInfo();
  }

  private async loadLogInformation() {
    this.informationList = [];

    this.informationList.push({
      name: Constants.LBL_LOG_INFO_TIME,
      saveInLogs: await this.getAttribute(Constants.LBL_LOG_KEY_TIME),
      attributeKey: Constants.LBL_LOG_KEY_TIME,
    });
    this.informationList.push({
      name: Constants.LBL_LOG_INFO_OPERATION,
      saveInLogs: await this.getAttribute(Constants.LBL_LOG_KEY_OPERATION),
      attributeKey: Constants.LBL_LOG_KEY_OPERATION,
    });
    this.informationList.push({
      name: Constants.LBL_LOG_INFO_USER,
      saveInLogs: await this.getAttribute(Constants.LBL_LOG_KEY_USER),
      attributeKey: Constants.LBL_LOG_KEY_USER,
    });
    this.informationList.push({
      name: Constants.LBL_LOG_INFO_DESCRIPTION,
      saveInLogs: await this.getAttribute(Constants.LBL_LOG_KEY_DESCRIPTION),
      attributeKey: Constants.LBL_LOG_KEY_DESCRIPTION,
    });
    this.informationList.push({
      name: Constants.LBL_LOG_INFO_IP,
      saveInLogs: await this.getAttribute(Constants.LBL_LOG_KEY_IP),
      attributeKey: Constants.LBL_LOG_KEY_IP,
    });
    this.informationList.push({
      name: Constants.LBL_LOG_INFO_TYPE,
      saveInLogs: await this.getAttribute(Constants.LBL_LOG_KEY_TYPE),
      attributeKey: Constants.LBL_LOG_KEY_TYPE,
    });
  }

  private async getAttribute(attributeKey: string): Promise<boolean> {
    let result: FsResponseEntity<string> = await firstValueFrom(
      this.logsService.getAttributeValue(attributeKey),
    );
    return result?.respuesta === 'si' ? true : false;
  }

  private loadLogManagementInfo() {
    this.logsService.getFilesLog().subscribe({
      next: (data) => {
        this.logFileNameN = data.respuesta.logName;
        this.errorFileNameN = data.respuesta.bugName;
        this.maxFileSizeN = data.respuesta.size.toString();
      },
      error: (error) => {
        console.error('Error loading operations log info:', error);
      },
    });
  }

  private loadOperationsLogInfo() {
    this.operationsList = [];
    this.operacionesService
      .getOperations(this.loggedUser?.user_name ?? '')
      .subscribe({
        next: (data) => {
          data.respuesta.forEach((op) => {
            let opInfo: OperationLogInfoEntity = {
              operationName: op.name,
              saveInLogs:
                op.generateLog === Constants.VAL_GENERATE_LOGS ? true : false,
            } as OperationLogInfoEntity;
            this.operationsList.push(opInfo);
          });
        },
        error: (error) => {
          console.error('Error loading operations log info:', error);
        },
      });
  }

  /**
   * Cambia la configuración de guardado de log para una operación.
   * @param operation Operación a actualizar.
   */
  public toggleSaveLog(operation: OperationLogInfoEntity) {
    this.logsService
      .changeStatusOperation(
        this.loggedUser?.user_name ?? '',
        operation.operationName,
        operation.saveInLogs
          ? Constants.VAL_GENERATE_LOGS
          : Constants.VAL_DONT_GENERATE_LOGS,
      )
      .subscribe({
        next: (data) => {
          console.log('Operation log status changed successfully:', data);
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Error changing operation log status:', error);
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_CAMBIO_ESTADO_OPERACION,
            error,
          );
        },
      });
  }

  /**
   * Cambia el estado de guardado de un atributo de log.
   * Evita desactivar atributos obligatorios.
   */
  public toggleInfoLogSave(info: LogInformationEntity) {
    if (
      info.name === Constants.VAL_LOG_HORA_FECHA_EVENTO ||
      info.name === Constants.VAL_LOG_OPERACION_REALIZADA ||
      info.name === Constants.VAL_LOG_USUARIO_REALIZA_OPERACION
    ) {
      this.mensaje = Constants.ERR_INFO_ALMACENAR_LOGS_OBLIGATORIA;
      return;
    }
    this.logsService
      .changeStatusInfo(
        this.loggedUser?.user_name ?? '',
        info.attributeKey ?? '',
      )
      .subscribe({
        next: (data) => {
          console.log('Cambio de información de log realizado:', data);
          this.mensaje = '';
          this.ngOnInit();
        },
        error: (error) => {
          console.error(Constants.ERR_CAMBIO_ESTADO_LOG_INFO, error);
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_CAMBIO_ESTADO_LOG_INFO,
            error,
          );
        },
      });
  }

  /**
   * Persiste los cambios de configuración de archivos de log.
   */
  public saveLogSettings() {
    let fileLog: FileLogEntity = {
      logName: this.logFileNameN,
      bugName: this.errorFileNameN,
      size: parseInt(this.maxFileSizeN, 10),
      userName: this.loggedUser?.user_name ?? '',
    };
    this.logsService.updateFilesLog(fileLog).subscribe({
      next: (data) => {
        console.log('Log settings updated successfully:', data);
        this.mensaje = '';
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error updating log settings:', error);
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_ACTUALIZANDO_CONFIG_LOGS,
          error,
        );
      },
    });
  }
}
