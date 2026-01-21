import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { HerramientaComponent } from './herramienta.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Herramientas.
 */
export class HerramientaComponentInstanceService extends BaseComponentInstanceService<HerramientaComponent> {}
