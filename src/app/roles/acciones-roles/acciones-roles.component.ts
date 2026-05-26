import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'ibpm-acciones-roles',
  imports: [
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './acciones-roles.component.html',
  styleUrl: './acciones-roles.component.scss',
})
/**
 * Componente de acciones para la administración de grupos.
 * Permite navegar a la pantalla de creación de grupos.
 */
export class AccionesRolesComponent {
  constructor(public router: Router) {}

  /**
   * Navega a la pantalla de creación de grupo.
   */
  public irACrearRoles() {
    this.router.navigate([`/main-page/roles/crearRoles`]);
  }
}
