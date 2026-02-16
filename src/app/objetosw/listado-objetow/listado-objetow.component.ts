import { Component } from '@angular/core';
import { ObjetowComponent } from '../objetow.component';
import { FiltrosBusquedaObjetowComponent } from '../filtros-busqueda-objetow/filtros-busqueda-objetow.component';
import { MatTableModule } from '@angular/material/table';
import { ObjetowEntity } from '../objetow.entity';

@Component({
  selector: 'ibpm-listado-objetow',
  imports: [MatTableModule, FiltrosBusquedaObjetowComponent],
  templateUrl: './listado-objetow.component.html',
  styleUrl: './listado-objetow.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoObjetowComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'IdentificadorNegocio',
    'labelId',
    'Descripcion',
  ];

  constructor(public parent: ObjetowComponent) {}

  /**
   * Navega a la pantalla de edición del grupo seleccionado.
   */
  public goToEditarObjetow(objetow: ObjetowEntity) {
    this.parent.router.navigate([
      `/main-page/Objetow/editarObjetow/${objetow.name}`,
    ]);
  }
}

