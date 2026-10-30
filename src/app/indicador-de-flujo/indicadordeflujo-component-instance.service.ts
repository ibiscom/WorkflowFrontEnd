import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { IndicadorDeFlujoComponent } from './indicadordeflujo.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class IndicadorDeFlujoComponentInstanceService extends BaseComponentInstanceService<IndicadorDeFlujoComponent> {}

