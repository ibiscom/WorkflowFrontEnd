import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { EntityLogEntity } from '../entities/entities/entity-log.entity';
import { Observable } from 'rxjs';
import { EntityLogFilterEntity } from '../entities/entities/entity-log-filter.entity';
import { EntityLogReportEntity } from '../entities/entities/entity-log-report.entity';
import { EntityLogPropertyEntity } from '../entities/entities/entity-log-property.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para consultar y gestionar información del Log de Auditoría.
 */
export class LogAuditoriaService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Obtiene el reporte de logs de auditoría.
   */
  public getReport(
    filter: EntityLogFilterEntity,
  ): Observable<FsResponseEntity<EntityLogReportEntity>> {
    return this.http.post<FsResponseEntity<EntityLogReportEntity>>(
      environment.frameSecApiUrl + '/entityLog/getReport',
      filter,
    );
  }

  /**
   * Obtiene la lista de logs de auditoría.
   */
  public getEntityLogs(
    filter: EntityLogFilterEntity,
  ): Observable<FsResponseEntity<EntityLogEntity[]>> {
    return this.http.post<FsResponseEntity<EntityLogEntity[]>>(
      environment.frameSecApiUrl + '/entityLog/getEntityLogs',
      filter,
    );
  }

  /**
   * Obtiene los usuarios relacionados con los logs.
   */
  public getUsers(
    userGenerator: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/entityLog/getUsers?userName=${userGenerator}`,
    );
  }

  /**
   * Obtiene los tipos de entidad de log.
   */
  public getTypesLogEntity(): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl + '/entityLog/getTypesLogEntity',
    );
  }

  /**
   * Obtiene las propiedades de los logs.
   */
  public getLogProperties(
    logEntityId: string,
  ): Observable<FsResponseEntity<EntityLogPropertyEntity[]>> {
    return this.http.get<FsResponseEntity<EntityLogPropertyEntity[]>>(
      environment.frameSecApiUrl +
        `/entityLog/getLogProperties?logEntityId=${logEntityId}`,
    );
  }

  /**
   * Obtiene las acciones de los logs.
   */
  public getLogActions(
    entityType: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/entityLog/getLogActions?entityType=${entityType}`,
    );
  }

  /**
   * Obtiene un log de auditoría por ID.
   */
  public getEntityLog(
    logEntityId: string,
  ): Observable<FsResponseEntity<EntityLogEntity>> {
    return this.http.get<FsResponseEntity<EntityLogEntity>>(
      environment.frameSecApiUrl +
        `/entityLog/getEntityLog?logEntityId=${logEntityId}`,
    );
  }
}
