import { Component } from '@angular/core';
import { DistribuirtareaComponent } from '../distribuirtarea.component';
import { FiltrosBusquedaDistribuirtareaComponent } from '../filtros-busqueda-distribuirtarea/filtros-busqueda-distribuirtarea.component';
import { MatTableModule } from '@angular/material/table';
import { DistribuirtareaEntity } from '../distribuirtarea.entity';

@Component({
  selector: 'ibpm-listado-distribuirtarea',
  imports: [MatTableModule, FiltrosBusquedaDistribuirtareaComponent],
  templateUrl: './listado-distribuirtarea.component.html',
  styleUrl: './listado-distribuirtarea.component.scss',
})
/**
 * Listado de distribuirtarea con navegación a la edición y utilidades de presentación.
 */
export class ListadoDistribuirtareaComponent {
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

  constructor(public parent: DistribuirtareaComponent) {}

  /**
   * Navega a la pantalla de edición de la tarea seleccionada.
   */
  public goToEditarDistribuirtarea(distribuirtarea: DistribuirtareaEntity) {
    this.parent.router.navigate([
      `/main-page/distribuirtarea/editarDistribuirtarea/${distribuirtarea.nombre}`,
    ]);
  }

   /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getDistribuirtareaName(distribuirtareaName: any) {
    const distribuirtarea = this.parent.distribuirtareas.find((c) => c.nombre === distribuirtareaName);
    return distribuirtarea ? distribuirtarea.nombre : '';
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
      this.parent.buscarDistribuirtarea(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarDistribuirtarea(); // ajusta si tu método se llama diferente
    }
  }

  seleccionarTodos = false;

seleccionarTodosRegistros(): void {
  this.parent.distribuirtareas.forEach((item: any) => {
    item.seleccionado = this.seleccionarTodos;
  });
}
}

