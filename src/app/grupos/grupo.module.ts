import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaGrupoComponent } from './filtros-busqueda-grupo/filtros-busqueda-grupo.component';
import { ListadoGrupoComponent } from './listado-grupo/listado-grupo.component';
import { GrupoComponent } from './grupo.component';
import { GrupoComponentInstanceService } from './grupo-component-instance.service';
import { GrupoService } from './grupo.service';
import { CrearGrupoComponent } from './crear-grupo/crear-grupo.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearGrupoComponent,
    FiltrosBusquedaGrupoComponent,
    ListadoGrupoComponent,
    GrupoComponent,
  ],
  providers: [GrupoComponentInstanceService, GrupoService],
  exports: [
    CrearGrupoComponent,
    FiltrosBusquedaGrupoComponent,
    ListadoGrupoComponent,
    GrupoComponent,
  ],
})
export class GrupoModule {}

