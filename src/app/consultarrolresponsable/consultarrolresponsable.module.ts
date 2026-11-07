import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaConsultarRolResponsableComponent } from './filtros-busqueda-consultarrolresponsable/filtros-busqueda-consultarrolresponsable.component';
import { ListadoConsultarRolResponsableComponent } from './listado-consultarrolresponsable/listado-consultarrolresponsable.component';
import { ConsultarRolResponsableComponent } from './consultarrolresponsable.component';
import { ConsultarRolResponsableComponentInstanceService } from './consultarrolresponsable-component-instance.service';
import { ConsultarRolResponsableService } from './consultarrolresponsable.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaConsultarRolResponsableComponent,
    ListadoConsultarRolResponsableComponent,
    ConsultarRolResponsableComponent,
  ],
  providers: [ConsultarRolResponsableComponentInstanceService, ConsultarRolResponsableService],
  exports: [
    FiltrosBusquedaConsultarRolResponsableComponent,
    ListadoConsultarRolResponsableComponent,
    ConsultarRolResponsableComponent,
  ],
})
export class ConsultarRolResponsableModule {}
