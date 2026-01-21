import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SesionesComponent } from '../sesiones.component';
import { LoginService } from '../../login/login.service';

import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'fs-tiempos-maximos-sesiones',
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
  templateUrl: './tiempos-maximos-sesiones.component.html',
  styleUrl: './tiempos-maximos-sesiones.component.scss',
})
/**
 * Componente para ajustar los tiempos máximos de sesión y de cambio de contraseña.
 * Propaga los valores al componente padre para su persistencia.
 */
export class TiemposMaximosSesionesComponent {
  @Input() public sc?: SesionesComponent;
  protected maxSessionTimeE: string = '';
  protected maxNoPasswordChangeTimeE: string = '';

  public constructor(loginService: LoginService) {}

  /**
   * Guarda los tiempos máximos configurados invocando la lógica del padre.
   */
  public save() {
    if (this.sc) {
      this.sc.setMaxTimes(this.maxSessionTimeE, this.maxNoPasswordChangeTimeE);
    }
  }
}
