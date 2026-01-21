import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaWorkflowComponent } from './filtros-busqueda-workflow/filtros-busqueda-workflow.component';
import { ListadoWorkflowComponent } from './listado-workflow/listado-workflow.component';
import { WorkflowComponent } from './workflow.component';
import { WorkflowComponentInstanceService } from './workflow-component-instance.service';
import { WorkflowService } from './workflow.service';
import { CrearWorkflowComponent } from './crear-workflow/crear-workflow.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearWorkflowComponent,
    FiltrosBusquedaWorkflowComponent,
    ListadoWorkflowComponent,
    WorkflowComponent,
  ],
  providers: [WorkflowComponentInstanceService, WorkflowService],
  exports: [
    CrearWorkflowComponent,
    FiltrosBusquedaWorkflowComponent,
    ListadoWorkflowComponent,
    WorkflowComponent,
  ],
})
export class WorkflowModule {}
