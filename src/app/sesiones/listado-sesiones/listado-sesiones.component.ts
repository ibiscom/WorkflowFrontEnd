import { Component } from '@angular/core';
import { SessionEntity } from '../../entities/sessions/session.entity';
import { FiltrosBusquedaSesionesComponent } from '../filtros-busqueda-sesiones/filtros-busqueda-sesiones.component';
import { MatTableModule } from '@angular/material/table';
import { SesionesComponent } from '../sesiones.component';
import { SesionesModule } from "../sesiones.module";

@Component({
  selector: 'fs-listado-sesiones',
  imports: [MatTableModule, FiltrosBusquedaSesionesComponent, SesionesModule],
  templateUrl: './listado-sesiones.component.html',
  styleUrl: './listado-sesiones.component.scss',
})
/**
 * Componente encargado de mostrar el listado de sesiones.
 * Ofrece la acción para cerrar una sesión.
 */
export class ListadoSesionesComponent {
  public currentPage: number = 1;
  public numberOfPages: number = 1;
  public displayedColumns: string[] = [
    'Usuario',
    'Dirección computador',
    'Última modificación',
    'Cerrar',
  ];

  constructor(public parent: SesionesComponent) {}

  /**
   * Pide al componente padre cerrar la sesión seleccionada.
   * @param session Sesión que se desea cerrar.
   */
  public closeSession(session: SessionEntity) {
    this.parent.closeSession(session);
  }
}
