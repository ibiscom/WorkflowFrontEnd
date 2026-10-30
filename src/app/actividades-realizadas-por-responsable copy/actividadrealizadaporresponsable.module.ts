import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoActividadRealizadaPorResponsableComponent } from './listado-actividadrealizadaporresponsable/listado-actividadrealizadaporresponsable.component';
import { ActividadRealizadaPorResponsableComponent } from './actividadrealizadaporresponsable.component';
import { ActividadRealizadaPorResponsableComponentInstanceService } from './actividadrealizadaporresponsable-component-instance.service';
import { ActividadRealizadaPorResponsableService } from './actividadrealizadaporresponsable.service';
import { FiltrosBusquedaActividadRealizadaPorResponsableComponent } from './filtros-busqueda-actividadrealizadaporresponsable/filtros-busqueda-actividadrealizadaporresponsable.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaActividadRealizadaPorResponsableComponent,
    ListadoActividadRealizadaPorResponsableComponent,
    ActividadRealizadaPorResponsableComponent,
  ],
  providers: [ActividadRealizadaPorResponsableComponentInstanceService, ActividadRealizadaPorResponsableService],
  exports: [
    FiltrosBusquedaActividadRealizadaPorResponsableComponent,
    ListadoActividadRealizadaPorResponsableComponent,
    ActividadRealizadaPorResponsableComponent,
  ],
})
export class ActividadRealizadaPorResponsableModule {}

