import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DocumentTypeEntity } from '../entities/domains/document-type.entity';
import { Observable } from 'rxjs';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para gestionar los tipos de identificación.
 * Expone operaciones CRUD y consultas específicas.
 */
export class TiposIdentificacionService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Obtiene la lista de tipos de identificación disponibles.
   * @returns Observable con la respuesta estándar y el listado de tipos de identificación.
   */
  public getIdentificationTypes(): Observable<
    FsResponseEntity<DocumentTypeEntity[]>
  > {
    return this.http.get<FsResponseEntity<DocumentTypeEntity[]>>(
      `${environment.frameSecApiUrl}/typeId/getAll`,
    );
  }

  /**
   * Obtiene la información de un tipo de identificación específico.
   * @param typeIdCode Código del tipo de identificación.
   * @returns Observable con la respuesta estándar y la entidad encontrada.
   */
  public getIdentificationType(
    typeIdCode: string,
  ): Observable<FsResponseEntity<DocumentTypeEntity>> {
    return this.http.get<FsResponseEntity<DocumentTypeEntity>>(
      `${environment.frameSecApiUrl}/typeId/getTypeId?typeIdCode=${typeIdCode}`,
    );
  }

  /**
   * Crea un nuevo tipo de identificación.
   * @param type Entidad del tipo de identificación a crear.
   * @returns Observable con la respuesta del servidor.
   */
  public createIdentificationType(
    type: DocumentTypeEntity,
  ): Observable<FsResponseEntity<any>> {
    return this.http.put<FsResponseEntity<any>>(
      `${environment.frameSecApiUrl}/typeId/create`,
      type,
    );
  }

  /**
   * Edita un tipo de identificación existente.
   * @param type Entidad del tipo de identificación con los datos actualizados.
   * @returns Observable con la respuesta del servidor.
   */
  public editIdentificationType(
    type: DocumentTypeEntity,
  ): Observable<FsResponseEntity<any>> {
    return this.http.post<FsResponseEntity<any>>(
      `${environment.frameSecApiUrl}/typeId/edit`,
      type,
    );
  }

  /**
   * Elimina un tipo de identificación.
   * @param typeIdCode Código del tipo de identificación a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  public deleteIdentificationType(
    typeIdCode: string,
  ): Observable<FsResponseEntity<any>> {
    return this.http.delete<FsResponseEntity<any>>(
      `${environment.frameSecApiUrl}/typeId/delete?typeIdCode=${typeIdCode}`,
    );
  }
}
