import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { ConsultarPorResponsableComponent } from './consultarporresponsable.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class ConsultarPorResponsableComponentInstanceService extends BaseComponentInstanceService<ConsultarPorResponsableComponent> {}

