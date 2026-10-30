import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { ConsultarTrazabilidadComponent } from './consultartrazabilidad.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class ConsultarTrazabilidadComponentInstanceService extends BaseComponentInstanceService<ConsultarTrazabilidadComponent> {}

