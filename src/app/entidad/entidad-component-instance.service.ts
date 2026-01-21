import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { EntidadComponent } from './entidad.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Workflows.
 */
export class EntidadComponentInstanceService extends BaseComponentInstanceService<EntidadComponent> {}
