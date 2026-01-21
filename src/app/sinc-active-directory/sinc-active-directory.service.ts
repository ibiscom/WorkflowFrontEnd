import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para interactuar con el backend de sincronización de Active Directory.
 */
export class SincActiveDirectoryService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Ejecuta la sincronización con Active Directory.
   * @param userGenerator Usuario que dispara el proceso.
   * @param importAllUsersS Indica si se importan todos los usuarios.
   * @param groupS Grupo específico a sincronizar cuando no se importan todos.
   */
  public synchronizeWithActiveDirectory(
    userGenerator: string,
    importAllUsersS: boolean,
    groupS: string,
  ): Observable<FsResponseEntity<string[]>> {
    return this.http.post<FsResponseEntity<string[]>>(
      `${environment.frameSecApiUrl}/activeDirectory/synchronize?userName=${userGenerator}&importAll=${importAllUsersS}&group=${groupS}`,
      {},
    );
  }
}
