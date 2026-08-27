import { Component } from '@angular/core';
import { ConsultarRolResponsableComponent } from '../consultarrolresponsable.component';
import { FiltrosBusquedaConsultarRolResponsableComponent } from '../filtros-busqueda-consultarrolresponsable/filtros-busqueda-consultarrolresponsable.component';
import { MatTableModule } from '@angular/material/table';
import { ConsultarRolResponsableEntity } from '../consultarrolresponsable.entity';

@Component({
  selector: 'ibpm-listado-consultarrolresponsable',
  imports: [MatTableModule, FiltrosBusquedaConsultarRolResponsableComponent],
  templateUrl: './listado-consultarrolresponsable.component.html',
  styleUrl: './listado-consultarrolresponsable.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoConsultarRolResponsableComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'userName',
    'Nombre',
    'Apellido',
    'Es Responsable',
  ];

  constructor(public parent: ConsultarRolResponsableComponent) {}

  /**
   * Navega a la pantalla de edición del grupo seleccionado.
   */
  public goToEditarResponsable(responsable: ConsultarRolResponsableEntity) {
    this.parent.router.navigate([
      `/main-page/consultarRolResponsable/editarConsultarRolResponsable/${responsable.nombre}`,
    ]);
  }
}
