import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'ibpm-acciones-eventoinicio',
  imports: [
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './acciones-eventoinicio.component.html',
  styleUrl: './acciones-eventoinicio.component.scss',
})
/**
 * Componente de acciones para la administración de Eventos de Inicio.
 * Permite navegar a la pantalla de creación de Eventos de Inicio.
 */
export class AccionesEventoInicioComponent {
  constructor(public router: Router) {}

  /**
   * Navega a la pantalla de creación de Evento de Inicio.
   */
  public irACrearEventoInicio() {
    this.router.navigate([`/main-page/eventoinicio/crearEventoInicio`]);
  }
}

