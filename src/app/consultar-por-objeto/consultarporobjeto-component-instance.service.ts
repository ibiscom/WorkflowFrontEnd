import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { ConsultarPorObjetoComponent } from './consultarporobjeto.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class ConsultarPorObjetoComponentInstanceService extends BaseComponentInstanceService<ConsultarPorObjetoComponent> {}

