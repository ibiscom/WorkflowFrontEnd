import { Component } from '@angular/core';
import { ActividadPendientePorResponsableComponent } from '../actividadpendienteporresponsable.component';
import { FiltrosBusquedaActividadPendientePorResponsableComponent } from '../filtros-busqueda-actividadpendienteporresponsable/filtros-busqueda-actividadpendienteporresponsable.component';
import { MatTableModule } from '@angular/material/table';
import { ActividadPendientePorResponsableEntity } from '../actividadpendienteporresponsable.entity';

@Component({
  selector: 'ibpm-listado-actividadpendienteporresponsable',
  imports: [MatTableModule, FiltrosBusquedaActividadPendientePorResponsableComponent],
  templateUrl: './listado-actividadpendienteporresponsable.component.html',
  styleUrl: './listado-actividadpendienteporresponsable.component.scss',
})
/**
 * Listado de actividadpendienteporresponsable con navegación a la edición y utilidades de presentación.
 */
export class ListadoActividadPendientePorResponsableComponent {
tareas: any;
mostrarResultados: any;
fechaReporte: any;
fechaGeneracion: any;
nombreProcesoReporte: any;
columnasReporte: any;
datosReporte: any;
nombreTareaReporte: any;
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

  constructor(public parent: ActividadPendientePorResponsableComponent) {}

  /**
   * Navega a la pantalla de edición de la tarea seleccionada.
   */
  public goToEditarActividadPendientePorResponsable(actividadpendienteporresponsable: ActividadPendientePorResponsableEntity) {
    this.parent.router.navigate([
      `/main-page/actividadpendienteporresponsable/editarActividadPendientePorResponsable/${actividadpendienteporresponsable.nombre}`,
    ]);
  }

   /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getActividadPendientePorResponsableName(actividadpendienteporresponsableName: any) {
    const actividadpendienteporresponsable = this.parent.actividadpendienteporresponsable.find((c: { nombre: any; }) => c.nombre === actividadpendienteporresponsableName);
    return actividadpendienteporresponsable ? actividadpendienteporresponsable.nombre : '';
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
      this.parent.buscarActividadPendientePorResponsable(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarActividadPendientePorResponsable(); // ajusta si tu método se llama diferente
    }
  }

  seleccionarTodos = false;

seleccionarTodosRegistros(): void {
  this.parent.actividadpendienteporresponsable.forEach((item: any) => {
    item.seleccionado = this.seleccionarTodos;
  });
}
}

