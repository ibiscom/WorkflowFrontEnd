import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CrearGrupoComponent } from './crear-grupo/crear-grupo.component';
import { FiltrosBusquedaGruposComponent } from './filtros-busqueda-grupos/filtros-busqueda-grupos.component';
import { ListadoGruposComponent } from './listado-grupos/listado-grupos.component';
import { GruposComponent } from './grupos.component';
import { GruposComponentInstanceService } from './grupos-component-instance.service';
import { GruposService } from './grupos.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearGrupoComponent,
    FiltrosBusquedaGruposComponent,
    ListadoGruposComponent,
    GruposComponent,
  ],
  providers: [GruposComponentInstanceService, GruposService],
  exports: [
    CrearGrupoComponent,
    FiltrosBusquedaGruposComponent,
    ListadoGruposComponent,
    GruposComponent,
  ],
})
export class GruposModule {}
