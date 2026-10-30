import { Component } from '@angular/core';
import { ConsultarPorObjetoComponent } from '../consultarporobjeto.component';
import { FiltrosBusquedaConsultarPorObjetoComponent } from '../filtros-busqueda-consultarporobjeto/filtros-busqueda-consultarporobjeto.component';
import { MatTableModule } from '@angular/material/table';
import { ConsultarPorObjetoEntity } from '../consultarporobjeto.entity';

@Component({
  selector: 'ibpm-listado-consultarporobjeto',
  imports: [MatTableModule, FiltrosBusquedaConsultarPorObjetoComponent],
  templateUrl: './listado-consultarporobjeto.component.html',
  styleUrl: './listado-consultarporobjeto.component.scss',
})
/**
 * Listado de consultarporobjeto con navegación a la edición y utilidades de presentación.
 */
export class ListadoConsultarPorObjetoComponent {
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

  constructor(public parent: ConsultarPorObjetoComponent) {}

  /**
   * Navega a la pantalla de edición de la tarea seleccionada.
   */
  public goToEditarConsultarPorObjeto(consultarporobjeto: ConsultarPorObjetoEntity) {
    this.parent.router.navigate([
      `/main-page/consultarporobjeto/editarConsultarPorObjeto/${consultarporobjeto.nombre}`,
    ]);
  }

   /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getConsultarPorObjetoName(consultarporobjetoName: any) {
    const consultarporobjeto = this.parent.consultarporobjeto.find((c) => c.nombre === consultarporobjetoName);
    return consultarporobjeto ? consultarporobjeto.nombre : '';
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
      this.parent.buscarConsultarPorObjeto(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarConsultarPorObjeto(); // ajusta si tu método se llama diferente
    }
  }

  seleccionarTodos = false;

seleccionarTodosRegistros(): void {
  this.parent.consultarporobjeto.forEach((item: any) => {
    item.seleccionado = this.seleccionarTodos;
  });
}
}

