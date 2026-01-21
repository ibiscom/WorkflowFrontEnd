import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment.development';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { FileLogEntity } from '../entities/logs/file-log.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Obtiene la configuración de archivos de log.
   * @returns Observable con la respuesta estándar y la configuración de archivos de log.
   */
  public getFilesLog(): Observable<FsResponseEntity<FileLogEntity>> {
    return this.http.get<FsResponseEntity<FileLogEntity>>(
      environment.frameSecApiUrl + `/log/getFilesLog`,
    );
  }

  /**
   * Obtiene el valor de un atributo de configuración de logs.
   * @param attribute Nombre del atributo a consultar.
   * @returns Observable con la respuesta estándar y el valor del atributo.
   */
  public getAttributeValue(
    attribute: string,
  ): Observable<FsResponseEntity<string>> {
    return this.http.get<FsResponseEntity<string>>(
      environment.frameSecApiUrl +
        `/log/getAttributeValue?atributo=${attribute}`,
    );
  }

  /**
   * Cambia el estado de un atributo informativo del log.
   * @param userGenerator Usuario que realiza la operación.
   * @param attribute Atributo a modificar.
   * @returns Observable con la respuesta del servidor.
   */
  public changeStatusInfo(
    userGenerator: string,
    attribute: string,
  ): Observable<FsResponseEntity<any>> {
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/log/changeStatusInfo?userName=${userGenerator}&atributo=${attribute}`,
      {},
    );
  }

  /**
   * Cambia el estado de una operación del log.
   * @param userGenerator Usuario que realiza la operación.
   * @param event Evento/operación a modificar.
   * @param status Nuevo estado.
   * @returns Observable con la respuesta del servidor.
   */
  public changeStatusOperation(
    userGenerator: string,
    event: string,
    status: string,
  ): Observable<FsResponseEntity<any>> {
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/log/changeStatusOperation?userName=${userGenerator}&evento=${event}&estado=${status}`,
      {},
    );
  }

  /**
   * Actualiza la configuración de archivos de log.
   * @param fileLog Entidad con los datos a actualizar.
   * @returns Observable con la respuesta del servidor.
   */
  public updateFilesLog(
    fileLog: FileLogEntity,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    fileLog.ip = ip;
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl + `/log/updateFilesLog`,
      fileLog,
    );
  }
}
