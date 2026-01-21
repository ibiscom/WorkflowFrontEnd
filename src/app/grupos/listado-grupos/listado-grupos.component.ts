import { Component } from '@angular/core';
import { GruposComponent } from '../grupos.component';
import { GroupEntity } from '../../entities/groups/group.entity';
import { FiltrosBusquedaGruposComponent } from '../filtros-busqueda-grupos/filtros-busqueda-grupos.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'fs-listado-grupos',
  imports: [MatTableModule, FiltrosBusquedaGruposComponent],
  templateUrl: './listado-grupos.component.html',
  styleUrl: './listado-grupos.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoGruposComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Descripción',
    'Supervisor',
    'Compania',
  ];

  constructor(public parent: GruposComponent) {}

  /**
   * Navega a la pantalla de edición del grupo seleccionado.
   */
  public goToEditarGrupo(group: GroupEntity) {
    this.parent.router.navigate([
      `/main-page/administrarGrupos/editarGrupo/${group.name}`,
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
      this.parent.searchGroups(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.searchGroups(); // ajusta si tu método se llama diferente
    }
  }
}
