import { Component } from '@angular/core';
import { ObjetowComponent } from '../objetow.component';
import { CrearObjetowComponent } from '../crear-objetow/crear-objetow.component';
import { MatTableModule } from '@angular/material/table';
import { ObjetowEntity } from '../objetow.entity';
import { AtributoObjetowEntity } from '../atributo-objetow.entity';

@Component({
  selector: 'ibpm-listado-objetow',
  imports: [MatTableModule, CrearObjetowComponent],
  templateUrl: './listado-atributos-objetow.component.html',
  styleUrl: './listado-atributos-objetow.component.scss',
})
/**
 * Listado de atributos de objetos workflow con navegación a la edición y utilidades de presentación.
 */
export class ListadoAtributosObjetowComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'IdentificadorNegocio',
    'labelId',
    'Descripcion',
  ];

  constructor(public parent: ObjetowComponent) {
  }

  /**
   * Navega a la pantalla de edición del atributo de objeto workflow seleccionado.
   */
  public goToEditarAtributoObjetow(atributo: AtributoObjetowEntity) {
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

