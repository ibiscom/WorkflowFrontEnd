import { Component } from '@angular/core';
import { EventoInicioComponent } from '../eventoinicio.component';
import { MatTableModule } from '@angular/material/table';
import { EventoInicioEntity } from '../eventoinicio.entity';

@Component({
  selector: 'ibpm-listado-evento-inicio',
  imports: [MatTableModule],
  templateUrl: './listado-eventoinicio.component.html',
  styleUrl: './listado-eventoinicio.component.scss',
})
/**
 * Listado de eventos de inicio con navegación a la edición y utilidades de presentación.
 */
export class ListadoEventoInicioComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Numero',
    'Nombre',
    'Nombre Largo',
    'Descripción',
    'Tipo',
  ];

  constructor(public parent: EventoInicioComponent) {}

  /**
   * Navega a la pantalla de edición del evento de inicio seleccionado.
   */
  public goToEditarEventoInicio(eventoInicio: EventoInicioEntity) {
    this.parent.router.navigate([
      `/main-page/eventoinicio/editarEventoInicio/${eventoInicio.nombreEvento}`,
    ]);
  }

   /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getEventoInicioName(eventoInicioName: any) {
    const eventoInicio = this.parent.eventosInicio.find((c: EventoInicioEntity) => c.nombreEvento === eventoInicioName);
    return eventoInicio ? eventoInicio.nombreEvento : '';
  }

  
  // 🔹 Ir a página anterior
  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.parent.buscarEventosInicio(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarEventosInicio(); // ajusta si tu método se llama diferente
    }
  }
}

