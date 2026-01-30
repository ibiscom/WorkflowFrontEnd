import { Component } from '@angular/core';
import { HerramientaComponent } from '../herramienta.component';
import { FiltrosBusquedaHerramientaComponent } from '../filtros-busqueda-herramienta/filtros-busqueda-herramienta.component';
import { MatTableModule } from '@angular/material/table';
import { HerramientaEntity } from '../herramienta.entity';

@Component({
  selector: 'ibpm-listado-herramienta',
  imports: [MatTableModule, FiltrosBusquedaHerramientaComponent],
  templateUrl: './listado-herramienta.component.html',
  styleUrl: './listado-herramienta.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoHerramientaComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Descripción',
    'Supervisor',
    'Compania',
  ];

  constructor(public parent: HerramientaComponent) {}

  /**
   * Navega a la pantalla de edición del grupo seleccionado.
   */
  public goToEditarHerramienta(herramienta: HerramientaEntity) {
    this.parent.router.navigate([
      `/main-page/administrarherramienta/editarHerramienta/${herramienta.nombre}`,
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
      this.parent.searchHerramienta(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.searchHerramienta(); // ajusta si tu método se llama diferente
    }
  }
}

