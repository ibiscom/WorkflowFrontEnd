import { Component } from '@angular/core';
import { EntidadComponent } from '../entidad.component';
import { FiltrosBusquedaEntidadComponent } from '../filtros-busqueda-entidad/filtros-busqueda-entidad.component';
import { MatTableModule } from '@angular/material/table';
import { EntidadEntity } from '../entidad.entity';

@Component({
  selector: 'ibpm-listado-entidad',
  imports: [MatTableModule, FiltrosBusquedaEntidadComponent],
  templateUrl: './listado-entidad.component.html',
  styleUrl: './listado-entidad.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoEntidadComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Descripción',
    'Supervisor',
    'Compania',
  ];

  constructor(public parent: EntidadComponent) {}

  /**
   * Navega a la pantalla de edición del grupo seleccionado.
   */
  public goToEditarEntidad(entidad: EntidadEntity) {
    this.parent.router.navigate([
      `/main-page/administrarEntidad/editarEntidad/${entidad.nombre}`,
    ]);
  }

  /**
   * Obtiene el nombre legible de la compañía a partir del identificador.
   */
  public getCompanyName(companyId: any) {
    const company = this.parent.companias.find((c) => c.name === companyId);
    return company ? company.largeName : '';
  }

  // 🔹 Ir a página anterior
  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.parent.searchEntidades(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.searchEntidades(); // ajusta si tu método se llama diferente
    }
  }
}
