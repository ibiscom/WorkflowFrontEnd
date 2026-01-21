import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RegistroAreaComponent } from '../registro-area/registro-area.component';
import { AreaEntity } from '../../entities/areas/area.entity';
import { AreasComponent } from '../areas.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'fs-listado-areas',
  imports: [MatTableModule, RegistroAreaComponent, MatButtonModule],
  templateUrl: './listado-areas.component.html',
  styleUrl: './listado-areas.component.scss',
})
/**
 * Presenta el listado de áreas y expone acciones sobre el registro seleccionado.
 */
export class ListadoAreasComponent {
  public currentPage: number = 1;
  public numberOfPages: number = 1;
  public displayedColumns: string[] = ['Area', 'Accion'];

  public constructor(public parent: AreasComponent) {}

  /**
   * Solicita al componente padre la eliminación del área indicada.
   */
  public deleteArea(area: AreaEntity) {
    this.parent.deleteArea(area);
  }
}
