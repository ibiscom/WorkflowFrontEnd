import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaMigworkflowComponent } from './filtros-busqueda-migworkflow/filtros-busqueda-migworkflow.component';
import { MigworkflowComponent } from './migworkflow.component';
import { MigworkflowComponentInstanceService } from './migworkflow-component-instance.service';
import { MigworkflowService } from './migworkflow.service';
import { ListadoMigworkflowComponent } from './listado-migworkflow/listado-migworkflow.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaMigworkflowComponent,
    ListadoMigworkflowComponent,
    MigworkflowComponent,
  ],
  providers: [MigworkflowComponentInstanceService, MigworkflowService],
  exports: [
    FiltrosBusquedaMigworkflowComponent,
    ListadoMigworkflowComponent,
    MigworkflowComponent,
  ],
})
export class MigworkflowModule {}
