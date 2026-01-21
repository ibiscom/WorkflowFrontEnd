import { Component } from '@angular/core';
import { EntityLogEntity } from '../entities/entities/entity-log.entity';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { LogAuditoriaService } from './log-auditoria.service';
import { Router } from '@angular/router';
import { LogAuditoriaComponentInstanceService } from './log-auditoria-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { EntityLogFilterEntity } from '../entities/entities/entity-log-filter.entity';
import { MessageUtil } from '../utils/message.util';
import { EntityLogReportEntity } from '../entities/entities/entity-log-report.entity';
import { Constants } from '../utils/constants';

@Component({
  selector: 'fs-log-auditoria',
  imports: [MatCardModule, RouterModule],
  templateUrl: './log-auditoria.component.html',
  styleUrl: './log-auditoria.component.scss',
})
export class LogAuditoriaComponent {
  public logs: EntityLogEntity[] = [];
  public mensaje?: string;
  loggedUser?: LoginEntity;

  constructor(
    private logAuditoriaService: LogAuditoriaService,
    private loginService: LoginService,
    private logAuditoriaComponentInstanceService: LogAuditoriaComponentInstanceService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.logAuditoriaComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.searchEntityLogs();
  }

  public searchEntityLogs(filter?: EntityLogFilterEntity) {
    let filterToUse: EntityLogFilterEntity =
      filter ||
      ({
        userName: this.loggedUser?.user_name || '',
      } as EntityLogFilterEntity);
    this.mensaje = 'Buscando logs de auditoría...';
    this.logAuditoriaService.getEntityLogs(filterToUse).subscribe({
      next: (response) => {
        this.logs = response.respuesta;
        this.mensaje = '';
      },
      error: (error) => {
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_LOG_AUDITORIA_BUSCAR,
          error,
        );
        this.logs = [];
      },
    });
  }

  public downloadEntityLogs(filter: EntityLogFilterEntity) {
    this.logAuditoriaService.getReport(filter).subscribe({
      next: (response) => {
        let rsp: EntityLogReportEntity = response.respuesta;
        this.openReportInNewTab(
          rsp.content,
          rsp.name ??
            'ReporteLogAuditoria' +
              new Date(Date.now()).toISOString() +
              '.xlsx',
          rsp.contentType ?? Constants.EXCEL_MIME_TYPE,
        );
      },
      error: (error) => {
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_LOG_AUDITORIA_REPORTE_DESCARGAR,
          error,
        );
      },
    });
  }

  public openReportInNewTab(
    blobBase64: string,
    fileName: string,
    mimeType: string,
  ): void {
    const byteCharacters = atob(blobBase64); // Decodifica base64
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const reportBlob = new Blob([byteArray], { type: mimeType });
    const blobUrl = URL.createObjectURL(reportBlob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName; // Asigna el nombre de archivo
    link.click();

    URL.revokeObjectURL(blobUrl); // limpieza opcional
  }
}
