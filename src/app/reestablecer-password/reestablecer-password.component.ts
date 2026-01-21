import { Component } from '@angular/core';
import { NuevoPasswordComponent } from './nuevo-password/nuevo-password.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { LoginEntity } from '../login/login.entity';
import { ReestablecerPasswordService } from './reestablecer-password.service';
import { MessageUtil } from '../utils/message.util';
import { RestorePasswordEntity } from '../entities/passwords/restore-password.entity';

@Component({
  selector: 'fs-reestablecer-password',
  imports: [MatCardModule, RouterModule, NuevoPasswordComponent],
  templateUrl: './reestablecer-password.component.html',
  styleUrl: './reestablecer-password.component.scss',
})
/**
 * Componente raíz del módulo de reestablecimiento de contraseña.
 * Orquesta la llamada al servicio para ejecutar el cambio.
 */
export class ReestablecerPasswordComponent {
  public loggedUser?: LoginEntity;
  public mensaje: string = '';

  constructor(
    private reestablecerPasswordService: ReestablecerPasswordService,
  ) {}

  /**
   * Solicita el reestablecimiento de contraseña al servicio.
   * @param assignUniquePassword Indica si se debe generar una contraseña aleatoria única.
   * @param password Contraseña a asignar (si no es única).
   */
  public restorePassword(assignUniquePassword: boolean, password: string) {
    var restorePasswordEntity: RestorePasswordEntity = {
      isUniquePassword: assignUniquePassword,
      password: password,
    };
    this.reestablecerPasswordService
      .restorePassword(restorePasswordEntity)
      .subscribe({
        next: (response) => {
          this.mensaje = 'Password reestablecido con éxito';
        },
        error: (error) => {
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            'Error al reestablecer el password',
            error,
          );
        },
      });
  }
}
