import { Component } from '@angular/core';
import { ResponsableComponent } from '../responsable.component';
import { FiltrosBusquedaResponsableComponent } from '../filtros-busqueda-responsable/filtros-busqueda-responsable.component';
import { MatTableModule } from '@angular/material/table';
import { ResponsableEntity } from '../responsable.entity';

@Component({
  selector: 'ibpm-listado-responsable',
  imports: [MatTableModule, FiltrosBusquedaResponsableComponent],
  templateUrl: './listado-responsable.component.html',
  styleUrl: './listado-responsable.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoResponsableComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'userName',
    'Nombre',
    'Apellido',
    'Es Responsable',
  ];

  constructor(public parent: ResponsableComponent) {}

  /**
   * Navega a la pantalla de edición del grupo seleccionado.
   */
  public goToEditarResponsable(responsable: ResponsableEntity) {
    this.parent.router.navigate([
      `/main-page/administrarResponsable/editarResponsable/${responsable.nombre}`,
    ]);
  }
}
