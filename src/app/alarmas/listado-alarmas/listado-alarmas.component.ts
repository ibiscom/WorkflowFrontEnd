import { Component } from '@angular/core';
import { AlarmaComponent } from '../alarmas.component';
import { MatTableModule } from '@angular/material/table';
import { AlarmaEntity } from '../alarmas.entity';
import { CrearAlarmaComponent } from '../crear-alarmas/crear-alarmas.component';

@Component({
  selector: 'ibpm-listado-alarma',
  standalone: true,
  imports: [MatTableModule, CrearAlarmaComponent],
  templateUrl: './listado-alarmas.component.html',
  styleUrls: ['./listado-alarmas.component.scss'],
})
/**
 * Listado de atributos de objetos workflow con navegación a la edición y utilidades de presentación.
 */
export class ListadoAlarmasComponent {
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
  public goToEditarAlarma(alarma: AlarmaEntity) {
    this.parent.router.navigate([
      `/main-page/alarmas/editarAlarma/${alarma.id}`,
    ]);
  }

   // 🔹 Ir a página anterior
  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.parent.buscarAlarma(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarAlarma(); // ajusta si tu método se llama diferente
    }

}

