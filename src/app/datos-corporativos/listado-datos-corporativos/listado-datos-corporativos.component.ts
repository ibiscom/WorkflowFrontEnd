import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DatosCorporativosComponent } from '../datos-corporativos.component';

@Component({
  selector: 'fs-listado-datos-corporativos',
  imports: [MatTableModule],
  templateUrl: './listado-datos-corporativos.component.html',
  styleUrl: './listado-datos-corporativos.component.scss',
})
/**
 * Tabla de datos corporativos con paginación y navegación a edición.
 */
export class ListadoDatosCorporativosComponent {
  
  public parent = inject(DatosCorporativosComponent);

  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Identificador',
    'Usuario',
    'Fecha cambio',
  ];

  /**
   * Navega a la pantalla de edición de datos corporativos.
   */
  public goToEditarDatosCorporativos(identifier?: string): void {
    this.parent.router.navigate([
      `/main-page/datosCorporativos/datosGenerales/${identifier}`,
    ]);
  }

  /**
   * Retrocede una página.
   */
  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /**
   * Avanza una página.
   */
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
    }
  }
}
