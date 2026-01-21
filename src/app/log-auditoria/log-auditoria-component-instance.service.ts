import { Injectable } from '@angular/core';
import { LogAuditoriaComponent } from './log-auditoria.component';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Log de Auditoría.
 */
export class LogAuditoriaComponentInstanceService extends BaseComponentInstanceService<LogAuditoriaComponent> {}
