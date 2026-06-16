import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoEventoInicioComponent } from './listado-eventoinicio/listado-eventoinicio.component';
import { EventoInicioComponent } from './eventoinicio.component';
import { EventoInicioComponentInstanceService } from './eventoinicio-component-instance.service';
import { EventoInicioService } from './eventoinicio.service';
import { CrearEventoInicioComponent } from './crear-eventoinicio/crear-eventoinicio.component';
import { FiltrosBusquedaEventoInicioComponent } from './filtros-busqueda-eventoinicio/filtros-busqueda-eventoinicio.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearEventoInicioComponent
    FiltrosBusquedaEventoInicioComponent,
    ListadoEventoInicioComponent,
    EventoInicioComponent,
  ],
  providers: [EventoInicioComponentInstanceService, EventoInicioService],
  exports: [
    CrearEventoInicioComponent,
    FiltrosBusquedaEventoInicioComponent,
    ListadoEventoInicioComponent,
    EventoInicioComponent,
  ],
})
export class EventoInicioModule {}

