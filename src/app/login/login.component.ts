import { Component } from '@angular/core';
import { LoginEntity } from './login.entity';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatButton,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
/**
 * Pantalla de inicio de sesión.
 * Permite al usuario autenticarse y registra su IP en cookies.
 */
export class LoginComponent {
  public userName: string;
  public password: string;
  public mensaje: string;
  public ipAddress: string;

  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private router: Router,
  ) {
    this.userName = '';
    this.password = '';
    this.ipAddress = '';
    this.mensaje = '';
  }

  /**
   * Ejecuta el flujo de inicio de sesión.
   * Obtiene la IP, invoca el servicio y navega a la página principal al éxito.
   */
  public async login() {
    await this.setIpAddress();
    let loginInfo: LoginEntity = {
      user_name: this.userName,
      password: this.password,
      user_ip: this.ipAddress,
    };

    this.loginService.login(loginInfo).subscribe({
      next: (response) => {
        this.mensaje = 'Se inició sesión con éxito.';
        this.loginService.registerUser(loginInfo.user_name, loginInfo.user_ip);
        this.router.navigate(['/main-page']);
      },
      error: (e) => {
        this.mensaje = e.error
          ? 'No se pudo ingresar al sistema: ' +
            e.error.codigo +
            ': ' +
            e.error.mensaje
          : e.message;
      },
    });
  }

  /**
   * Obtiene la IP del usuario desde el servicio y la almacena localmente.
   */
  private async setIpAddress() {
    this.ipAddress = (await this.loginService.getIPAddress()).ip;
  }
}
