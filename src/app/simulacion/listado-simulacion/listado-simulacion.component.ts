import { Component } from '@angular/core';
import { SimulacionComponent } from '../simulacion.component';
import { FiltrosBusquedaSimulacionComponent } from '../filtros-busqueda-simulacion/filtros-busqueda-simulacion.component';
import { MatTableModule } from '@angular/material/table';
import { SimulacionEntity } from '../simulacion.entity';

@Component({
  selector: 'ibpm-listado-simulacion',
  imports: [MatTableModule, FiltrosBusquedaSimulacionComponent],
  templateUrl: './listado-simulacion.component.html',
  styleUrl: './listado-simulacion.component.scss',
})
/**
 * Listado de simulacion con navegación a la edición y utilidades de presentación.
 */
export class ListadoSimulacionComponent {
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

  constructor(public parent: SimulacionComponent) {}

  /**
   * Navega a la pantalla de edición de la tarea seleccionada.
   */
  public goToEditarSimulacion(simulacion: SimulacionEntity) {
    this.parent.router.navigate([
      `/main-page/simulacion/editarSimulacion/${simulacion.nombre}`,
    ]);
  }

   /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getSimulacionName(simulacionName: any) {
    const simulacion = this.parent.simulacion.find((c) => c.nombre === simulacionName);
    return simulacion ? simulacion.nombre : '';
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
      this.parent.buscarSimulacion(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarSimulacion(); // ajusta si tu método se llama diferente
    }
  }

  seleccionarTodos = false;

seleccionarTodosRegistros(): void {
  this.parent.simulacion.forEach((item: any) => {
    item.seleccionado = this.seleccionarTodos;
  });
}
}

