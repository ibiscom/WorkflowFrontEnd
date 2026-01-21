import { Component } from '@angular/core';
import { RolesComponent } from '../roles.component';
import { FiltrosBusquedaRolesComponent } from '../filtros-busqueda-roles/filtros-busqueda-roles.component';
import { MatTableModule } from '@angular/material/table';
import { RolesEntity } from '../roles.entity';

@Component({
  selector: 'ibpm-listado-roles',
  imports: [MatTableModule, FiltrosBusquedaRolesComponent],
  templateUrl: './listado-roles.component.html',
  styleUrl: './listado-roles.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoRolesComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Descripción',
    'Supervisor',
    'Compania',
  ];

  constructor(public parent: RolesComponent) {}

  /**
   * Navega a la pantalla de edición del grupo seleccionado.
   */
  public goToEditarRoles(roles: RolesEntity) {
    this.parent.router.navigate([
      `/main-page/administrarRoles/editarRoles/${roles.nombre}`,
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
      this.parent.searchRoles(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.searchRoles(); // ajusta si tu método se llama diferente
    }
  }
}
