import { Component } from '@angular/core';
import { MigworkflowComponent } from '../migworkflow.component';
import { FiltrosBusquedaMigworkflowComponent } from '../filtros-busqueda-migworkflow/filtros-busqueda-migworkflow.component';
import { MatTableModule } from '@angular/material/table';
import { MigworkflowEntity } from '../migworkflow.entity';

@Component({
  selector: 'ibpm-listado-migworkflow',
  imports: [MatTableModule, FiltrosBusquedaMigworkflowComponent],
  templateUrl: './listado-migworkflow.component.html',
  styleUrl: './listado-migworkflow.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoMigworkflowComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'userName',
    'Nombre',
    'Apellido',
    'Es Migworkflow',
  ];

  constructor(public parent: MigworkflowComponent) {}

  /**
   * Navega a la pantalla de edición del grupo seleccionado.
   */
  public goToEditarMigworkflow(migworkflow: MigworkflowEntity) {
    this.parent.router.navigate([
      `/main-page/administrarMigworkflow/editarMigworkflow/${migworkflow.nombre}`,
    ]);
  }
}
