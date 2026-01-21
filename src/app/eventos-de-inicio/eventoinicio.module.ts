import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaEventoinicioComponent } from './filtros-busqueda-eventoinicio/filtros-busqueda-eventoinicio.component';
import { ListadoEventoinicioComponent } from './listado-eventoinicio/listado-eventoinicio.component';
import { EventoinicioComponent } from './eventoinicio.component';
import { EventoinicioComponentInstanceService } from './eventoinicio-component-instance.service';
import { EventoinicioService } from './eventoinicio.service';
import { CrearEventoinicioComponent } from './crear-eventoinicio/crear-eventoinicio.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearEventoinicioComponent,
    FiltrosBusquedaEventoinicioComponent,
    ListadoEventoinicioComponent,
    EventoinicioComponent,
  ],
  providers: [EventoinicioComponentInstanceService, EventoinicioService],
  exports: [
    CrearEventoinicioComponent,
    FiltrosBusquedaEventoinicioComponent,
    ListadoEventoinicioComponent,
    EventoinicioComponent,
  ],
})
export class EventoinicioModule {}
