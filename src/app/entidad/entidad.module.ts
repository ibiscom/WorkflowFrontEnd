import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaEntidadComponent } from './filtros-busqueda-entidad/filtros-busqueda-entidad.component';
import { ListadoEntidadComponent } from './listado-entidad/listado-entidad.component';
import { EntidadComponent } from './entidad.component';
import { EntidadComponentInstanceService } from './entidad-component-instance.service';
import { EntidadService } from './entidad.service';
import { CrearEntidadComponent } from './crear-entidad/crear-entidad.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearEntidadComponent,
    FiltrosBusquedaEntidadComponent,
    ListadoEntidadComponent,
    EntidadComponent,
  ],
  providers: [EntidadComponentInstanceService, EntidadService],
  exports: [
    CrearEntidadComponent,
    FiltrosBusquedaEntidadComponent,
    ListadoEntidadComponent,
    EntidadComponent,
  ],
})
export class EntidadModule {}
