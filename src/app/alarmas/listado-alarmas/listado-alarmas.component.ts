import { Component } from '@angular/core';
import { AlarmaComponent } from '../alarmas.component';
import { CrearAlarmaComponent } from '../crear-alarma/crear-alarma.component';
import { MatTableModule } from '@angular/material/table';
import { AlarmaEntity } from '../alarma.entity';
import { AtributoAlarmaEntity } from '../alarmas.entity';

@Component({
  selector: 'ibpm-listado-alarma',
  imports: [MatTableModule, CrearAlarmaComponent],
  templateUrl: './listado-atributos-alarma.component.html',
  styleUrl: './listado-atributos-alarma.component.scss',
})
/**
 * Listado de atributos de objetos workflow con navegación a la edición y utilidades de presentación.
 */
export class ListadoAtributosAlarmasComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'IdentificadorNegocio',
    'labelId',
    'Descripcion',
  ];

  constructor(public parent: AlarmaComponent) {
  }

  /**
   * Navega a la pantalla de edición del atributo de objeto workflow seleccionado.
   */
  public goToEditarAtributoAlarma(atributo: AtributoAlarmaEntity) {
    this.parent.router.navigate([
      `/main-page/objetosWorkflow/editarAtributoObjetoWorkflow/${atributo.nombre}`,
    ]);
  }

   // 🔹 Ir a página anterior
  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.parent.buscarObjetoWorkflow(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarObjetoWorkflow(); // ajusta si tu método se llama diferente
    }
  }
}

