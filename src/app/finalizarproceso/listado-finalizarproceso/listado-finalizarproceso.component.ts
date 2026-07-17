import { Component } from '@angular/core';
import { FinalizarprocesoComponent } from '../finalizarproceso.component';
import { FiltrosBusquedaFinalizarprocesoComponent } from '../filtros-busqueda-finalizarproceso/filtros-busqueda-finalizarproceso.component';
import { MatTableModule } from '@angular/material/table';
import { FinalizarprocesoEntity } from '../finalizarproceso.entity';

@Component({
  selector: 'ibpm-listado-finalizarproceso',
  imports: [MatTableModule, FiltrosBusquedaFinalizarprocesoComponent],
  templateUrl: './listado-finalizarproceso.component.html',
  styleUrl: './listado-finalizarproceso.component.scss',
})
/**
 * Listado de finalizarproceso con navegación a la edición y utilidades de presentación.
 */
export class ListadoFinalizarprocesoComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Numero',
    'Nombre',
    'Nombre Largo',
    'Descripción',
    'Tipo',
  ];

  constructor(public parent: FinalizarprocesoComponent) {}

  /**
   * Navega a la pantalla de edición de la tarea seleccionada.
   */
  public goToEditarFinalizarproceso(finalizarproceso: FinalizarprocesoEntity) {
    this.parent.router.navigate([
      `/main-page/finalizarproceso/editarFinalizarproceso/${finalizarproceso.nombre}`,
    ]);
  }

   /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getFinalizarprocesoName(finalizarprocesoName: any) {
    const finalizarproceso = this.parent.finalizarproceso.find((c) => c.nombre === finalizarprocesoName);
    return finalizarproceso ? finalizarproceso.nombre : '';
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
      this.parent.buscarFinalizarproceso(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarFinalizarproceso(); // ajusta si tu método se llama diferente
    }
  }
}

