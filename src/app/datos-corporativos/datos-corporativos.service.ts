import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { of } from 'rxjs';
import { CorporateDataEntity } from '../entities/corporate-data/corporate-data.entity';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para gestionar la configuración de datos corporativos.
 * Incluye métodos de consulta, guardado y obtención por identificador.
 */
export class DatosCorporativosService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  /**
   * Obtiene el listado de datos corporativos.
   * Actualmente devuelve información de prueba (dummy) para facilitar el desarrollo del frontend.
   * @returns Observable con la respuesta estándar y un arreglo de entidades de datos corporativos.
   */
  public getCorporateDataList(): Observable<
    FsResponseEntity<CorporateDataEntity[]>
  > {
    // Se colocan datos dummy para simular la respuesta del backend
    const dummyData: CorporateDataEntity[] = [
      {
        identifier: '1',
        user: 'admin',
        changeDate: '2025-09-27',
        userName: 'admin',
        ip: '192.168.1.1',
        headerName: 'Header Uno',
        wallpaperName: 'Wallpaper Uno',
        headerImage: 'header1.png',
        wallpaperImage: 'wall1.png',
      },
      {
        identifier: '2',
        user: 'user2',
        changeDate: '2025-09-26',
        userName: 'user2',
        ip: '192.168.1.2',
        headerName: 'Header Dos',
        wallpaperName: 'Wallpaper Dos',
        headerImage: 'header2.png',
        wallpaperImage: 'wall2.png',
      },
    ];

    const response: FsResponseEntity<CorporateDataEntity[]> = {
      codigo: 0,
      mensaje: 'OK',
      respuesta: dummyData,
    };
    return of(response);
  }

  /**
   * Guarda los datos corporativos generales en el servidor.
   * Implementación pendiente: por ahora solo registra en consola y retorna una respuesta simulada.
   * @param entity Entidad con los datos corporativos a almacenar.
   * @returns Observable con la respuesta del servidor.
   */
  public saveCorporateData(
    entity: CorporateDataEntity,
  ): Observable<FsResponseEntity<any>> {
    // TODO: Aquí se implementaría la lógica para guardar los datos generales
    console.log('Guardando datos generales:', entity);
    return of({
      codigo: 200,
      mensaje: 'OK',
      respuesta: 'Datos guardados correctamente',
    });
  }

  /**
   * Obtiene los datos corporativos por identificador.
   * Actualmente devuelve un registro de ejemplo basado en el ID recibido.
   * @param corporateDataIdEdit Identificador del registro de datos corporativos.
   * @returns Observable con la respuesta estándar y la entidad encontrada.
   */
  public getCorporateDataById(
    corporateDataIdEdit: string,
  ): Observable<FsResponseEntity<CorporateDataEntity>> {
    // Simular la obtención de datos de una entidad específica
    const dummyData: CorporateDataEntity = {
      identifier: corporateDataIdEdit,
      user: 'admin',
      changeDate: '2025-09-27',
      userName: 'admin',
      ip: '192.168.1.1',
      headerName: 'Header Uno',
      wallpaperName: 'Wallpaper Uno',
      headerImage: 'header1.png',
      wallpaperImage: 'wall1.png',
    };

    const response: FsResponseEntity<CorporateDataEntity> = {
      codigo: 0,
      mensaje: 'OK',
      respuesta: dummyData,
    };
    return of(response);
  }
}
