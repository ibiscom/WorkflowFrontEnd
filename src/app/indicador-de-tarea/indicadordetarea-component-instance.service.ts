import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { IndicadorDeTareaComponent } from './indicadordetarea.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class IndicadorDeTareaComponentInstanceService extends BaseComponentInstanceService<IndicadorDeTareaComponent> {}

