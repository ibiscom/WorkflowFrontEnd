import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { DistribuirtareaComponent } from './distribuirtarea.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class DistribuirtareaComponentInstanceService extends BaseComponentInstanceService<DistribuirtareaComponent> {}

