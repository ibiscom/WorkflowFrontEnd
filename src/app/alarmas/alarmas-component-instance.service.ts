import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { AlarmaComponent } from './alarmas.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class AlarmaComponentInstanceService extends BaseComponentInstanceService<AlarmaComponent> {}

