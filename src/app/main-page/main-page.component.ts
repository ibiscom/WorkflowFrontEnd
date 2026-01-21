import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginEntity } from '../login/login.entity';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'fs-main-page',
  imports: [
    RouterOutlet,
    MenuComponent,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
/**
 * Página principal que contiene el menú y permite cerrar sesión.
 */
export class MainPageComponent {
  public mensaje: string;
  public showMenu: boolean = true;

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.mensaje = '';
  }

  title = '¡Bienvenido al Framework de Seguridad!';
  userName = this.cookieService.get('userName');

  /**
   * Muestra/oculta el menú de navegación.
   */
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  /**
   * Cierra sesión del usuario actual y redirige al login.
   */
  public async logout() {
    this.cookieService.get('userName');
    let loginInfo: LoginEntity = {
      user_name: this.cookieService.get('userName'),
      password: '',
      user_ip: this.cookieService.get('ip'),
    };

    this.loginService.logout(loginInfo).subscribe({
      next: (response) => {
        this.loginService.unregister();
        this.router.navigate(['/login']);
      },
      error: (e) => {
        this.mensaje = e.error
          ? e.error.codigo + ': ' + e.error.mensaje
          : e.message;
      },
    });
  }
}
