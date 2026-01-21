import { Injectable } from '@angular/core';
import { SessionEntity } from '../entities/sessions/session.entity';
import { HttpClient } from '@angular/common/http';
import { LoginEntity } from '../login/login.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GetSessionsEntity } from '../entities/sessions/get-sessions.entity';

/**
 * Servicio para la gestión de sesiones en el sistema.
 * Permite cerrar sesiones, consultar sesiones activas y modificar tiempos máximos.
 */
@Injectable({
  providedIn: 'root',
})
export class SesionesService {
  constructor(private http: HttpClient) {}

  /**
   * Cierra la sesión de un usuario.
   * @param session Datos de la sesión a cerrar (usuario e IP).
   * @returns Promesa con la respuesta del servidor.
   */
  public async closeSession(
    session: SessionEntity,
  ): Promise<FsResponseEntity<any>> {
    let logoutObject: LoginEntity = {
      user_name: session.userNameFilter ?? '',
      password: '',
      user_ip: session.userIpFilter ?? '',
    };

    let response: FsResponseEntity<any> = await lastValueFrom<
      FsResponseEntity<any>
    >(
      this.http.put<FsResponseEntity<any>>(
        environment.frameSecApiUrl + '/login/logout',
        logoutObject,
      ),
    );
    return response;
  }

  /**
   * Obtiene el listado de sesiones según filtros.
   * @param filters Filtros de búsqueda de sesiones.
   * @returns Observable con la respuesta y el arreglo de sesiones.
   */
  public getSessions(
    filters: GetSessionsEntity,
  ): Observable<FsResponseEntity<SessionEntity[]>> {
    return this.http.post<FsResponseEntity<SessionEntity[]>>(
      environment.frameSecApiUrl + `/session/getSessions`,
      filters,
    );
  }

  /**
   * Establece los tiempos máximos de sesión y cambio de contraseña.
   * @param userGenerator Usuario que realiza la modificación.
   * @param maxSessionTimeE Tiempo máximo de sesión (en minutos).
   * @param maxNoPasswordChangeTimeE Tiempo máximo sin cambio de contraseña (en días).
   * @returns Observable con la respuesta del servidor.
   */
  public setMaxTimes(
    userGenerator: string,
    maxSessionTimeE: string,
    maxNoPasswordChangeTimeE: string,
  ) {
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/session/edit?userName=${userGenerator}&timeSession=${maxSessionTimeE}&timePassword=${maxNoPasswordChangeTimeE}`,
      {},
    );
  }
}
