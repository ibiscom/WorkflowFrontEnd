import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'fs-acciones-perfiles',
  imports: [
    FormsModule,
    MatButton,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './acciones-perfiles.component.html',
  styleUrl: './acciones-perfiles.component.scss',
})
/**
 * Componente de acciones rápidas para el módulo de Perfiles.
 * Proporciona navegación a la creación de nuevos perfiles.
 */
export class AccionesPerfilesComponent {
  constructor(public router: Router) {}

  /**
   * Navega a la pantalla de creación de perfil.
   */
  public irACrearPerfil() {
    this.router.navigate([`/main-page/administrarPerfiles/crearPerfil`]);
  }
}
