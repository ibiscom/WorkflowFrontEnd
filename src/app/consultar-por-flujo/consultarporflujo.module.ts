import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoConsultarPorFlujoComponent } from './listado-consultarporflujo/listado-consultarporflujo.component';
import { ConsultarPorFlujoComponent } from './consultarporflujo.component';
import { ConsultarPorFlujoComponentInstanceService } from './consultarporflujo-component-instance.service';
import { ConsultarPorFlujoService } from './consultarporflujo.service';
import { FiltrosBusquedaConsultarPorFlujoComponent } from './filtros-busqueda-consultarporflujo/filtros-busqueda-consultarporflujo.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaConsultarPorFlujoComponent,
    ListadoConsultarPorFlujoComponent,
    ConsultarPorFlujoComponent,
  ],
  providers: [ConsultarPorFlujoComponentInstanceService, ConsultarPorFlujoService],
  exports: [
    FiltrosBusquedaConsultarPorFlujoComponent,
    ListadoConsultarPorFlujoComponent,
    ConsultarPorFlujoComponent,
  ],
})
export class ConsultarPorFlujoModule {}

