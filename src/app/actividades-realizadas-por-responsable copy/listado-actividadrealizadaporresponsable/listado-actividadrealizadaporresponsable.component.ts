import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActividadRealizadaPorResponsableComponent } from '../actividadrealizadaporresponsable.component';
import { FiltrosBusquedaActividadRealizadaPorResponsableComponent } from '../filtros-busqueda-actividadrealizadaporresponsable/filtros-busqueda-actividadrealizadaporresponsable.component';
import { MatTableModule } from '@angular/material/table';
import { ActividadRealizadaPorResponsableEntity } from '../actividadrealizadaporresponsable.entity';

@Component({
  selector: 'ibpm-listado-actividadrealizadaporresponsable',
  imports: [
    MatTableModule,
    FiltrosBusquedaActividadRealizadaPorResponsableComponent,
  ],
  templateUrl: './listado-actividadrealizadaporresponsable.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './listado-actividadrealizadaporresponsable.component.scss',
})
/**
 * Listado de actividadrealizadaporresponsable con navegación a la edición y utilidades de presentación.
 */
export class ListadoActividadRealizadaPorResponsableComponent {
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
  responsableSeleccionado: any;
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

  constructor(public parent: ActividadRealizadaPorResponsableComponent) {}

  /**
   * Navega a la pantalla de edición de la tarea seleccionada.
   */
  public goToEditarActividadRealizadaPorResponsable(
    actividadrealizadaporresponsable: ActividadRealizadaPorResponsableEntity,
  ) {
    this.parent.router.navigate([
      `/main-page/actividadrealizadaporresponsable/editarActividadRealizadaPorResponsable/${actividadrealizadaporresponsable.nombre}`,
    ]);
  }

  /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getActividadRealizadaPorResponsableName(
    actividadrealizadaporresponsableName: any,
  ) {
    const actividadrealizadaporresponsable =
      this.parent.actividadrealizadaporresponsable.find(
        (c: { nombre: any }) =>
          c.nombre === actividadrealizadaporresponsableName,
      );
    return actividadrealizadaporresponsable
      ? actividadrealizadaporresponsable.nombre
      : '';
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
      this.parent.buscarActividadRealizadaPorResponsable(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarActividadRealizadaPorResponsable(); // ajusta si tu método se llama diferente
    }
  }

  seleccionarTodos = false;

  seleccionarTodosRegistros(): void {
    this.parent.actividadrealizadaporresponsable.forEach((item: any) => {
      item.seleccionado = this.seleccionarTodos;
    });
  }
}
