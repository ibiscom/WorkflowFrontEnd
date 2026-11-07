import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IndicadorDeTareaComponent } from '../indicadordetarea.component';
import { FiltrosBusquedaIndicadorDeTareaComponent } from '../filtros-busqueda-indicadordetarea/filtros-busqueda-indicadordetarea.component';
import { MatTableModule } from '@angular/material/table';
import { IndicadorDeTareaEntity } from '../indicadordetarea.entity';

@Component({
  selector: 'ibpm-listado-indicadordetarea',
  imports: [MatTableModule, FiltrosBusquedaIndicadorDeTareaComponent],
  templateUrl: './listado-indicadordetarea.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './listado-indicadordetarea.component.scss',
})
/**
 * Listado de indicadordetarea con navegación a la edición y utilidades de presentación.
 */
export class ListadoIndicadorDeTareaComponent {
  tareas: any;
  mostrarResultados: any;
  ejecutarTarea(_t14: any) {
    throw new Error('Method not implemented.');
  }
  verExpedienteTarea(_t14: any) {
    throw new Error('Method not implemented.');
  }
  verDetalle(_t14: any) {
    throw new Error('Method not implemented.');
  }
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

  constructor(public parent: IndicadorDeTareaComponent) {}

  /**
   * Navega a la pantalla de edición de la tarea seleccionada.
   */
  public goToEditarIndicadorDeTarea(indicadordetarea: IndicadorDeTareaEntity) {
    this.parent.router.navigate([
      `/main-page/indicadordetarea/editarIndicadorDeTarea/${indicadordetarea.nombre}`,
    ]);
  }

  /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getIndicadorDeTareaName(indicadordetareaName: any) {
    const indicadordetarea = this.parent.indicadordetarea.find(
      (c) => c.nombre === indicadordetareaName,
    );
    return indicadordetarea ? indicadordetarea.nombre : '';
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
      this.parent.buscarIndicadorDeTarea(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarIndicadorDeTarea(); // ajusta si tu método se llama diferente
    }
  }

  seleccionarTodos = false;

  seleccionarTodosRegistros(): void {
    this.parent.indicadordetarea.forEach((item: any) => {
      item.seleccionado = this.seleccionarTodos;
    });
  }
}
