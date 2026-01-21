import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { GruposComponent } from './grupos.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class GruposComponentInstanceService extends BaseComponentInstanceService<GruposComponent> {}
