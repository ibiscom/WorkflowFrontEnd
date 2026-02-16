import { Component } from '@angular/core';
import { DependenciaComponent } from '../dependencia.component';
import { MatTableModule } from '@angular/material/table';
import { DependenciaEntity } from '../dependencia.entity';
import { FiltrosBusquedaDependenciaComponent } from '../filtros-busqueda-dependencias/filtros-busqueda-dependencia.component';

@Component({
  selector: 'ibpm-listado-dependencia',
  imports: [MatTableModule, FiltrosBusquedaDependenciaComponent],
  templateUrl: './listado-dependencia.component.html',
  styleUrl: './listado-dependencia.component.scss',
})
/**
 * Listado de dependencias con navegación a la edición y utilidades de presentación.
 */
export class ListadoDependenciaComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Descripción'
    
  ];

  constructor(public parent: DependenciaComponent) {}

  /**
   * Navega a la pantalla de edición de grupo  la dependencia seleccionada.
   */
  public goToEditarDependencia(dependencia: DependenciaEntity) {
    this.parent.router.navigate([
      `/main-page/Dependencia/editarDependencia/${dependencia.nombre}`,
    ]);
  }


  /**
   REVISAR!!!!
  
  // 🔹 Ir a página anterior
  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.parent.searchDependencias(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.searchWorkflows(); // ajusta si tu método se llama diferente
    }
  }
    */
}
