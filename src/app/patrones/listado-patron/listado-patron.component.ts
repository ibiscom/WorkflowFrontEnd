import { Component } from '@angular/core';
import { PatronComponent } from '../patron.component';
import { FiltrosBusquedaPatronComponent } from '../filtros-busqueda-patron/filtros-busqueda-patron.component';
import { MatTableModule } from '@angular/material/table';
import { PatronEntity } from '../patron.entity';

@Component({
  selector: 'ibpm-listado-patron',
  imports: [MatTableModule, FiltrosBusquedaPatronComponent],
  templateUrl: './listado-patron.component.html',
  styleUrl: './listado-patron.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoPatronComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Tipo',
    'Descripción',
    'Cadena de representación',
  ];

  constructor(public parent: PatronComponent) {}

  /**
   * Navega a la pantalla de edición de la patron seleccionado.
   */
  public goToEditarPatron(patron: PatronEntity) {
    this.parent.mensaje = '';
    this.parent.router.navigate([
      `/main-page/patrons/editarPatron/${patron.nombre}`,
    ]);
  }

  /**
   * Obtiene el nombre legible de la patron a partir del identificador.
   */
  public getPatronName(patronName: any) {
    const patron = this.parent.patrones.find((c) => c.nombre === patronName);
    return patron ? patron.nombre : '';
  }

  /**
 * REVISAR!!!
 
  // 🔹 Ir a página anterior
  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.parent.buscarPatron(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarPatron(); // ajusta si tu método se llama diferente
    }
  }
    */
}

