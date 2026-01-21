import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CompaniasComponent } from '../companias.component';

@Component({
  selector: 'app-listado-companias',
  imports: [MatTableModule],
  templateUrl: './listado-companias.component.html',
  styleUrl: './listado-companias.component.scss',
})
/**
 * Tabla de compañías con paginación y navegación a edición.
 */
export class ListadoCompaniasComponent {
  public currentPage: number = 1;
  public numberOfPages: number = 1;
  public displayedColumns: string[] = [
    'Nombre',
    'Sigla',
    'NIT',
    'Representante',
    'Contacto',
    'Correo electrónico',
    'Teléfono',
  ];

  constructor(public parent: CompaniasComponent) {}

  /**
   * Navega a la pantalla de edición de la compañía.
   */
  goToEditarCompania(name?: string): void {
    this.parent.router.navigate([
      `/main-page/administrarCompanias/editarCompania/${name}`,
    ]);
  }
}
