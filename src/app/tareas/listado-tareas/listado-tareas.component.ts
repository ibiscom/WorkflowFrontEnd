import { Component } from '@angular/core';
import { TareasComponent } from '../tareas.component';
import { FiltrosBusquedaTareasComponent } from '../filtros-busqueda-tareas/filtros-busqueda-tareas.component';
import { MatTableModule } from '@angular/material/table';
import { TareasEntity } from '../tareas.entity';

@Component({
  selector: 'ibpm-listado-tareas',
  imports: [MatTableModule, FiltrosBusquedaTareasComponent],
  templateUrl: './listado-tareas.component.html',
  styleUrl: './listado-tareas.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoTareasComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Descripción',
    'Supervisor',
    'Compania',
  ];

  constructor(public parent: TareasComponent) {}

  /**
   * Navega a la pantalla de edición del grupo seleccionado.
   */
  public goToEditarTareas(tareas: TareasEntity) {
    this.parent.router.navigate([
      `/main-page/Tareas/editarTarea/${tareas.name}`,
    ]);
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

