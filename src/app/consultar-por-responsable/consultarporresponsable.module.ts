import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoConsultarPorResponsableComponent } from './listado-consultarporresponsable/listado-consultarportarea.component';
import { ConsultarPorResponsableComponent } from './consultarporresponsable.component';
import { ConsultarPorResponsableComponentInstanceService } from './consultarporresponsable-component-instance.service';
import { ConsultarPorResponsableService } from './consultarporresponsable.service';
import { FiltrosBusquedaConsultarPorResponsableComponent } from './filtros-busqueda-consultarporresponsable/filtros-busqueda-consultarporresponsable.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaConsultarPorResponsableComponent,
    ListadoConsultarPorResponsableComponent,
    ConsultarPorResponsableComponent,
  ],
  providers: [ConsultarPorResponsableComponentInstanceService, ConsultarPorResponsableService],
  exports: [
    FiltrosBusquedaConsultarPorResponsableComponent,
    ListadoConsultarPorResponsableComponent,
    ConsultarPorResponsableComponent,
  ],
})
export class ConsultarPorResponsableModule {}

