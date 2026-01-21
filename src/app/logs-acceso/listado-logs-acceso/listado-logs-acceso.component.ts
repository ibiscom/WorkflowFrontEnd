import { Component } from '@angular/core';
import { LogsAccesoComponent } from '../logs-acceso.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SeleccionLogComponent } from '../seleccion-log/seleccion-log.component';

@Component({
  selector: 'fs-listado-logs-acceso',
  imports: [FormsModule, RouterModule, SeleccionLogComponent],
  templateUrl: './listado-logs-acceso.component.html',
  styleUrl: './listado-logs-acceso.component.scss',
})
export class ListadoLogsAccesoComponent {

  public currentPage: number = 1;
  public pageSize: number = 10;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Fecha',
    'Nombre acción',
    'Cuenta de usuario',
    'Descripción acción',
    'Acción de autorización',
    'Dirección IP de acceso',
  ];

  constructor(public parent: LogsAccesoComponent) {}

  // -----------------------------------------
  // PAGINACIÓN
  // -----------------------------------------

  private calcularPaginas(): void {
    const total = this.parent.accessLogsList?.length ?? 0;
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

  public get pagedLogs() {
    const all = this.parent.accessLogsList ?? [];
    const start = (this.currentPage - 1) * this.pageSize;
    return all.slice(start, start + this.pageSize);
  }

  // -----------------------------------------
  // NAVEGACIÓN AL DETALLE
  // -----------------------------------------
  public goToDetalle(element: any): void {
    this.parent.router.navigate([
      `/main-page/verLogAcceso/verDetalleLogAcceso/${element.id}`,
    ]);
  }

  ngDoCheck(): void {
    this.calcularPaginas();
  }
}
