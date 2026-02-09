import { Component } from '@angular/core';
import { HerramientaComponent } from '../herramienta.component';
import { FiltrosBusquedaHerramientaComponent } from '../filtros-busqueda-herramienta/filtros-busqueda-herramienta.component';
import { MatTableModule } from '@angular/material/table';
import { HerramientaEntity } from '../herramienta.entity';

@Component({
  selector: 'ibpm-listado-herramienta',
  imports: [MatTableModule, FiltrosBusquedaHerramientaComponent],
  templateUrl: './listado-herramienta.component.html',
  styleUrl: './listado-herramienta.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoHerramientaComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Tipo',
    'Descripción',
    'Cadena de representación',
  ];

  constructor(public parent: HerramientaComponent) {}

  /**
   * Navega a la pantalla de edición de la herramienta seleccionado.
   */
  public goToEditarHerramienta(herramienta: HerramientaEntity) {
    this.parent.mensaje = '';
    this.parent.router.navigate([
      `/main-page/herramientas/editarHerramienta/${herramienta.nombre}`,
    ]);
  }

  /**
   * Obtiene el nombre legible de la herramienta a partir del identificador.
   */
  public getHerramientaName(herramientaName: any) {
    const herramienta = this.parent.herramientas.find((c) => c.nombre === herramientaName);
    return herramienta ? herramienta.nombre : '';
  }

  /**
 * REVISAR!!!
 
  // 🔹 Ir a página anterior
  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.parent.buscarHerramienta(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.buscarHerramienta(); // ajusta si tu método se llama diferente
    }
  }
    */
}

