import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LogAuditoriaComponent } from '../log-auditoria.component';
import { EntityLogEntity } from '../../entities/entities/entity-log.entity';
import { FiltrosBusquedaLogAuditoriaComponent } from '../filtros-busqueda-log-auditoria/filtros-busqueda-log-auditoria.component';

@Component({
  selector: 'fs-listado-log-auditoria',
  imports: [MatTableModule, FiltrosBusquedaLogAuditoriaComponent, LogAuditoriaComponent],
  templateUrl: './listado-log-auditoria.component.html',
  styleUrl: './listado-log-auditoria.component.scss',
})
export class ListadoLogAuditoriaComponent {

  public currentPage: number = 1;
  public pageSize: number = 10;   // <-- cantidad de filas por página
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Fecha',
    'Usuario',
    'IpAcceso',
    'Cambio',
    'Tipo',
  ];

  constructor(public parent: LogAuditoriaComponent) {}

  // -------------------------
  // PAGINACIÓN
  // -------------------------

  private calcularPaginas(): void {
    const total = this.parent.logs?.length ?? 0;
    this.numberOfPages = Math.max(1, Math.ceil(total / this.pageSize));

    if (this.currentPage > this.numberOfPages) {
      this.currentPage = this.numberOfPages;
    }
  }

  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
    }
  }

  // Devuelve solo los logs de la página actual
  public get pagedLogs(): EntityLogEntity[] {
    const all = this.parent.logs ?? [];
    const start = (this.currentPage - 1) * this.pageSize;
    return all.slice(start, start + this.pageSize);
  }

  /**
   * Navega a la pantalla de detalle del log seleccionado.
   */
  public goToListadoDetalleLog(element: EntityLogEntity) {
    this.parent.router.navigate([
      `/main-page/verLogAuditoria/verDetalleLogAuditoria/${element.id}`,
    ]);
  }

  /**
   * Debes llamar a calcularPaginas()
   * cuando el padre actualice parent.logs
   */
  ngDoCheck(): void {
    this.calcularPaginas();
  }
}
