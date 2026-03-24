import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { PatronComponent } from './patron.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Patrones.
 */
export class PatronComponentInstanceService extends BaseComponentInstanceService<PatronComponent> {}

