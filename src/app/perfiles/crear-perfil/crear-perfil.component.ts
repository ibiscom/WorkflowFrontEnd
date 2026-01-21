import { Component } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { PerfilesComponent } from '../perfiles.component';
import { LoginEntity } from '../../login/login.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { PerfilesComponentInstanceService } from '../perfiles-component-instance.service';
import { PerfilesService } from '../perfiles.service';
import { CompanyEntity } from '../../entities/companies/company.entity';
import { UserEntity } from '../../entities/users/user.entity';
import { MessageUtil } from '../../utils/message.util';
import { Constants } from '../../utils/constants';
import { firstValueFrom } from 'rxjs';
import { ProfileEntity } from '../../entities/profiles/profile.entity';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CompaniasService } from '../../companias/companias.service';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { UserSearchFilterEntity } from '../../entities/users/user-search-filter.entity';

@Component({
  selector: 'fs-crear-perfil',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './crear-perfil.component.html',
  styleUrl: './crear-perfil.component.scss',
})
/**
 * Componente para crear y editar perfiles.
 * Gestiona el formulario, la carga de operaciones asociadas y restringidas,
 * y las acciones CRUD del perfil, así como la navegación.
 */
export class CrearPerfilComponent {
  public uc?: PerfilesComponent;
  public loggedUser?: LoginEntity;
  public nameN: string = '';
  public descriptionN: string = '';
  public operationE: string = '';
  public operationsList: string[] = [];
  public restrictedOperationsList: string[] = [];
  public profileIdEdit?: string;

  public constructor(
    private perfilesService: PerfilesService,
    private companiasService: CompaniasService,
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private perfilesComponentInstanceService: PerfilesComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.perfilesComponentInstanceService.getInstance();
  }

  public async ngOnInit(): Promise<void> {
    // Resetea mensaje y determina si está en modo edición.
    if (this.uc) {
      this.uc.mensaje = '';
    }
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Edit Mode On. Profile Id:', id);
    if (id) {
      this.profileIdEdit = id;
      await this.fillEditFields();
      this.getOperationsList();
      this.getRestrictedOperationsList();
    } else {
      this.profileIdEdit = undefined;
    }
  }

  /**
   * Carga los datos del perfil para edición.
   */
  public async fillEditFields(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.perfilesService.getProfile(
          this.loggedUser?.user_name ?? '',
          this.profileIdEdit ?? '',
        ),
      );
      if (response?.respuesta) {
        const profile = response.respuesta as ProfileEntity;
        this.nameN = profile.name ?? '';
        this.descriptionN = profile.description ?? '';
      }
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_PERFIL_DATOS,
          e,
        );
      }
    }
  }

  /**
   * Obtiene operaciones asociadas al perfil en edición.
   */
  public getOperationsList() {
    if (!this.editMode()) {
      this.operationsList = [];
      return;
    }

    this.operationsList = [];

    try {
      this.perfilesService
        .getOperationsByProfile(
          this.loggedUser?.user_name ?? '',
          this.profileIdEdit ?? '',
        )
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              const ops = response.respuesta as string[];
              this.operationsList.push(...ops);
            }
          },
          error: (e) => {
            if (this.uc) {
              // Corregido: 'contains' no existe en string de TS, usar 'includes'.
              if (
                !String(e?.error?.mensaje ?? '').includes(
                  'no tiene operaciones asociadas',
                )
              ) {
                this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                  Constants.ERR_PERFIL_OPERACIONES,
                  e,
                );
              }
            }
          },
        });
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje =
          error.status === 400
            ? ''
            : MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_PERFIL_OPERACIONES_ENCONTRAR,
                error,
              );
      }
    }
  }

  /**
   * Obtiene operaciones restringidas del perfil en edición.
   */
  public getRestrictedOperationsList() {
    if (!this.editMode()) {
      this.restrictedOperationsList = [];
      return;
    }

    this.restrictedOperationsList = [];

    try {
      this.perfilesService
        .getRestrictedOperationsByProfile(
          this.loggedUser?.user_name ?? '',
          this.profileIdEdit ?? '',
        )
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              const ops = response.respuesta as string[];
              this.restrictedOperationsList.push(...ops);
            }
          },
          error: (e) => {
            if (this.uc) {
              this.uc.mensaje =
                e.status === 400
                  ? ''
                  : MessageUtil.buildErrorMessageFsResponse(
                      Constants.ERR_PERFIL_OPERACIONES_RESTRINGIDAS,
                      e,
                    );
            }
          },
        });
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje =
          error.status === 400
            ? ''
            : MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_PERFIL_OPERACIONES_RESTRINGIDAS,
                error,
              );
      }
    }
  }

  /**
   * Indica si está en modo edición (cuando existe un id de perfil).
   */
  public editMode(): boolean {
    return this.profileIdEdit !== undefined && this.profileIdEdit !== '';
  }

  /**
   * Guarda el perfil; crea o edita según el modo actual.
   */
  public save() {
    if (!this.editMode()) {
      this.create();
    } else {
      this.edit();
    }
  }

  /**
   * Crea un perfil nuevo y navega a su edición.
   */
  public create() {
    this.perfilesService
      .createProfile({
        userName: this.loggedUser?.user_name ?? '',
        name: this.nameN,
        description: this.descriptionN,
      } as ProfileEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = '';
            }
            this.profileIdEdit = this.nameN;
            this.router.navigate([
              `/main-page/administrarPerfiles/editarPerfil?id=${this.nameN}`,
            ]);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_PERFIL_CREAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Edita el perfil actual y recarga la vista.
   */
  public edit() {
    this.perfilesService
      .editProfile({
        userName: this.loggedUser?.user_name ?? '',
        name: this.nameN,
        description: this.descriptionN,
      } as ProfileEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.router.navigate([
              `/main-page/administrarPerfiles/editarPerfil?id=${this.nameN}`,
            ]);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_PERFIL_EDITAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Agrega una operación al perfil.
   */
  public addOperationToProfile(event: MatSelectChange<any>) {
    const operation = event.value;
    this.perfilesService
      .addOperationToProfile(
        this.loggedUser?.user_name ?? '',
        this.profileIdEdit ?? '',
        operation,
      )
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.operationsList.push(operation);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_PERFIL_AGREGAR_OPERACION,
              e,
            );
          }
        },
      });
  }

  /**
   * Elimina una operación del perfil.
   */
  public remove(operation: string) {
    this.perfilesService
      .removeOperationFromProfile(
        this.loggedUser?.user_name ?? '',
        this.profileIdEdit ?? '',
        operation,
      )
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.operationsList = this.operationsList.filter(
              (op) => op !== operation,
            );
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_PERFIL_ELIMINAR_OPERACION,
              e,
            );
          }
        },
      });
  }

  /**
   * Elimina el perfil y navega al listado.
   */
  public delete() {
    this.perfilesService
      .deleteProfile(this.loggedUser?.user_name ?? '', this.profileIdEdit)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.router.navigate(['/main-page/administrarPerfiles']);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_PERFIL_ELIMINAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Cancela y vuelve al listado de perfiles.
   */
  public cancel() {
    if (this.uc) {
      this.uc.mensaje = '';
    }
    this.router.navigate(['/main-page/administrarPerfiles']);
  }

  /**
   * Comparadores para selects.
   */
  public compareCompanies(c1: CompanyEntity, c2: CompanyEntity): boolean {
    return c1.name === c2.name;
  }

  public compareSupervisors(s1: UserEntity, s2: UserEntity): boolean {
    return s1.name === s2.name;
  }
}
