import { Component } from '@angular/core';
import { EventoinicioComponent } from '../eventoinicio.component';
import { FiltrosBusquedaEventoinicioComponent } from '../filtros-busqueda-eventoinicio/filtros-busqueda-eventoinicio.component';
import { MatTableModule } from '@angular/material/table';
import { EventoinicioEntity } from '../eventoinicio.entity';

@Component({
  selector: 'ibpm-listado-eventoinicio',
  imports: [MatTableModule, FiltrosBusquedaEventoinicioComponent],
  templateUrl: './listado-eventoinicio.component.html',
  styleUrl: './listado-eventoinicio.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoEventoinicioComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Descripción',
    'Supervisor',
    'Compania',
  ];

  constructor(public parent: EventoinicioComponent) {}

  /**
   * Navega a la pantalla de edición del grupo seleccionado.
   */
  public goToEditarEventoinicio(eventoinicio: EventoinicioEntity) {
    this.parent.router.navigate([
      `/main-page/administrarEventoinicio/editarEventoinicio/${eventoinicio.nombre}`,
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
      this.parent.searchEventosdeinicio(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.searchEventosdeinicio(); // ajusta si tu método se llama diferente
    }
  }
}
