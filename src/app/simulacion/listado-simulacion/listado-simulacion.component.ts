import { Component } from '@angular/core';
import { SimulacionComponent } from '../simulacion.component';
import { FiltrosBusquedaSimulacionComponent } from '../filtros-busqueda-simulacion/filtros-busqueda-simulacion.component';
import { SimulacionEntity } from '../simulacion.entity';

@Component({
  selector: 'ibpm-listado-simulacion',
  imports: [FiltrosBusquedaSimulacionComponent],
  templateUrl: './listado-simulacion.component.html',
  styleUrl: './listado-simulacion.component.scss',
})
/**
 * Formulario de parámetros + listado de tareas de la simulación.
 */
export class ListadoSimulacionComponent {
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  constructor(public parent: SimulacionComponent) {}

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
    }
  }

  public trackByTarea(index: number, element: SimulacionEntity): string {
    return `${element?.instancia ?? ''}-${element?.numTarea ?? index}`;
  }

  /** Icono: Ejecutar tarea (servicio del backend) */
  public ejecutarTarea(tarea: SimulacionEntity): void {
    this.parent.ejecutarTarea(tarea);
  }

  /** Icono: Ver expediente (servicio del backend) */
  public verExpediente(tarea: SimulacionEntity): void {
    this.parent.verExpediente(tarea);
  }

  /** Icono: Ver detalle (servicio del backend) */
  public verDetalle(tarea: SimulacionEntity): void {
    this.parent.verDetalle(tarea);
  }
}
