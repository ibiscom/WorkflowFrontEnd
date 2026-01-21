import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { CityEntity } from '../entities/domains/geography/city.entity';
import { CountryEntity } from '../entities/domains/geography/country.entity';
import { StateEntity } from '../entities/domains/geography/state.entity';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

/**
 * Servicio para la gestión de información geográfica en el sistema.
 * Permite consultar países, departamentos/estados y ciudades.
 */
@Injectable({
  providedIn: 'root',
})
export class GeografiaService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Obtiene la lista de países disponibles.
   * @returns Observable con la respuesta y el listado de países.
   */
  public getCountriesList(): Observable<FsResponseEntity<CountryEntity[]>> {
    return this.http.get<FsResponseEntity<CountryEntity[]>>(
      `${environment.frameSecApiUrl}/parameter/getCountrys`,
    );
  }

  /**
   * Obtiene la lista de departamentos/estados de un país.
   * @param ideCountry Identificador del país.
   * @returns Observable con la respuesta y el listado de departamentos/estados.
   */
  public getStatesOfCountryList(
    ideCountry: string,
  ): Observable<FsResponseEntity<StateEntity[]>> {
    return this.http.get<FsResponseEntity<StateEntity[]>>(
      `${environment.frameSecApiUrl}/parameter/getDepartments?ideCountry=${ideCountry}`,
    );
  }

  /**
   * Obtiene la lista de ciudades de un departamento/estado.
   * @param ideDepartment Identificador del departamento/estado.
   * @returns Observable con la respuesta y el listado de ciudades.
   */
  public getCitiesOfStateList(
    ideDepartment: string,
  ): Observable<FsResponseEntity<CityEntity[]>> {
    return this.http.get<FsResponseEntity<CityEntity[]>>(
      `${environment.frameSecApiUrl}/parameter/getCitys?ideDepartment=${ideDepartment}`,
    );
  }
}
