import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { FestivoComponent } from './festivo.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Festivos.
 */
export class FestivoComponentInstanceService extends BaseComponentInstanceService<FestivoComponent> {}
