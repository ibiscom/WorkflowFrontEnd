import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { OperationEntity } from '../entities/operations/operation.entity';

/**
 * Servicio para la gestión de operaciones en el sistema.
 * Permite consultar y crear operaciones.
 */
@Injectable({
  providedIn: 'root',
})
export class OperacionesService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de operaciones disponibles para el usuario dado.
   * @param userGenerator Usuario que realiza la consulta.
   * @returns Observable con la respuesta y el listado de operaciones.
   */
  public getOperations(
    userGenerator: string,
  ): Observable<FsResponseEntity<OperationEntity[]>> {
    return this.http.get<FsResponseEntity<OperationEntity[]>>(
      environment.frameSecApiUrl +
        `/operation/getOperations?userName=${userGenerator}`,
    );
  }

  /**
   * Crea una nueva operación en el sistema.
   * @param operation Entidad de la operación a crear.
   * @returns Observable con la respuesta del servidor.
   */
  public createOperation(
    operation: OperationEntity,
  ): Observable<FsResponseEntity<any>> {
    return this.http.put<FsResponseEntity<any>>(
      environment.frameSecApiUrl + `/operation/create`,
      operation,
    );
  }
}
