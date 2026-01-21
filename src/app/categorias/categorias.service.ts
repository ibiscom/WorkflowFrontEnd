import { Injectable } from '@angular/core';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { CategoryEntity } from '../entities/categories/category.entity';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Obtiene la lista de categorías según el usuario y el nombre de la categoría.
   * @param userGenerator Usuario que realiza la consulta.
   * @param categoryName Nombre de la categoría a buscar.
   * @returns Observable con la respuesta y el listado de categorías.
   */
  public getCategories(
    userGenerator: string,
    categoryName: string,
  ): Observable<FsResponseEntity<CategoryEntity[]>> {
    return this.http.get<FsResponseEntity<CategoryEntity[]>>(
      environment.frameSecApiUrl +
        `/category/getCategories?userName=${userGenerator}&categoryName=${categoryName}`,
    );
  }

  /**
   * Obtiene la información de una categoría específica.
   * @param userGenerator Usuario que realiza la consulta.
   * @param categoryId Identificador de la categoría.
   * @returns Observable con la respuesta y la categoría encontrada.
   */
  public getCategory(
    userGenerator: string,
    categoryId: string,
  ): Observable<FsResponseEntity<CategoryEntity>> {
    return this.http.get<FsResponseEntity<CategoryEntity>>(
      environment.frameSecApiUrl +
        `/category/getCategory?userName=${userGenerator}&idCategory=${categoryId}`,
    );
  }

  /**
   * Obtiene las operaciones asociadas a una categoría.
   * @param userGenerator Usuario que realiza la consulta.
   * @param categoryId Identificador de la categoría.
   * @returns Observable con la respuesta y el listado de operaciones.
   */
  public getOperationsByCategory(
    userGenerator: string,
    categoryId: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/category/getOperations?userName=${userGenerator}&idCategory=${categoryId}`,
    );
  }

  /**
   * Obtiene las operaciones restringidas (no asociadas) a una categoría.
   * @param userGenerator Usuario que realiza la consulta.
   * @param categoryId Identificador de la categoría.
   * @returns Observable con la respuesta y el listado de operaciones restringidas.
   */
  public getRestrictedOperationsByCategory(
    userGenerator: string,
    categoryId: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/category/getNotOperations?userName=${userGenerator}&idCategory=${categoryId}`,
    );
  }

  /**
   * Agrega una operación a una categoría.
   * @param userGenerator Usuario que realiza la acción.
   * @param categoryId Identificador de la categoría.
   * @param operationName Nombre de la operación a agregar.
   * @returns Observable con la respuesta del servidor.
   */
  public addOperationToCategory(
    userGenerator: string,
    categoryId: string,
    operationName: string,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/category/addOperation?userName=${userGenerator}&categoryId=${categoryId}&idOperation=${operationName}&ip=${ip}`,
      {},
    );
  }

  /**
   * Elimina una operación de una categoría.
   * @param userGenerator Usuario que realiza la acción.
   * @param categoryId Identificador de la categoría.
   * @param operationName Nombre de la operación a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  public removeOperationOfCategory(
    userGenerator: string,
    categoryId: string,
    operationName: string,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/category/removeOperation?userName=${userGenerator}&categoryId=${categoryId}&idOperation=${operationName}&ip=${ip}`,
      {},
    );
  }

  /**
   * Crea una nueva categoría en el sistema.
   * @param category Entidad de la categoría a crear.
   * @returns Observable con la respuesta del servidor.
   */
  public createCategory(
    category: CategoryEntity,
  ): Observable<FsResponseEntity<any>> {
    return this.http.put<FsResponseEntity<any>>(
      environment.frameSecApiUrl + '/category/create',
      category,
    );
  }

  /**
   * Edita una categoría existente.
   * @param category Entidad de la categoría con los datos actualizados.
   * @returns Observable con la respuesta del servidor.
   */
  public editCategory(
    category: CategoryEntity,
  ): Observable<FsResponseEntity<any>> {
    return this.http.post<FsResponseEntity<any>>(
      environment.frameSecApiUrl + '/category/edit',
      category,
    );
  }

  /**
   * Elimina una categoría del sistema.
   * @param userGenerator Usuario que realiza la acción.
   * @param categoryName Nombre de la categoría a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  public deleteCategory(
    userGenerator: string,
    categoryName: string,
  ): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    return this.http.delete<FsResponseEntity<any>>(
      environment.frameSecApiUrl +
        `/category/delete?userName=${userGenerator}&categoryName=${categoryName}&ip=${ip}`,
    );
  }
}
