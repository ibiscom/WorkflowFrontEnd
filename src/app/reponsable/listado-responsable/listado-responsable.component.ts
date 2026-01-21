import { Component } from '@angular/core';
import { ResponsableComponent } from '../responsable.component';
import { FiltrosBusquedaResponsableComponent } from '../filtros-busqueda-responsable/filtros-busqueda-responsable.component';
import { MatTableModule } from '@angular/material/table';
import { ResponsableEntity } from '../responsable.entity';

@Component({
  selector: 'ibpm-listado-responsable',
  imports: [MatTableModule, FiltrosBusquedaResponsableComponent],
  templateUrl: './listado-responsable.component.html',
  styleUrl: './listado-responsable.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoResponsableComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Descripción',
    'Supervisor',
    'Compania',
  ];

  constructor(public parent: ResponsableComponent) {}

  /**
   * Navega a la pantalla de edición del grupo seleccionado.
   */
  public goToEditarResponsable(responsable: ResponsableEntity) {
    this.parent.router.navigate([
      `/main-page/administrarResponsable/editarResponsable/${responsable.nombre}`,
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
      this.parent.searchResponsables(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.searchResponsables(); // ajusta si tu método se llama diferente
    }
  }
}
