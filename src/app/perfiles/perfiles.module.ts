import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';
import { AccionesPerfilesComponent } from './acciones-perfiles/acciones-perfiles.component';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';
import { FiltrosBusquedaPerfilesComponent } from './filtros-busqueda-perfil/filtros-busqueda-perfiles.component';
import { ListadoPerfilesComponent } from './listado-perfiles/listado-perfiles.component';
import { PerfilesComponent } from './perfiles.component';
import { PerfilesService } from './perfiles.service';
import { RouterModule } from '@angular/router';
import { PerfilesComponentInstanceService } from './perfiles-component-instance.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AccionesPerfilesComponent,
    CrearPerfilComponent,
    FiltrosBusquedaPerfilesComponent,
    ListadoPerfilesComponent,
    PerfilesComponent,
  ],
  providers: [PerfilesComponentInstanceService, PerfilesService],
  exports: [
    AccionesPerfilesComponent,
    CrearPerfilComponent,
    FiltrosBusquedaPerfilesComponent,
    ListadoPerfilesComponent,
    PerfilesComponent,
  ],
})
export class PerfilesModule {}
