import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { ConsultarRolResponsableComponent } from './consultarrolresponsable.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Workflows.
 */
export class ConsultarRolResponsableComponentInstanceService extends BaseComponentInstanceService<ConsultarRolResponsableComponent> {}
