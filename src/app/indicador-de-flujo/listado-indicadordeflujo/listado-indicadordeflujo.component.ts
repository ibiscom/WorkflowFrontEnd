import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IndicadorDeFlujoComponent } from '../indicadordeflujo.component';
import { FiltrosBusquedaIndicadorDeFlujoComponent } from '../filtros-busqueda-indicadordeflujo/filtros-busqueda-indicadordeflujo.component';
import { MatTableModule } from '@angular/material/table';
import { IndicadorDeFlujoEntity } from '../indicadordeflujo.entity';

@Component({
  selector: 'ibpm-listado-indicadordeflujo',
  imports: [MatTableModule, FiltrosBusquedaIndicadorDeFlujoComponent],
  templateUrl: './listado-indicadordeflujo.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './listado-indicadordeflujo.component.scss',
})
/**
 * Listado de indicadordeflujo con navegación a la edición y utilidades de presentación.
 */
export class ListadoIndicadorDeFlujoComponent {
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

  constructor(public parent: IndicadorDeFlujoComponent) {}

  /**
   * Navega a la pantalla de edición de la tarea seleccionada.
   */
  public goToEditarIndicadorDeFlujo(indicadordeflujo: IndicadorDeFlujoEntity) {
    this.parent.router.navigate([
      `/main-page/indicadordeflujo/editarIndicadorDeFlujo/${indicadordeflujo.nombre}`,
    ]);
  }

  /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getIndicadorDeFlujoName(indicadordeflujoName: any) {
    const indicadordeflujo = this.parent.indicadordeflujo.find(
      (c) => c.nombre === indicadordeflujoName,
    );
    return indicadordeflujo ? indicadordeflujo.nombre : '';
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
      this.parent.buscarIndicadorDeFlujo(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarIndicadorDeFlujo(); // ajusta si tu método se llama diferente
    }
  }

  seleccionarTodos = false;

  seleccionarTodosRegistros(): void {
    this.parent.indicadordeflujo.forEach((item: any) => {
      item.seleccionado = this.seleccionarTodos;
    });
  }
}
