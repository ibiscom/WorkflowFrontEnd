import { Component } from '@angular/core';
import { FestivoComponent } from '../festivo.component';
import { FiltrosBusquedaFestivoComponent } from '../filtros-busqueda-festivo/filtros-busqueda-festivo.component';
import { MatTableModule } from '@angular/material/table';
import { FestivoEntity } from '../festivo.entity';

@Component({
  selector: 'ibpm-listado-festivo',
  imports: [MatTableModule, FiltrosBusquedaFestivoComponent],
  templateUrl: './listado-festivo.component.html',
  styleUrl: './listado-festivo.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoFestivoComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Descripción',
    'Supervisor',
    'Compania',
  ];

  constructor(public parent: FestivoComponent) {}

  /**
   * Navega a la pantalla de edición del grupo seleccionado.
   */
  public goToEditarFestivo(festivo: FestivoEntity) {
    this.parent.router.navigate([
      `/main-page/administrarFestivo/editarEFestivo/${festivo.nombre}`,
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
      this.parent.searchFestivos(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.searchFestivos(); // ajusta si tu método se llama diferente
    }
  }
}
