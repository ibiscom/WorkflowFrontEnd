import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SesionesService } from './sesiones.service';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { LoginEntity } from '../login/login.entity';
import { LoginService } from '../login/login.service';
import { SessionEntity } from '../entities/sessions/session.entity';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { SesionesComponentInstanceService } from './sesiones-component-instance.service';
import { GetSessionsEntity } from '../entities/sessions/get-sessions.entity';

@Component({
  selector: 'fs-sesiones',
  imports: [FormsModule, MatCardModule, RouterModule],
  templateUrl: './sesiones.component.html',
  styleUrl: './sesiones.component.scss',
})
/**
 * Administración de sesiones activas y configuración de tiempos máximos.
 */
export class SesionesComponent {
  public loggedUser: LoginEntity | undefined;
  public sessions: SessionEntity[] = [];
  public mensaje: string = '';
  public filters: GetSessionsEntity = {} as GetSessionsEntity;

  constructor(
    private sesionesService: SesionesService,
    private loginService: LoginService,
    private sesionesComponentInstanceService: SesionesComponentInstanceService,
    public router: Router,
  ) {}

  /**
   * Inicializa el componente y carga las sesiones según filtros iniciales.
   */
  ngOnInit() {
    this.sesionesComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.loggedUser = this.loginService.getLoggedUser();
    if (!this.loggedUser) {
      this.router.navigate(['/login']);
    } else {
      this.filters = {
        userName: this.loggedUser?.user_name ?? '',
        userNameFilter: '',
        userIpFilter: '',
        lastModifiedFilter: '',
      } as GetSessionsEntity;
      this.loadSessions();
    }
  }

  /**
   * Carga el listado de sesiones según filtros.
   */
  public loadSessions(filters?: GetSessionsEntity) {
    if (filters) this.filters = filters;
    this.sesionesService.getSessions(this.filters).subscribe({
      next: (response) => {
        this.sessions = response.respuesta;
      },
      error: (error) => {
        console.error('Error al cargar las sesiones:', error);
        this.mensaje = 'Error al cargar las sesiones.';
      },
    });
  }

  /**
   * Cierra una sesión específica y refresca el listado.
   */
  public async closeSession(session: SessionEntity) {
    try {
      let response = await this.sesionesService.closeSession(session);
      let srv_response: FsResponseEntity<any> = response;
      this.loadSessions();
      this.mensaje = `${srv_response.mensaje}. Se ha cerrado la sesión para el usuario ${session.userNameFilter}`;
    } catch (error: any) {
      console.log(error);
      let srv_response: FsResponseEntity<any> = error.error;
      console.log('Error al cerrar la sesión');
      console.log(srv_response);
      this.mensaje = `Error al cerrar la sesión: ${srv_response.codigo} - ${srv_response.mensaje}`;
    }
  }

  /**
   * Actualiza tiempos máximos de sesión y de cambio de contraseña.
   */
  public setMaxTimes(
    maxSessionTimeE: string,
    maxNoPasswordChangeTimeE: string,
  ) {
    this.sesionesService
      .setMaxTimes(
        this.loggedUser?.user_name ?? '',
        maxSessionTimeE,
        maxNoPasswordChangeTimeE,
      )
      .subscribe({
        next: (response) => {
          this.sessions = response.respuesta;
          this.mensaje = response.respuesta
            ? 'Tiempos máximos actualizados correctamente.'
            : 'No se pudo actualizar los tiempos máximos.';
        },
        error: (error) => {
          console.error('Error fetching sessions:', error);
          this.mensaje = 'Error al cargar las sesiones.';
        },
      });
  }
}
