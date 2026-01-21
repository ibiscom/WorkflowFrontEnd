import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { ResponsableComponent } from './responsable.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Workflows.
 */
export class ResponsableComponentInstanceService extends BaseComponentInstanceService<ResponsableComponent> {}
