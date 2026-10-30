import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoConsultarTrazabilidadComponent } from './listado-consultartrazabilidad/listado-consultartrazabilidad.component';
import { ConsultarTrazabilidadComponent } from './consultartrazabilidad.component';
import { ConsultarTrazabilidadComponentInstanceService } from './consultartrazabilidad-component-instance.service';
import { ConsultarTrazabilidadService } from './consultartrazabilidad.service';
import { FiltrosBusquedaConsultarTrazabilidadComponent } from './filtros-busqueda-consultartrazabilidad/filtros-busqueda-consultartrazabilidad.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaConsultarTrazabilidadComponent,
    ListadoConsultarTrazabilidadComponent,
    ConsultarTrazabilidadComponent,
  ],
  providers: [ConsultarTrazabilidadComponentInstanceService, ConsultarTrazabilidadService],
  exports: [
    FiltrosBusquedaConsultarTrazabilidadComponent,
    ListadoConsultarTrazabilidadComponent,
    ConsultarTrazabilidadComponent,
  ],
})
export class ConsultarTrazabilidadModule {}

