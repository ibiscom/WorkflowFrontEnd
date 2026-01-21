import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { AccionesUsuariosComponent } from './acciones-usuarios/acciones-usuarios.component';
import { Router, RouterModule } from '@angular/router';
import { UsuariosService } from './usuarios.service';
import { UserSearchFilterEntity } from '../entities/users/user-search-filter.entity';
import { UserEntity } from '../entities/users/user.entity';
import { LoginEntity } from '../login/login.entity';
import { LoginService } from '../login/login.service';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { UsuariosComponentInstanceService } from './usuarios-component-instance.service';
import { UserMassiveLoadRequestEntity } from '../entities/users/user-massive-load-request.entity';
import { FileUtil } from '../utils/file.util';

@Component({
  selector: 'fs-usuarios',
  imports: [MatCardModule, RouterModule, AccionesUsuariosComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
/**
 * Listado y acciones de usuarios.
 * Permite buscar, exportar reporte y carga masiva de usuarios.
 */
export class UsuariosComponent {
  public loggedUser: LoginEntity | undefined;
  public users: UserEntity[] = [];
  public mensaje: string = '';
  private archivoSubidoBase64: string = '';
  public selectedUsersForMassiveActions: string[] = [];

  constructor(
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private usuariosComponentInstanceService: UsuariosComponentInstanceService,
    public router: Router,
  ) {}

  /**
   * Inicializa el componente y realiza la primera búsqueda.
   */
  ngOnInit(): void {
    this.selectedUsersForMassiveActions = [];
    this.usuariosComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.searchUsers();
  }

  /**
   * Busca usuarios de acuerdo a los filtros proporcionados.
   */
  public searchUsers(
    userNameF?: string,
    groupF?: string,
    docTypeF?: string,
    docNumF?: string,
    nameF?: string,
    lastNameF?: string,
    statusF?: string,
    areaF?: string,
    companyF?: string,
    generateReportF?: boolean,
  ): void {
    try {
      this.mensaje = 'Buscando usuarios...';
      let userFilter: UserSearchFilterEntity = {
        userName: this.loggedUser?.user_name ?? '',
        name: userNameF ?? '',
        //group: groupF,
        documentType: docTypeF ?? '',
        documentNumber: docNumF ?? '',
        firstName: nameF ?? '',
        lastName: lastNameF ?? '',
        status: statusF ?? '',
        //area: areaF,
        company: companyF ?? '',

        //generateReport: generateReportF ?? false
      };
      this.usuariosService.searchUsers(userFilter).subscribe({
        next: (response) => {
          this.mensaje = '';
          if (response && response.respuesta) {
            this.users = response.respuesta;
            if (generateReportF === true) {
              this.usuariosService.getReport(userFilter).subscribe({
                next: (reportResponse) => {
                  if (reportResponse && reportResponse.respuesta) {
                    const reportBlobString = reportResponse.respuesta
                      .content as string;
                    this.openReportInNewTab(
                      reportBlobString,
                      reportResponse.respuesta.name,
                      reportResponse.respuesta.contentType,
                    );
                  } else {
                    this.mensaje += Constants.ERR_USUARIO_REPORTE_GENERAR;
                  }
                },
                error: (e: any) => {
                  this.mensaje += MessageUtil.buildErrorMessageFsResponse(
                    Constants.ERR_USUARIO_REPORTE_GENERAR,
                    e,
                  );
                },
              });
            }
          } else {
            this.users = [];
          }
        },
        error: (e: any) => {
          this.mensaje += MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_USUARIO_BUSCAR,
            e,
          );
          this.users = [];
        },
      });
    } catch (error: any) {
      this.mensaje += MessageUtil.buildErrorMessage(
        Constants.ERR_USUARIO_BUSCAR_ERROR,
        error,
      );
      this.users = [];
    }
  }

  /**
   * Abre el reporte devuelto por backend en una nueva pestaña.
   */
  public openReportInNewTab(
    blobBase64: string,
    fileName: string,
    mimeType: string,
  ): void {
    const byteCharacters = atob(blobBase64); // Decodifica base64
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const reportBlob = new Blob([byteArray], { type: mimeType });
    const blobUrl = URL.createObjectURL(reportBlob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName; // Asigna el nombre de archivo
    link.click();

    URL.revokeObjectURL(blobUrl); // limpieza opcional
  }

  /**
   * Envía archivo para carga masiva de usuarios.
   */
  public async cargarUsuariosMasivamente(event: Event): Promise<void> {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const archivo = inputElement.files[0];
      await FileUtil.convertToBase64File(archivo);
      let userMassiveLoadRequest: UserMassiveLoadRequestEntity = {
        userName: this.loggedUser?.user_name ?? '',
        name: archivo.name ?? '',
        contentType: archivo.type,
        content: this.archivoSubidoBase64,
        ip: (await this.loginService.getIPAddress()) ?? '',
      } as UserMassiveLoadRequestEntity;
      this.usuariosService
        .loadUsersMassively(userMassiveLoadRequest)
        .subscribe({
          next: (response) => {
            if (response && response.codigo === 200) {
              this.mensaje = 'Usuarios cargados correctamente.';
              this.ngOnInit();
            } else {
              this.mensaje =
                'Error al cargar los usuarios: ' + response.mensaje;
            }
          },
          error: (error) => {
            this.mensaje = 'Error al cargar los usuarios: ' + error.message;
          },
        });
      inputElement.value = ''; // Restablece el input
    }
  }

  public toggleMassiveActionsList(userName: string, checked: boolean) {
    if (
      this.selectedUsersForMassiveActions.indexOf(userName) !== -1 &&
      !checked
    ) {
      // Ya está seleccionado y se deselecciona
      this.selectedUsersForMassiveActions =
        this.selectedUsersForMassiveActions.filter((u) => u !== userName);
    } else if (
      this.selectedUsersForMassiveActions.indexOf(userName) === -1 &&
      checked
    ) {
      // No está seleccionado y se selecciona
      this.selectedUsersForMassiveActions.push(userName);
    }
  }

  public desactivarUsuarios(): void {
    this.usuariosService
      .massDeactivateUsers(this.selectedUsersForMassiveActions)
      .subscribe({
        next: (response) => {
          if (response && response.codigo === 200) {
            this.mensaje = 'Usuarios desactivados correctamente.';
            this.ngOnInit();
          } else {
            this.mensaje = MessageUtil.buildErrorMessage(
              Constants.ERR_USUARIO_DESACTIVAR_MASIVO,
              response.mensaje,
            );
          }
        },
        error: (error) => {
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_USUARIO_DESACTIVAR_MASIVO,
            error,
          );
        },
      });
  }
}
