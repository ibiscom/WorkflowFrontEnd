import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FiltrosBusquedaCategoriasComponent } from '../filtros-busqueda-categorias/filtros-busqueda-categorias.component';
import { CategoriasComponent } from '../categorias.component';

@Component({
  selector: 'fs-listado-categorias',
  imports: [MatTableModule, FiltrosBusquedaCategoriasComponent],
  templateUrl: './listado-categorias.component.html',
  styleUrl: './listado-categorias.component.scss',
})
/**
 * Tabla de categorías con paginación y acceso a acciones.
 */
export class ListadoCategoriasComponent {
  public currentPage: number = 1;
  public numberOfPages: number = 1;
  public displayedColumns: string[] = ['Nombre', 'Descripción', 'Operaciones'];

  constructor(public parent: CategoriasComponent) {}

  /**
   * Navega a la pantalla de edición de la categoría indicada.
   */
  public goToEditarCategoria(nomCategoria: string): void {
    this.parent.router.navigate([
      `/main-page/administrarCategorias/editarCategoria/${nomCategoria}`,
    ]);
  }
}
