import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'ibpm-acciones-herramienta',
  imports: [
    FormsModule,
    MatButton,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './acciones-herramienta.component.html',
  styleUrl: './acciones-herramienta.component.scss',
})
/**
 * Componente de acciones para la administración de grupos.
 * Permite navegar a la pantalla de creación de grupos.
 */
export class AccionesHerramientaComponent {
  constructor(public router: Router) {}

  /**
   * Navega a la pantalla de creación de grupo.
   */
  public irACrearHerramienta() {
    this.router.navigate([`/main-page/herramienta/crearHerramientas`]);
  }
}

