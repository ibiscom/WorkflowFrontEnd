import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { LoginEntity } from '../login/login.entity';
import { AreaEntity } from '../entities/areas/area.entity';
import { MessageUtil } from '../utils/message.util';
import { AreasService } from './areas.service';

@Component({
  selector: 'app-areas',
  imports: [MatCardModule, RouterModule],
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.scss',
})
/**
 * Componente principal de Áreas: lista, crea y elimina áreas.
 */
export class AreasComponent {
  public mensaje?: string = '';
  public loggedUser: LoginEntity | undefined;
  public areas: AreaEntity[] = [];

  constructor(
    private areasService: AreasService,
    private loginService: LoginService,
  ) {}

  /**
   * Inicializa el componente y carga el listado de áreas.
   */
  public ngOnInit(): void {
    this.loggedUser = this.loginService?.getLoggedUser();
    this.getAreas();
  }

  /**
   * Obtiene el listado de áreas desde el servicio.
   */
  private getAreas() {
    this.areasService.getAreas(this.loggedUser?.user_name ?? '').subscribe({
      next: (response) => {
        this.areas = response.respuesta;
      },
      error: (error) => {
        console.error('Error al cargar las áreas:', error);
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          'Error al cargar las áreas.',
          error,
        );
      },
    });
  }

  /**
   * Crea una nueva área y recarga el listado.
   */
  public createArea(area: AreaEntity) {
    area.userName = this.loggedUser?.user_name ?? '';
    this.areasService.createArea(area).subscribe({
      next: (response) => {
        this.mensaje = 'Área creada exitosamente.';
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error al crear el área:', error);
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          'Error al crear el área.',
          error,
        );
      },
    });
  }

  /**
   * Elimina un área y recarga el listado.
   */
  public deleteArea(area: AreaEntity) {
    area.userName = this.loggedUser?.user_name ?? '';
    this.areasService.deleteArea(area).subscribe({
      next: (response) => {
        this.mensaje = 'Área eliminada exitosamente.';
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error al eliminar el área:', error);
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          'Error al eliminar el área.',
          error,
        );
      },
    });
  }
}
