import { Component } from '@angular/core';
import { TareasComponent } from '../tareas.component';
import { FiltrosBusquedaTareasComponent } from '../filtros-busqueda-tareas/filtros-busqueda-tareas.component';
import { MatTableModule } from '@angular/material/table';
import { TareaEntity } from '../tarea.entity';

@Component({
  selector: 'ibpm-listado-tareas',
  imports: [MatTableModule, FiltrosBusquedaTareasComponent],
  templateUrl: './listado-tareas.component.html',
  styleUrl: './listado-tareas.component.scss',
})
/**
 * Listado de tareas con navegación a la edición y utilidades de presentación.
 */
export class ListadoTareasComponent {
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

  constructor(public parent: TareasComponent) {}

  /**
   * Navega a la pantalla de edición de la tarea seleccionada.
   */
  public goToEditarTareas(tareas: TareaEntity) {
    this.parent.router.navigate([
      `/main-page/tareas/editarTarea/${tareas.nombre}`,
    ]);
  }

   /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getTareasName(tareasName: any) {
    const tareas = this.parent.tareas.find((c) => c.nombre === tareasName);
    return tareas ? tareas.nombre : '';
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
      this.parent.searchTareas(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.searchTareas(); // ajusta si tu método se llama diferente
    }
  }
}

