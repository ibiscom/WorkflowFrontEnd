import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'ibpm-acciones-objetow',
  imports: [
    FormsModule,
    MatButton,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './acciones-objetow.component.html',
  styleUrl: './acciones-objetow.component.scss',
})
/**
 * Componente de acciones para la administración de objetos workflow.
 * Permite navegar a la pantalla de creación de objetos workflow.
 */
export class AccionesObjetowComponent {
  constructor(public router: Router) {}

  /**
   * Navega a la pantalla de creación de objeto workflow.
   */
  public irACrearObjetow() {
    this.router.navigate([`/main-page/objetosWorkflow/crearAtributoObjetoWorkflow`]);
  }
}

