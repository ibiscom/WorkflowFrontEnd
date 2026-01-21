import { Injectable, inject } from '@angular/core';
import { LoginEntity } from './login.entity';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

/**
 * Servicio para la gestión de autenticación y sesión de usuarios.
 * Permite iniciar sesión, cerrar sesión, obtener IP y gestionar cookies de usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param loginObject Objeto con los datos de usuario y contraseña.
   * @returns Observable con la respuesta del backend.
   */
  public login(loginObject: LoginEntity) {
    return this.http.post(
      environment.frameSecApiUrl + '/login/login',
      loginObject,
    );
  }

  /**
   * Obtiene la dirección IP del usuario.
   * @returns Promesa con la respuesta que contiene la IP.
   */
  public async getIPAddress(): Promise<any> {
    return await lastValueFrom(
      this.http.get(environment.ipifyApiUrl + '/?format=json'),
    );
  }

  /**
   * Registra el usuario y su IP en las cookies.
   * @param userName Nombre de usuario.
   * @param ip Dirección IP del usuario.
   */
  public async registerUser(userName: string, ip: string) {
    this.cookieService.set('userName', userName, 1);
    this.cookieService.set('ip', ip, 1);
  }

  /**
   * Obtiene el usuario actualmente logueado desde las cookies.
   * @returns Entidad LoginEntity o undefined si no existe.
   */
  public getLoggedUser(): LoginEntity | undefined {
    let userName = this.cookieService.get('userName');
    let ip = this.cookieService.get('ip');
    if (userName && ip) {
      let userEntity: LoginEntity = {
        user_name: userName,
        password: '',
        user_ip: ip,
      };
      return userEntity;
    } else return undefined;
  }

  /**
   * Verifica si el usuario puede acceder a rutas protegidas.
   * @returns true si el usuario está logueado, false en caso contrario.
   */
  public canActivate() {
    if (this.cookieService.get('userName')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  /**
   * Cierra la sesión del usuario.
   * @param loginObject Objeto con los datos de usuario.
   * @returns Observable con la respuesta del backend.
   */
  public logout(loginObject: LoginEntity) {
    return this.http.put(
      environment.frameSecApiUrl + '/login/logout',
      loginObject,
    );
  }

  /**
   * Elimina todas las cookies del usuario y muestra información de la ubicación.
   */
  public unregister() {
    this.cookieService.deleteAll(
      '/',
      this.router['location']._locationStrategy._platformLocation._location
        .hostname,
    );
    console.log(
      this.router['location']._locationStrategy._platformLocation._location
        .origin,
    );
  }
}
