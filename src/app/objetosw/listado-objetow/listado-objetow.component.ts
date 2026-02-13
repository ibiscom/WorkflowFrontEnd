import { Component } from '@angular/core';
import { ObjetowComponent } from '../objetow.component';
import { FiltrosBusquedaObjetowComponent } from '../filtros-busqueda-objetow/filtros-busqueda-objetow.component';
import { MatTableModule } from '@angular/material/table';
import { ObjetowEntity } from '../objetow.entity';
import { AtributoObjetowEntity } from '../atributo-objetow.entity';

@Component({
  selector: 'ibpm-listado-objetow',
  imports: [MatTableModule, FiltrosBusquedaObjetowComponent],
  templateUrl: './listado-objetow.component.html',
  styleUrl: './listado-objetow.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoObjetowComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Descripción',
    'Supervisor',
    'Compania',
  ];

  constructor(public parent: ObjetowComponent) {
  }

  /**
   * Navega a la pantalla de edición del atributo de objeto workflow seleccionado.
   */
  public goToEditarAtributoObjetow(atributo: AtributoObjetowEntity) {
    this.parent.router.navigate([
      `/main-page/objetow/crearObjetow/${atributo.nombre}`,
    ]);
  }

   // 🔹 Ir a página anterior
  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.parent.buscarObjetoWorkflow(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarObjetoWorkflow(); // ajusta si tu método se llama diferente
    }
  }
}

