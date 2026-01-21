import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TiposIdentificacionComponent } from '../tipos-identificacion.component';
import { TiposIdentificacionComponentInstanceService } from '../tipos-identificacion-component-instance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fs-acciones-tipos-identificacion',
  imports: [
    FormsModule,
    MatButton,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './acciones-tipos-identificacion.component.html',
  styleUrl: './acciones-tipos-identificacion.component.scss',
})
/**
 * Componente de acciones para la administración de tipos de identificación.
 * Permite navegar a la pantalla de creación.
 */
export class AccionesTiposIdentificacionComponent {
  public uc?: TiposIdentificacionComponent;

  constructor(
    private router: Router,
    private TiposIdentificacionComponentInstanceService: TiposIdentificacionComponentInstanceService,
  ) {
    this.uc = this.TiposIdentificacionComponentInstanceService.getInstance();
  }

  /**
   * Navega a la pantalla para crear un nuevo tipo de identificación.
   */
  irACrearTipoIdentificacion() {
    this.router.navigate([
      '/main-page/administrarTiposIdentificacion/crearTipoIdentificacion',
    ]);
  }
}
