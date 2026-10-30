import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoIndicadorDeFlujoComponent } from './listado-indicadordeflujo/listado-indicadordeflujo.component';
import { IndicadorDeFlujoComponent } from './indicadordeflujo.component';
import { IndicadorDeFlujoComponentInstanceService } from './indicadordeflujo-component-instance.service';
import { IndicadorDeFlujoService } from './indicadordeflujo.service';
import { FiltrosBusquedaIndicadorDeFlujoComponent } from './filtros-busqueda-indicadordeflujo/filtros-busqueda-indicadordeflujo.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaIndicadorDeFlujoComponent,
    ListadoIndicadorDeFlujoComponent,
    IndicadorDeFlujoComponent,
  ],
  providers: [IndicadorDeFlujoComponentInstanceService, IndicadorDeFlujoService],
  exports: [
    FiltrosBusquedaIndicadorDeFlujoComponent,
    ListadoIndicadorDeFlujoComponent,
    IndicadorDeFlujoComponent,
  ],
})
export class IndicadorDeFlujoModule {}

