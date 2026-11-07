import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { SimulacionComponent } from './simulacion.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class SimulacionComponentInstanceService extends BaseComponentInstanceService<SimulacionComponent> {}

