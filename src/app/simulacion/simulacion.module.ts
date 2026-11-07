import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoSimulacionComponent } from './listado-simulacion/listado-simulacion.component';
import { SimulacionComponent } from './simulacion.component';
import { SimulacionComponentInstanceService } from './simulacion-component-instance.service';
import { SimulacionService } from './simulacion.service';
import { FiltrosBusquedaSimulacionComponent } from './filtros-busqueda-simulacion/filtros-busqueda-simulacion.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaSimulacionComponent,
    ListadoSimulacionComponent,
    SimulacionComponent,
  ],
  providers: [SimulacionComponentInstanceService, SimulacionService],
  exports: [
    FiltrosBusquedaSimulacionComponent,
    ListadoSimulacionComponent,
    SimulacionComponent,
  ],
})
export class SimulacionModule {}

