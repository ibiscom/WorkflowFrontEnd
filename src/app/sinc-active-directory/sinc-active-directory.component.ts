import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { LoginEntity } from '../login/login.entity';
import { LoginService } from '../login/login.service';
import { SincActiveDirectoryService } from './sinc-active-directory.service';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { response } from 'express';

@Component({
  selector: 'app-sinc-active-directory',
  imports: [MatCardModule, RouterModule],
  templateUrl: './sinc-active-directory.component.html',
  styleUrl: './sinc-active-directory.component.scss',
})
/**
 * Componente principal para la sincronización con Active Directory.
 */
export class SincActiveDirectoryComponent {
  public mensaje: string = '';
  public loggedUser: LoginEntity | undefined;
  public activeDirectoryLog?: string;

  constructor(
    private sincActiveDirectoryService: SincActiveDirectoryService,
    private loginService: LoginService,
  ) {}

  /**
   * Inicializa el componente obteniendo el usuario autenticado.
   */
  ngOnInit(): void {
    this.loggedUser = this.loginService?.getLoggedUser();
  }

  /**
   * Ejecuta el proceso de sincronización con Active Directory y muestra el log devuelto.
   * @param importAllUsersS Si es verdadero, importa todos los usuarios; de lo contrario, solo el grupo indicado.
   * @param groupS Nombre del grupo a sincronizar cuando no se importan todos los usuarios.
   */
  public synchronize(importAllUsersS: boolean, groupS: string) {
    this.activeDirectoryLog = '';
    let userGenerator = this.loggedUser ? this.loggedUser.user_name : '';
    this.sincActiveDirectoryService
      .synchronizeWithActiveDirectory(userGenerator, importAllUsersS, groupS)
      .subscribe({
        next: (response) => {
          if (response.respuesta && response.respuesta.length == 0) {
            this.activeDirectoryLog =
              'Se ejecutó el proceso, sin respuesta del servidor.';
          } else {
            response.respuesta.forEach((element) => {
              this.activeDirectoryLog += element + '<br/>';
            });
          }
        },
        error: (error) => {
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_SINC_ACTIVE_DIRECTORY,
            error,
          );
        },
      });
  }
}
