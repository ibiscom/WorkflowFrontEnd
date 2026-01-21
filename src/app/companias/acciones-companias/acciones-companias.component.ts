import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CompaniasComponentInstanceService } from '../companias-component-instance.service';
import { CompaniasComponent } from '../companias.component';

@Component({
  selector: 'fs-acciones-companias',
  imports: [
    FormsModule,
    MatButton,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './acciones-companias.component.html',
  styleUrl: './acciones-companias.component.scss',
})
/**
 * Botonera de acciones para compañías (crear, navegación, etc.).
 */
export class AccionesCompaniasComponent {
  public uc?: CompaniasComponent;

  constructor(
    private router: Router,
    private companiasComponentInstanceService: CompaniasComponentInstanceService,
  ) {
    this.uc = this.companiasComponentInstanceService.getInstance();
  }

  /**
   * Navega a la pantalla de creación de compañía.
   */
  public irACrearCompania() {
    this.router.navigate(['main-page/administrarCompanias/crearCompania']);
  }
}
