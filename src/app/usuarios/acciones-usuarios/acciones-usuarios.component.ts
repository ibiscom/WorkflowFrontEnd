import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UsuariosComponent } from '../usuarios.component';
import { UsuariosComponentInstanceService } from '../usuarios-component-instance.service';

@Component({
  selector: 'fs-acciones-usuarios',
  imports: [
    FormsModule,
    MatButton,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './acciones-usuarios.component.html',
  styleUrl: './acciones-usuarios.component.scss',
})
/**
 * Componente de acciones rápidas para el módulo de Usuarios.
 *
 * Provee atajos para navegación (crear usuario) y acciones comunes
 * como la carga masiva de usuarios a partir de un archivo.
 */
export class AccionesUsuariosComponent {
  public uc?: UsuariosComponent;

  constructor(
    private router: Router,
    private usuariosComponentInstanceService: UsuariosComponentInstanceService,
  ) {
    this.uc = this.usuariosComponentInstanceService.getInstance();
  }

  /**
   * Navega al registro de área.
   */
  public irARegistroArea() {
    this.router.navigate(['main-page/registroArea']);
  }

  /**
   * Dispara el flujo de carga masiva de usuarios delegando la acción
   * al componente padre de Usuarios.
   *
   * @param event Evento del input file que contiene el/los archivo(s) a cargar.
   */
  public async cargarUsuariosMasivamente(event: Event) {
    this.uc = this.usuariosComponentInstanceService.getInstance();
    await this.uc?.cargarUsuariosMasivamente(event);
  }

  /**
   * Navega a la pantalla de creación de usuario.
   */
  public irACrearUsuario() {
    this.router.navigate(['main-page/administrarUsuarios/crearUsuario']);
  }

  public desactivarUsuarios() {
    this.uc = this.usuariosComponentInstanceService.getInstance();
    this.uc?.desactivarUsuarios();
  }
}
