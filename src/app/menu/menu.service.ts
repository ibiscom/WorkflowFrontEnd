import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  public getPermissionsFrame(): Observable<FsResponseEntity<string[]>> {
    const userName = this.cookieService.get('userName');
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/user/getPermissionsFrame?userGenerator=${userName}&userName=${userName}`,
    );
  }

  public getPermissions(): Observable<FsResponseEntity<string[]>> {
    const userName = this.cookieService.get('userName');
    return this.http.get<FsResponseEntity<string[]>>(
      environment.frameSecApiUrl +
        `/user/getPermissions?userGenerator=${userName}&userName=${userName}`,
    );
  }
}
