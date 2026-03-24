import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaPatronComponent } from './filtros-busqueda-patron/filtros-busqueda-patron.component';
import { ListadoPatronComponent } from './listado-patron/listado-patron.component';
import { PatronComponent } from './patron.component';
import { PatronComponentInstanceService } from './patron-component-instance.service';
import { PatronService } from './patron.service';
import { CrearPatronComponent } from './crear-patron/crear-patron.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearPatronComponent,
    FiltrosBusquedaPatronComponent,
    ListadoPatronComponent,
    PatronComponent,
  ],
  providers: [PatronComponentInstanceService, PatronService],
  exports: [
    CrearPatronComponent,
    FiltrosBusquedaPatronComponent,
    ListadoPatronComponent,
    PatronComponent,
  ],
})
export class PatronModule {}

