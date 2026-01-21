import { Component, Input } from '@angular/core';
import { EntityLogEntity } from '../../entities/entities/entity-log.entity';
import { LogAuditoriaService } from '../log-auditoria.service';
import { MessageUtil } from '../../utils/message.util';
import { Constants } from '../../utils/constants';
import { LogAuditoriaComponent } from '../log-auditoria.component';
import { LogAuditoriaComponentInstanceService } from '../log-auditoria-component-instance.service';
import { ActivatedRoute } from '@angular/router';
import { EntityLogPropertyEntity } from '../../entities/entities/entity-log-property.entity';
import { SeccionVerDetalleLaComponent } from '../seccion-ver-detalle-la/seccion-ver-detalle-la.component';
import { MatTableModule } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-listado-detalle-log-auditoria',
  imports: [SeccionVerDetalleLaComponent, MatTableModule],
  templateUrl: './listado-detalle-log-auditoria.component.html',
  styleUrl: './listado-detalle-log-auditoria.component.scss',
})
/**
 * Muestra el detalle de un log de auditoría, incluyendo propiedades modificadas.
 */
export class ListadoDetalleLogAuditoriaComponent {
  public entityLog?: EntityLogEntity;
  public id?: string;
  public uc?: LogAuditoriaComponent;
  public logDetails: EntityLogPropertyEntity[] = [];
  public displayedColumns: string[] = [
    'Cambio',
    'Propiedad',
    'Valor anterior',
    'Valor nuevo',
  ];

  constructor(
    private route: ActivatedRoute,
    private logAuditoriaComponentInstanceService: LogAuditoriaComponentInstanceService,
    private logAuditoriaService: LogAuditoriaService,
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam !== null ? idParam : undefined;
    this.uc = this.logAuditoriaComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el componente cargando el log y sus detalles.
   */
  public async ngOnInit(): Promise<void> {
    await this.getEntityLog();
    await this.getEntityLogDetails();
  }

  /**
   * Carga un log de auditoría por ID.
   */
  private async getEntityLog(): Promise<void> {
    if (this.id) {
      try {
        const response = await firstValueFrom(
          this.logAuditoriaService.getEntityLog(this.id),
        );
        if (response?.respuesta) {
          this.entityLog = response.respuesta;
        }
      } catch (error) {
        console.error(Constants.ERR_LOG_AUDITORIA_DETALLE, error);
        this.uc!.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_LOG_AUDITORIA_DETALLE,
          error,
        );
      }
    }
  }

  /**
   * Carga el detalle (propiedades) del log de auditoría cargado.
   */
  public async getEntityLogDetails(): Promise<void> {
    if (this.entityLog) {
      try {
        this.logDetails = [];
        const response = await firstValueFrom(
          this.logAuditoriaService.getLogProperties(this.id || ''),
        );
        if (response?.respuesta) {
          this.logDetails = response.respuesta;
        }
      } catch (error) {
        console.error(Constants.ERR_LOG_AUDITORIA_PROPIEDADES, error);
        this.uc!.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_LOG_AUDITORIA_PROPIEDADES,
          error,
        );
      }
    }
  }
}
