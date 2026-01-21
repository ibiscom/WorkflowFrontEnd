import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { WorkflowComponent } from './workflow.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Workflows.
 */
export class WorkflowComponentInstanceService extends BaseComponentInstanceService<WorkflowComponent> {}
