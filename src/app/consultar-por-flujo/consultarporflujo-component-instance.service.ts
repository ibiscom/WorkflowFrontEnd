import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { ConsultarPorFlujoComponent } from './consultarporflujo.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class ConsultarPorFlujoComponentInstanceService extends BaseComponentInstanceService<ConsultarPorFlujoComponent> {}

