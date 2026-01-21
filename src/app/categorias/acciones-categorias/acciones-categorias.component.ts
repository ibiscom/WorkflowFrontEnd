import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CategoriasComponentInstanceService } from '../categorias-component-instance.service';
import { CategoriasComponent } from '../categorias.component';
import { Router } from '@angular/router';

@Component({
  selector: 'fs-acciones-categorias',
  imports: [
    FormsModule,
    MatButton,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './acciones-categorias.component.html',
  styleUrl: './acciones-categorias.component.scss',
})
/**
 * Botonera de acciones relacionadas con categorías (crear, navegar, etc.).
 */
export class AccionesCategoriasComponent {
  public uc?: CategoriasComponent;

  public constructor(
    private router: Router,
    private categoriasComponentInstanceService: CategoriasComponentInstanceService,
  ) {
    this.uc = this.categoriasComponentInstanceService.getInstance();
  }

  /**
   * Navega a la pantalla de creación de categoría.
   */
  public irACrearCategoria() {
    this.router.navigate(['main-page/administrarCategorias/crearCategoria']);
  }
}
