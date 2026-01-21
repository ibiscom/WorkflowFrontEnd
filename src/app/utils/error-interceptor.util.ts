import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Constants } from './constants';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login/login.service';

/**
 * Esta clase es un interceptor de errores de llamados a los servicios REST que manejan errores HTTP específicos,
 * especialmente los relacionados con la autenticación.
 * Redirige al usuario a la página de inicio de sesión si se detecta un error relacionado con el usuario no autenticado
 * o si la sesión ha sido cerrada.
 */
@Injectable()
export class ErrorInterceptorUtil implements HttpInterceptor {
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          //401 Unauthorized
          console.error('Usuario no autenticado:', error);
          console.log('Redirigiendo a login...');
          this.loginService.unregister();
          this.router.navigate(['/login']);
        } else if (error.status === 500) {
          if (error.error && error.error.mensaje === Constants.ERR_LOGGEDOUT) {
            console.log(Constants.ERR_LOGGEDOUT);
            console.log('Redirigiendo a login...');
            this.loginService.unregister();
            this.router.navigate(['/login']);
          }
        }
        return throwError(() => error);
      }),
    );
  }
}
