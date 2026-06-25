import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaListarTareaComponent } from './filtros-busqueda-listar-tareas/filtros-busqueda-listar-tareas.component';
import { ListadoListarTareaComponent } from './listado-listar-tareas/listado-listar-tareas.component';
import { ListarTareaComponent } from './listar-tareas.component';
import { ListarTareaComponentInstanceService } from './listar-tareas-component-instance.service';
import { ListarTareaService } from './listar-tareas.service';
import { CrearListarTareaComponent } from './mostrar-herramienta/mostrar-herramienta.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearListarTareaComponent,
    FiltrosBusquedaListarTareaComponent,
    ListadoListarTareaComponent,
    ListarTareaComponent,
  ],
  providers: [ListarTareaComponentInstanceService, ListarTareaService],
  exports: [
    CrearListarTareaComponent,
    FiltrosBusquedaListarTareaComponent,
    ListadoListarTareaComponent,
    ListarTareaComponent,
  ],
})
export class ListarTareaModule {}
