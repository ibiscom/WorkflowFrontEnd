import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoConsultarPorObjetoComponent } from './listado-consultarporobjeto/listado-consultarporobjeto.component';
import { ConsultarPorObjetoComponent } from './consultarporobjeto.component';
import { ConsultarPorObjetoComponentInstanceService } from './consultarporobjeto-component-instance.service';
import { ConsultarPorObjetoService } from './consultarporobjeto.service';
import { FiltrosBusquedaConsultarPorObjetoComponent } from './filtros-busqueda-consultarporobjeto/filtros-busqueda-consultarporobjeto.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaConsultarPorObjetoComponent,
    ListadoConsultarPorObjetoComponent,
    ConsultarPorObjetoComponent,
  ],
  providers: [ConsultarPorObjetoComponentInstanceService, ConsultarPorObjetoService],
  exports: [
    FiltrosBusquedaConsultarPorObjetoComponent,
    ListadoConsultarPorObjetoComponent,
    ConsultarPorObjetoComponent,
  ],
})
export class ConsultarPorObjetoModule {}

