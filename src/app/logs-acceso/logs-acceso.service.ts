import { Injectable } from '@angular/core';
import { AccessLogEntity } from '../entities/logs/access-log,entity';
import { Observable } from 'rxjs';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment.development';
import { AuthorizationStateEntity } from '../entities/authorization-states/authorization-state.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para consultar logs de acceso y catálogos relacionados (acciones, usuarios, archivos).
 */
export class LogsAccesoService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Consulta los logs de acceso aplicando filtros.
   * @param filters Filtros de búsqueda para los logs de acceso.
   * @returns Observable con la lista de logs.
   */
  public getAccessLog(
    filters: AccessLogEntity,
  ): Observable<FsResponseEntity<AccessLogEntity[]>> {
    return this.http.post<FsResponseEntity<AccessLogEntity[]>>(
      environment.frameSecApiUrl + '/accessLog/getAccessLog',
      filters,
    );
  }

  /**
   * Obtiene los archivos de log disponibles para descarga/consulta.
   * @param userGenerator Usuario generador de la consulta.
   */
  public getAvailableLogs(
    userGenerator?: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/accessLog/getLogFiles?userName=${userGenerator}`,
    );
  }

  /**
   * Obtiene la lista de acciones de autorización posibles.
   */
  public getAuthorizationActionsList(): Observable<
    FsResponseEntity<AuthorizationStateEntity[]>
  > {
    return this.http.get<FsResponseEntity<AuthorizationStateEntity[]>>(
      environment.frameSecApiUrl + '/accessLog/getAuthorizations',
    );
  }

  /**
   * Obtiene la lista de cuentas de usuario.
   * @param userGenerator Usuario generador de la consulta.
   */
  public getUserAccountsList(
    userGenerator?: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/accessLog/getUsers?userName=${userGenerator}`,
    );
  }

  /**
   * Obtiene la lista de operaciones/acciones registradas en logs.
   * @param userGenerator Usuario generador de la consulta.
   */
  public getActionsList(
    userGenerator?: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/accessLog/getOperations?userName=${userGenerator}`,
    );
  }
}
