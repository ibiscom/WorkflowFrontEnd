import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConsultarTrazabilidadComponent } from '../consultartrazabilidad.component';
import { FiltrosBusquedaConsultarTrazabilidadComponent } from '../filtros-busqueda-consultartrazabilidad/filtros-busqueda-consultartrazabilidad.component';
import { MatTableModule } from '@angular/material/table';
import { ConsultarTrazabilidadEntity } from '../consultartrazabilidad.entity';

@Component({
  selector: 'ibpm-listado-consultartrazabilidad',
  imports: [MatTableModule, FiltrosBusquedaConsultarTrazabilidadComponent],
  templateUrl: './listado-consultartrazabilidad.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './listado-consultartrazabilidad.component.scss',
})
/**
 * Listado de consultartrazabilidad con navegación a la edición y utilidades de presentación.
 */
export class ListadoConsultarTrazabilidadComponent {
  tareas: any;
  mostrarResultados: any;
  mostrarInformacionProceso: any;
  informacionProceso: any;
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

  constructor(public parent: ConsultarTrazabilidadComponent) {}

  /**
   * Navega a la pantalla de edición de la tarea seleccionada.
   */
  public goToEditarConsultarTrazabilidad(
    consultartrazabilidad: ConsultarTrazabilidadEntity,
  ) {
    this.parent.router.navigate([
      `/main-page/consultartrazabilidad/editarConsultarTrazabilidad/${consultartrazabilidad.nombre}`,
    ]);
  }

  /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getConsultarTrazabilidadName(consultartrazabilidadName: any) {
    const consultartrazabilidad = this.parent.consultartrazabilidad.find(
      (c) => c.nombre === consultartrazabilidadName,
    );
    return consultartrazabilidad ? consultartrazabilidad.nombre : '';
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
      this.parent.buscarConsultarTrazabilidad(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarConsultarTrazabilidad(); // ajusta si tu método se llama diferente
    }
  }

  seleccionarTodos = false;

  seleccionarTodosRegistros(): void {
    this.parent.consultartrazabilidad.forEach((item: any) => {
      item.seleccionado = this.seleccionarTodos;
    });
  }
}
