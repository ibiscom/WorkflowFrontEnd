import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoActividadPendientePorResponsableComponent } from './listado-actividadpendienteporresponsable/listado-actividadpendienteporresponsable.component';
import { ActividadPendientePorResponsableComponent } from './actividadpendienteporresponsable.component';
import { ActividadPendientePorResponsableComponentInstanceService } from './actividadpendienteporresponsable-component-instance.service';
import { ActividadPendientePorResponsableService } from './actividadpendienteporresponsable.service';
import { FiltrosBusquedaActividadPendientePorResponsableComponent } from './filtros-busqueda-actividadpendienteporresponsable/filtros-busqueda-actividadpendienteporresponsable.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaActividadPendientePorResponsableComponent,
    ListadoActividadPendientePorResponsableComponent,
    ActividadPendientePorResponsableComponent,
  ],
  providers: [ActividadPendientePorResponsableComponentInstanceService, ActividadPendientePorResponsableService],
  exports: [
    FiltrosBusquedaActividadPendientePorResponsableComponent,
    ListadoActividadPendientePorResponsableComponent,
    ActividadPendientePorResponsableComponent,
  ],
})
export class ActividadPendientePorResponsableModule {}

