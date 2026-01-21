import { Component, Input } from '@angular/core';
import { AreaEntity } from '../../entities/areas/area.entity';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { AreasComponent } from '../areas.component';

@Component({
  selector: 'fs-registro-area',
  imports: [
    FormsModule,
    MatButton,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatExpansionModule,
  ],
  templateUrl: './registro-area.component.html',
  styleUrl: './registro-area.component.scss',
})
/**
 * Formulario de registro de área. Envía la creación al componente padre.
 */
export class RegistroAreaComponent {
  public areaDescriptionN: string = '';
  public areaNameN: string = '';
  @Input() public uc?: AreasComponent;

  constructor() {}

  /**
   * Construye la entidad de área y delega creación al componente padre.
   */
  public save() {
    let area = {
      description: this.areaDescriptionN,
      name: this.areaNameN,
    } as AreaEntity;

    this.uc?.createArea(area);
  }
}
