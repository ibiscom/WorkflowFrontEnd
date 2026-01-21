import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { RestorePasswordEntity } from '../entities/passwords/restore-password.entity';
import { environment } from '../../environments/environment';

/**
 * Servicio para reestablecer la contraseña de un usuario.
 * Actualmente retorna una respuesta simulada hasta contar con el backend.
 */
@Injectable({
  providedIn: 'root',
})
export class ReestablecerPasswordService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Envía la solicitud de reestablecimiento de contraseña.
   * Inserta automáticamente la IP almacenada en cookies.
   * @param restorePasswordEntity Datos requeridos para reestablecer la contraseña.
   * @returns Observable con la respuesta del servidor.
   */
  public restorePassword(
    restorePasswordEntity: RestorePasswordEntity,
  ): Observable<FsResponseEntity<any>> {
    restorePasswordEntity.ip = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/user/resetPassword?userName=${restorePasswordEntity.userName}&asignarPwDefecto=${restorePasswordEntity.isUniquePassword}&nuevoPw=${restorePasswordEntity.password}`,
      {},
    );
  }
}
