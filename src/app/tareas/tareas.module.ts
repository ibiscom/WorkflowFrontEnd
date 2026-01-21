import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoTareasComponent } from './listado-tareas/listado-tareas.component';
import { TareasComponent } from './tareas.component';
import { TareasComponentInstanceService } from './tareas-component-instance.service';
import { TareasService } from './tareas.service';
import { CrearTareasComponent } from './crear-tareas/crear-tareas.component';
import { FiltrosBusquedaTareasComponent } from './filtros-busqueda-tareas/filtros-busqueda-tareas.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearTareasComponent,
    FiltrosBusquedaTareasComponent,
    ListadoTareasComponent,
    TareasComponent,
  ],
  providers: [TareasComponentInstanceService, TareasService],
  exports: [
    CrearTareasComponent,
    FiltrosBusquedaTareasComponent,
    ListadoTareasComponent,
    TareasComponent,
  ],
})
export class TareasModule {}
