import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActividadRealizadaPorTareaComponent } from '../actividadrealizadaportarea.component';
import { FiltrosBusquedaActividadRealizadaPorTareaComponent } from '../filtros-busqueda-actividadrealizadaportarea/filtros-busqueda-actividadrealizadaportarea.component';
import { MatTableModule } from '@angular/material/table';
import { ActividadRealizadaPorTareaEntity } from '../actividadrealizadaportarea.entity';

@Component({
  selector: 'ibpm-listado-actividadrealizadaportarea',
  imports: [MatTableModule, FiltrosBusquedaActividadRealizadaPorTareaComponent],
  templateUrl: './listado-actividadrealizadaportarea.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './listado-actividadrealizadaportarea.component.scss',
})
/**
 * Listado de actividadrealizadaportarea con navegación a la edición y utilidades de presentación.
 */
export class ListadoActividadRealizadaPorTareaComponent {
  tareas: any;
  mostrarResultados: any;
  fechaReporte: any;
  fechaGeneracion: any;
  nombreProcesoReporte: any;
  columnasReporte: any;
  datosReporte: any;
  nombreTareaReporte: any;
  fechaInicial: any;
  fechaFinal: any;
  tareaSeleccionado: any;
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

  constructor(public parent: ActividadRealizadaPorTareaComponent) {}

  /**
   * Navega a la pantalla de edición de la tarea seleccionada.
   */
  public goToEditarActividadRealizadaPorTarea(
    actividadrealizadaportarea: ActividadRealizadaPorTareaEntity,
  ) {
    this.parent.router.navigate([
      `/main-page/actividadrealizadaportarea/editarActividadRealizadaPorTarea/${actividadrealizadaportarea.nombre}`,
    ]);
  }

  /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getActividadRealizadaPorTareaName(
    actividadrealizadaportareaName: any,
  ) {
    const actividadrealizadaportarea =
      this.parent.actividadrealizadaportarea.find(
        (c: { nombre: any }) => c.nombre === actividadrealizadaportareaName,
      );
    return actividadrealizadaportarea ? actividadrealizadaportarea.nombre : '';
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
      this.parent.buscarActividadRealizadaPorTarea(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarActividadRealizadaPorTarea(); // ajusta si tu método se llama diferente
    }
  }

  seleccionarTodos = false;

  seleccionarTodosRegistros(): void {
    this.parent.actividadrealizadaportarea.forEach((item: any) => {
      item.seleccionado = this.seleccionarTodos;
    });
  }
}
