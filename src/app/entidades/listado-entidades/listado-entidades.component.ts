import { Component } from '@angular/core';
import { EntidadesComponent } from '../entidades.component';
import { FiltrosBusquedaEntidadesComponent } from '../filtros-busqueda-entidades/filtros-busqueda-entidades.component';
import { MatTableModule } from '@angular/material/table';
import { EntidadEntity } from '../entidad.entity';

@Component({
  selector: 'ibpm-listado-entidad',
   templateUrl: './listado-entidades.component.html',
  styleUrl: './listado-entidades.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoEntidadesComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;
  public displayedColumns: string[] = [
    'Nombre',
    'Descripción',
    'listaGrupos'  ];

  constructor(public parent: EntidadesComponent) {}

  /**
   * Navega a la pantalla de edición del grupo seleccionado.
   */
  public goToEditarEntidad(entidad: EntidadEntity) {
  this.parent.router.navigate([
    'main-page',
    'entidades',
    'editarEntidad',
    entidad.nombre,
  ]);
}

  /**
   * Obtiene el nombre legible de la Entidad a partir del identificador.
   */
  public getEntityName(EntidadName: any) {
    const Entidad = this.parent.entidades.find((c) => c.nombre ===EntidadName);
    return Entidad ? Entidad.nombre : '';
  }

  // 🔹 Ir a página anterior
  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.parent.buscarEntidades(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarEntidades(); // ajusta si tu método se llama diferente
    }
  }
}
