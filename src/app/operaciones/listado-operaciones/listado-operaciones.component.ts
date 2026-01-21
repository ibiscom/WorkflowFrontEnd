import { Component } from '@angular/core';
import { OperacionesComponent } from '../operaciones.component';
import { NuevaOperacionComponent } from "../nueva-operacion/nueva-operacion.component";


@Component({
  selector: 'fs-listado-operaciones',
  templateUrl: './listado-operaciones.component.html',
  styleUrl: './listado-operaciones.component.scss',
  imports: [NuevaOperacionComponent],
})
export class ListadoOperacionesComponent {
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  // listado real
  public operations: any[] = [];

  constructor(public parent: OperacionesComponent) {
    // las operaciones vienen del padre
    this.operations = this.parent.operations || [];
  }

  /** Paginación */
  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  public nextPage() {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
    }
  }
}
