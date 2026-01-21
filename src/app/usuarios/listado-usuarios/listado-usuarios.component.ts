import { Component, Input } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { UsuariosComponent } from '../usuarios.component';
import { FiltrosBusquedaUsuariosComponent } from '../filtros-busqueda-usuarios/filtros-busqueda-usuarios.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fs-listado-usuarios',
  imports: [
    CommonModule,
    MatTableModule,
    FiltrosBusquedaUsuariosComponent,
    MatCheckboxModule,
  ],
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.scss',
})
/**
 * Componente encargado de mostrar el listado de usuarios
 * con su respectiva tabla y columnas.
 *
 * Expone acciones de navegación para editar un usuario.
 */
export class ListadoUsuariosComponent {
  public currentPage: number = 1;
  public numberOfPages: number = 1;
  public displayedColumns: string[] = [
    'Seleccionar',
    'Usuario',
    'Nombres',
    'Apellidos',
    'Documento',
    'Compania',
    'Grupo',
    'Estado',
    'Fecha de activacion',
    'Fecha de desactivacion',
  ];

  constructor(public parent: UsuariosComponent) {}

  /**
   * Navega a la pantalla de edición del usuario seleccionado.
   *
   * @param userName Identificador del usuario (user name).
   */
  public goToEditarUsuario(userName?: string): void {
    if (!userName) return;

    this.parent.router.navigate([
      `/main-page/administrarUsuarios/editarUsuario/${userName}`,
    ]);
  }

  /**
   * Llama a la función toggleMassiveActionsList del componente padre.
   * @param userName Identificador del usuario seleccionado o deseleccionado (user name).
   * @param checked Estado del checkbox (seleccionado o no).
   */
  public toggleMassiveActionsList(userName?: string, checked?: boolean): void {
    if (!userName) return;

    this.parent.toggleMassiveActionsList(userName, !!checked);
  }
}
