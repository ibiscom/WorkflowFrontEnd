import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SesionesComponent } from '../sesiones.component';
import { LoginService } from '../../login/login.service';
import { LoginEntity } from '../../login/login.entity';
import { GetSessionsEntity } from '../../entities/sessions/get-sessions.entity';

@Component({
  selector: 'fs-filtros-busqueda-sesiones',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-sesiones.component.html',
  styleUrl: './filtros-busqueda-sesiones.component.scss',
})
export class FiltrosBusquedaSesionesComponent {
  /** Campos de filtro */
  public userNameF: string = '';
  public ipF: string = '';

  /** Componente padre */
  @Input() public sc?: SesionesComponent;

  /** Usuario autenticado */
  public loggedUser: LoginEntity | undefined;

  constructor(private loginService: LoginService) {}

  /**
   * Vincula el usuario logueado en el padre.
   */
  ngOnInit(): void {
    this.loggedUser = this.sc?.loggedUser;
  }

  /**
   * Ejecuta la búsqueda en el padre usando los filtros actuales.
   */
  public search(): void {
    this.sc?.loadSessions({
      userName: this.loggedUser?.user_name ?? '',
      userNameFilter: this.userNameF,
      userIpFilter: this.ipF,
      lastModifiedFilter: '',
    } as GetSessionsEntity);
  }

  /**
   * Limpia los filtros y vuelve a ejecutar la búsqueda sin criterios.
   */
  public limpiarFiltros(): void {
    this.userNameF = '';
    this.ipF = '';

    this.sc?.loadSessions({
      userName: this.loggedUser?.user_name ?? '',
      userNameFilter: '',
      userIpFilter: '',
      lastModifiedFilter: '',
    } as GetSessionsEntity);
  }
}
