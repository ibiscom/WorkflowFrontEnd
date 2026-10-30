import { Component } from '@angular/core';
import { ConsultarPorResponsableComponent } from '../consultarporresponsable.component';
import { FiltrosBusquedaConsultarPorResponsableComponent } from '../filtros-busqueda-consultarporresponsable/filtros-busqueda-consultarporresponsable.component';
import { MatTableModule } from '@angular/material/table';
import { ConsultarPorResponsableEntity } from '../consultarporresponsable.entity';

@Component({
  selector: 'ibpm-listado-consultarporresponsable',
  imports: [MatTableModule, FiltrosBusquedaConsultarPorResponsableComponent],
  templateUrl: './listado-consultarporresponsable.component.html',
  styleUrl: './listado-consultarporresponsable.component.scss',
})
/**
 * Listado de consultarporresponsable con navegación a la edición y utilidades de presentación.
 */
export class ListadoConsultarPorResponsableComponent {
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

  constructor(public parent: ConsultarPorResponsableComponent) {}

  /**
   * Navega a la pantalla de edición de la tarea seleccionada.
   */
  public goToEditarConsultarPorResponsable(consultarporresponsable: ConsultarPorResponsableEntity) {
    this.parent.router.navigate([
      `/main-page/consultarporresponsable/editarConsultarPorResponsable/${consultarporresponsable.nombre}`,
    ]);
  }

   /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getConsultarPorResponsableName(consultarporresponsableName: any) {
    const consultarporresponsable = this.parent.consultarporresponsable.find((c) => c.nombre === consultarporresponsableName);
    return consultarporresponsable ? consultarporresponsable.nombre : '';
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
      this.parent.buscarConsultarPorResponsable(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarConsultarPorResponsable(); // ajusta si tu método se llama diferente
    }
  }

  seleccionarTodos = false;

seleccionarTodosRegistros(): void {
  this.parent.consultarporresponsable.forEach((item: any) => {
    item.seleccionado = this.seleccionarTodos;
  });
}
}

