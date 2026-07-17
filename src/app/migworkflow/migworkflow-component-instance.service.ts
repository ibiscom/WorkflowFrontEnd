import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { MigworkflowComponent } from './migworkflow.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Workflows.
 */
export class MigworkflowComponentInstanceService extends BaseComponentInstanceService<MigworkflowComponent> {}
