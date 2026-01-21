import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment.development';
import { CompanyEntity } from '../entities/companies/company.entity';
import { LabelSizeEntity } from '../entities/domains/label/label-size.entity';

/**
 * Servicio para la gestión de compañías en el sistema.
 * Proporciona métodos para consultar, crear, editar, eliminar compañías,
 * así como gestionar permisos, restricciones y tamaños de etiquetas.
 */
@Injectable({
  providedIn: 'root',
})
export class CompaniasService {
  /**
   * Constructor del servicio de compañías.
   * @param http Cliente HTTP para realizar peticiones al backend.
   * @param cookieService Servicio para la gestión de cookies.
   */
  public constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Obtiene todas las compañías registradas para el usuario dado.
   * @param userGenerator Usuario que realiza la consulta.
   * @returns Observable con la respuesta y el listado de compañías.
   */
  public getAllCompanies(
    userGenerator: string,
  ): Observable<FsResponseEntity<CompanyEntity[]>> {
    return this.http.get<FsResponseEntity<CompanyEntity[]>>(
      `${environment.frameSecApiUrl}/company/getAll?userName=${userGenerator}`,
    );
  }

  /**
   * Crea una nueva compañía en el sistema.
   * @param company Entidad de la compañía a crear.
   * @returns Observable con la respuesta del servidor.
   */
  public createCompany(
    company: CompanyEntity,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    company.ip = ip;
    return this.http.put<FsResponseEntity<any>>(
      `${environment.frameSecApiUrl}/company/create`,
      company,
    );
  }

  /**
   * Edita una compañía existente.
   * @param company Entidad de la compañía con los datos actualizados.
   * @returns Observable con la respuesta del servidor.
   */
  public editCompany(
    company: CompanyEntity,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    company.ip = ip;
    return this.http.post<FsResponseEntity<any>>(
      `${environment.frameSecApiUrl}/company/edit`,
      company,
    );
  }
  /**
   * Obtiene la lista de tamaños de etiquetas disponibles.
   * @returns Observable con la respuesta y el listado de tamaños de etiqueta.
   */
  public getLabelSizesList(): Observable<FsResponseEntity<LabelSizeEntity[]>> {
    return this.http.get<FsResponseEntity<LabelSizeEntity[]>>(
      `${environment.frameSecApiUrl}/parameter/getLabelSize`,
    );
  }

  /**
   * Elimina una compañía del sistema.
   * @param userName Usuario que realiza la acción.
   * @param companyId Identificador de la compañía a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  public deleteCompany(
    userGenerator: string,
    companyId: string,
  ): Observable<FsResponseEntity<any>> {
    return this.http.delete<FsResponseEntity<any>>(
      `${environment.frameSecApiUrl}/company/delete?userName=${userGenerator}&companyId=${companyId}`,
    );
  }

  /**
   * Obtiene la información de una compañía específica.
   * @param userName Usuario que realiza la consulta.
   * @param companyId Identificador de la compañía.
   * @returns Observable con la respuesta y la compañía encontrada.
   */
  public getCompany(
    userGenerator: string,
    companyId: string,
  ): Observable<FsResponseEntity<CompanyEntity>> {
    return this.http.get<FsResponseEntity<CompanyEntity>>(
      `${environment.frameSecApiUrl}/company/getCompany?companyName=${companyId}&userName=${userGenerator}`,
    );
  }

  /**
   * Agrega un permiso a una compañía específica.
   * @param userGenerator Usuario que realiza la acción.
   * @param companyId Identificador de la compañía.
   * @param permission Permiso a agregar.
   * @returns Observable con la respuesta del servidor.
   */
  public addPermissionToCompany(
    userGenerator: string,
    companyId: string,
    permission: string,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      `${environment.frameSecApiUrl}/company/addPermission?userName=${userGenerator}&companyName=${companyId}&permission=${permission}&ip=${ip}`,
      {},
    );
  }

  /**
   * Agrega una restricción a una compañía específica.
   * @param userGenerator Usuario que realiza la acción.
   * @param companyId Identificador de la compañía.
   * @param restriction Restricción a agregar.
   * @returns Observable con la respuesta del servidor.
   */
  public addRestrictionToCompany(
    userGenerator: string,
    companyId: string,
    restriction: string,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      `${environment.frameSecApiUrl}/company/addRestriction?userName=${userGenerator}&companyName=${companyId}&restriction=${restriction}&ip=${ip}`,
      {},
    );
  }

  /**
   * Obtiene la lista de permisos disponibles.
   * @param userGenerator Usuario que realiza la acción
   * @param companyName Nombre de la compañía.
   * @returns Observable con la respuesta y el listado de permisos.
   */
  public getPermissions(
    userGenerator: string,
    companyName: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      `${environment.frameSecApiUrl}/company/getPermissions?userName=${userGenerator}&companyName=${companyName}`,
    );
  }

  /**
   * Obtiene la lista de operaciones restringidas disponibles.
   * @param userGenerator Usuario que realiza la acción.
   * @param companyName Nombre de la compañía.
   * @returns Observable con la respuesta y el listado de operaciones restringidas.
   */
  public getRestrictedOperations(
    userGenerator: string,
    companyName: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      `${environment.frameSecApiUrl}/company/getRestrictions?userName=${userGenerator}&companyName=${companyName}`,
    );
  }
}
