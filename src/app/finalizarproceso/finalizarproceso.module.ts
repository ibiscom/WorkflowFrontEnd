import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoFinalizarprocesoComponent } from './listado-finalizarproceso/listado-finalizarproceso.component';
import { FinalizarprocesoComponent } from './finalizarproceso.component';
import { FinalizarprocesoComponentInstanceService } from './finalizarproceso-component-instance.service';
import { FinalizarprocesoService } from './finalizarproceso.service';
import { FiltrosBusquedaFinalizarprocesoComponent } from './filtros-busqueda-finalizarproceso/filtros-busqueda-finalizarproceso.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaFinalizarprocesoComponent,
    ListadoFinalizarprocesoComponent,
    FinalizarprocesoComponent,
  ],
  providers: [FinalizarprocesoComponentInstanceService, FinalizarprocesoService],
  exports: [
    FiltrosBusquedaFinalizarprocesoComponent,
    ListadoFinalizarprocesoComponent,
    FinalizarprocesoComponent,
  ],
})
export class FinalizarprocesoModule {}

