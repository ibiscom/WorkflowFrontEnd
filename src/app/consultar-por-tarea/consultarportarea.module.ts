import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoConsultarPorTareaComponent } from './listado-consultarportarea/listado-consultarportarea.component';
import { ConsultarPorTareaComponent } from './consultarportarea.component';
import { ConsultarPorTareaComponentInstanceService } from './consultarportarea-component-instance.service';
import { ConsultarPorTareaService } from './consultarportarea.service';
import { FiltrosBusquedaConsultarPorTareaComponent } from './filtros-busqueda-consultarportarea/filtros-busqueda-consultarportarea.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaConsultarPorTareaComponent,
    ListadoConsultarPorTareaComponent,
    ConsultarPorTareaComponent,
  ],
  providers: [ConsultarPorTareaComponentInstanceService, ConsultarPorTareaService],
  exports: [
    FiltrosBusquedaConsultarPorTareaComponent,
    ListadoConsultarPorTareaComponent,
    ConsultarPorTareaComponent,
  ],
})
export class ConsultarPorTareaModule {}

