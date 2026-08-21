import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoDistribuirtareaComponent } from './listado-distribuirtarea/listado-distribuirtarea.component';
import { DistribuirtareaComponent } from './distribuirtarea.component';
import { DistribuirtareaComponentInstanceService } from './distribuirtarea-component-instance.service';
import { DistribuirtareaService } from './distribuirtarea.service';
import { FiltrosBusquedaDistribuirtareaComponent } from './filtros-busqueda-distribuirtarea/filtros-busqueda-distribuirtarea.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaDistribuirtareaComponent,
    ListadoDistribuirtareaComponent,
    DistribuirtareaComponent,
  ],
  providers: [DistribuirtareaComponentInstanceService, DistribuirtareaService],
  exports: [
    FiltrosBusquedaDistribuirtareaComponent,
    ListadoDistribuirtareaComponent,
    DistribuirtareaComponent,
  ],
})
export class DistribuirtareaModule {}

