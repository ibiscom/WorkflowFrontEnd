import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { ConsultarPorTareaComponent } from './consultarportarea.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class ConsultarPorTareaComponentInstanceService extends BaseComponentInstanceService<ConsultarPorTareaComponent> {}

