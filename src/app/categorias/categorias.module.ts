import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasComponentInstanceService } from './categorias-component-instance.service';
import { CategoriasComponent } from './categorias.component';
import { CategoriasService } from './categorias.service';
import { ListadoCategoriasComponent } from './listado-categorias/listado-categorias.component';
import { AccionesCategoriasComponent } from './acciones-categorias/acciones-categorias.component';
import { FiltrosBusquedaCategoriasComponent } from './filtros-busqueda-categorias/filtros-busqueda-categorias.component';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CategoriasComponent,
    ListadoCategoriasComponent,
    AccionesCategoriasComponent,
    FiltrosBusquedaCategoriasComponent,
    CrearCategoriaComponent,
  ],
  providers: [CategoriasService, CategoriasComponentInstanceService],
  exports: [
    CategoriasComponent,
    ListadoCategoriasComponent,
    AccionesCategoriasComponent,
    FiltrosBusquedaCategoriasComponent,
    CrearCategoriaComponent,
  ],
})
export class CategoriasModule {}
