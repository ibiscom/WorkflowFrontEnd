import { Component } from '@angular/core';
import { ListarTareaComponent } from '../listar-tareas.component';
import { FiltrosBusquedaListarTareaComponent } from '../filtros-busqueda-listar-tareas/filtros-busqueda-listar-tareas.component';
import { MatTableModule } from '@angular/material/table';
import { ListarTareasEntity } from '../listar-tareas.entity';

@Component({
  standalone: true,
  selector: 'ibpm-listado-listar-tarea',
  imports: [MatTableModule, FiltrosBusquedaListarTareaComponent],
  templateUrl: './listado-listar-tareas.component.html',
  styleUrl: './listado-listar-tareas.component.scss',
})
/**
 * Listado de listartareas con navegación a la edición y utilidades de presentación.
 */
export class ListadoListarTareaComponent {

  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Nombre Largo',
    'Fecha creación',
    'Descripción',
    'Estado',
  ];

  constructor(public parent: ListarTareaComponent) {}

  /**
   * Navega a la pantalla de edición del listartarea seleccionado.
   */
  public goToEditarListarTarea(listartarea: ListarTareasEntity) {
    this.parent.router.navigate([
      `/main-page/listartarea/editarListarTarea/${listartarea.nombre}`,
    ]);
  }

  /**
   * Obtiene el nombre legible del listartarea a partir del identificador.
   */
  public getListarTareaName(listartareaName: any) {
    const listartarea = this.parent.listartareas.find((c) => c.nombre === listartareaName);
    return listartarea ? listartarea.nombreLargo : '';
  }

  // 🔹 Ir a página anterior
  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.parent.buscarListarTareas(this.currentPage); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarListarTareas(this.currentPage); // ajusta si tu método se llama diferente
    }
  }

  public abrirVentana(tarea: ListarTareasEntity) {
    this.parent.router.navigate([`/main-page/listarTareas/mostrarHerramienta/${tarea.idInstanciaWorkflow}/${tarea.numero}`]);
  }
}
