import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { FinalizarprocesoComponent } from './finalizarproceso.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class FinalizarprocesoComponentInstanceService extends BaseComponentInstanceService<FinalizarprocesoComponent> {}

