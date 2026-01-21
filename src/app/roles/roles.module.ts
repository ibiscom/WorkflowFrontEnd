import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaRolesComponent } from './filtros-busqueda-roles/filtros-busqueda-roles.component';
import { ListadoRolesComponent } from './listado-roles/listado-roles.component';
import { RolesComponent } from './roles.component';
import { RolesComponentInstanceService } from './roles-component-instance.service';
import { RolesService } from './roles.service';
import { CrearRolesComponent } from './crear-roles/crear-roles.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearRolesComponent,
    FiltrosBusquedaRolesComponent,
    ListadoRolesComponent,
    RolesComponent,
  ],
  providers: [RolesComponentInstanceService, RolesService],
  exports: [
    CrearRolesComponent,
    FiltrosBusquedaRolesComponent,
    ListadoRolesComponent,
    RolesComponent,
  ],
})
export class RolesModule {}
