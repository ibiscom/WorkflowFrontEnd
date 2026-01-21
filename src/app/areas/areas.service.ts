import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AreaEntity } from '../entities/areas/area.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para administrar Áreas: consulta, creación y eliminación.
 */
export class AreasService {
  public constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Obtiene el listado de áreas visibles para el usuario.
   */
  public getAreas(
    userGenerator: string,
  ): Observable<FsResponseEntity<AreaEntity[]>> {
    return this.http.get<FsResponseEntity<AreaEntity[]>>(
      `${environment.frameSecApiUrl}/area/getAll?userName=${userGenerator}`,
    );
  }

  /**
   * Crea un área.
   */
  public createArea(area: AreaEntity): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    area.ip = ip;
    return this.http.put<FsResponseEntity<any>>(
      `${environment.frameSecApiUrl}/area/create`,
      area,
    );
  }

  /**
   * Elimina un área.
   */
  public deleteArea(area: AreaEntity): Observable<FsResponseEntity<any>> {
    let ip: string = this.cookieService.get('ip');
    area.ip = ip;
    return this.http.delete<FsResponseEntity<any>>(
      `${environment.frameSecApiUrl}/area/delete?userName=${area.userName}&ip=${area.ip}&areaName=${area.name}`,
      {},
    );
  }
}
