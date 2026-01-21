import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosService } from './usuarios.service';
import { UsuariosComponentInstanceService } from './usuarios-component-instance.service';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { AccionesUsuariosComponent } from './acciones-usuarios/acciones-usuarios.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaUsuariosComponent } from './filtros-busqueda-usuarios/filtros-busqueda-usuarios.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UsuariosComponent,
    ListadoUsuariosComponent,
    CrearUsuarioComponent,
    AccionesUsuariosComponent,
    FiltrosBusquedaUsuariosComponent,
  ],
  providers: [UsuariosService, UsuariosComponentInstanceService],
  exports: [
    UsuariosComponent,
    ListadoUsuariosComponent,
    CrearUsuarioComponent,
    AccionesUsuariosComponent,
    FiltrosBusquedaUsuariosComponent,
  ],
})
export class UsuariosModule {}
