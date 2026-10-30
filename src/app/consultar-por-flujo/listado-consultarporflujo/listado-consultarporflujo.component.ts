import { Component } from '@angular/core';
import { ConsultarPorFlujoComponent } from '../consultarporflujo.component';
import { FiltrosBusquedaConsultarPorFlujoComponent } from '../filtros-busqueda-consultarporflujo/filtros-busqueda-consultarporflujo.component';
import { MatTableModule } from '@angular/material/table';
import { ConsultarPorFlujoEntity } from '../consultarporflujo.entity';

@Component({
  selector: 'ibpm-listado-consultarporflujo',
  imports: [MatTableModule, FiltrosBusquedaConsultarPorFlujoComponent],
  templateUrl: './listado-consultarporflujo.component.html',
  styleUrl: './listado-consultarporflujo.component.scss',
})
/**
 * Listado de consultarporflujo con navegación a la edición y utilidades de presentación.
 */
export class ListadoConsultarPorFlujoComponent {
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

  constructor(public parent: ConsultarPorFlujoComponent) {}

  /**
   * Navega a la pantalla de edición de la tarea seleccionada.
   */
  public goToEditarConsultarPorFlujo(consultarporflujo: ConsultarPorFlujoEntity) {
    this.parent.router.navigate([
      `/main-page/consultarporflujo/editarConsultarPorFlujo/${consultarporflujo.nombre}`,
    ]);
  }

   /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getConsultarPorFlujoName(consultarporflujoName: any) {
    const consultarporflujo = this.parent.consultarporflujo.find((c) => c.nombre === consultarporflujoName);
    return consultarporflujo ? consultarporflujo.nombre : '';
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
      this.parent.buscarConsultarPorFlujo(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarConsultarPorFlujo(); // ajusta si tu método se llama diferente
    }
  }

  seleccionarTodos = false;

seleccionarTodosRegistros(): void {
  this.parent.consultarporflujo.forEach((item: any) => {
    item.seleccionado = this.seleccionarTodos;
  });
}
}

