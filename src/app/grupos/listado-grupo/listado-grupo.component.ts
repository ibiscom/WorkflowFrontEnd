import { Component } from '@angular/core';
import { GrupoComponent } from '../grupo.component';
import { FiltrosBusquedaGrupoComponent } from '../filtros-busqueda-grupo/filtros-busqueda-grupo.component';
import { MatTableModule } from '@angular/material/table';
import { GrupoEntity } from '../grupo.entity';

@Component({
  selector: 'ibpm-listado-grupo',
  imports: [MatTableModule, FiltrosBusquedaGrupoComponent],
  templateUrl: './listado-grupo.component.html',
  styleUrl: './listado-grupo.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoGrupoComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Tipo',
    'Descripción',
    'Cadena de representación',
  ];

  constructor(public parent: GrupoComponent) {}

  /**
   * Navega a la pantalla de edición de la grupo seleccionado.
   */
  public goToEditarGrupo(grupo: GrupoEntity) {
    this.parent.mensaje = '';
    this.parent.router.navigate([
      `/main-page/grupos/editarGrupo/${grupo.nombre}`,
    ]);
  }

  /**
   * Obtiene el nombre legible de la grupo a partir del identificador.
   */
  public getGrupoName(grupoName: any) {
    const grupo = this.parent.grupos.find((c) => c.nombre === grupoName);
    return grupo ? grupo.nombre : '';
  }

  /**
 * REVISAR!!!
 
  // 🔹 Ir a página anterior
  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.parent.buscarGrupo(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarGrupo(); // ajusta si tu método se llama diferente
    }
  }
    */
}

