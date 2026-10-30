import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoActividadRealizadaPorTareaComponent } from './listado-actividadrealizadaportarea/listado-actividadrealizadaportarea.component';
import { ActividadRealizadaPorTareaComponent } from './actividadrealizadaportarea.component';
import { ActividadRealizadaPorTareaComponentInstanceService } from './actividadrealizadaportarea-component-instance.service';
import { ActividadRealizadaPorTareaService } from './actividadrealizadaportarea.service';
import { FiltrosBusquedaActividadRealizadaPorTareaComponent } from './filtros-busqueda-actividadrealizadaportarea/filtros-busqueda-actividadrealizadaportarea.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaActividadRealizadaPorTareaComponent,
    ListadoActividadRealizadaPorTareaComponent,
    ActividadRealizadaPorTareaComponent,
  ],
  providers: [ActividadRealizadaPorTareaComponentInstanceService, ActividadRealizadaPorTareaService],
  exports: [
    FiltrosBusquedaActividadRealizadaPorTareaComponent,
    ListadoActividadRealizadaPorTareaComponent,
    ActividadRealizadaPorTareaComponent,
  ],
})
export class ActividadRealizadaPorTareaModule {}

