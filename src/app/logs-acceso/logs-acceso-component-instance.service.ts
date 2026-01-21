import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { LogsAccesoComponent } from './logs-acceso.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para compartir la instancia del componente padre de Logs de Acceso.
 */
export class LogsAccesoComponentInstanceService extends BaseComponentInstanceService<LogsAccesoComponent> {}
