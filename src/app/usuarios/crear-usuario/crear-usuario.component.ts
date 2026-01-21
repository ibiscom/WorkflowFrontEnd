import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsuariosService } from '../usuarios.service';
import { LoginService } from '../../login/login.service';
import { LoginEntity } from '../../login/login.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosComponent } from '../usuarios.component';
import { DocumentTypeEntity } from '../../entities/domains/document-type.entity';
import { MessageUtil } from '../../utils/message.util';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { UsuariosComponentInstanceService } from '../usuarios-component-instance.service';
import { StatusEntity } from '../../entities/domains/status.entity';
import { AreaEntity } from '../../entities/areas/area.entity';
import { CompanyEntity } from '../../entities/companies/company.entity';
import { GroupEntity } from '../../entities/groups/group.entity';
import { ProfileEntity } from '../../entities/profiles/profile.entity';
import { OperationEntity } from '../../entities/operations/operation.entity';
import { CreateUserEntity } from '../../entities/users/create-user.entity';
import { error } from 'node:console';
import { firstValueFrom } from 'rxjs';
import { CityEntity } from '../../entities/domains/geography/city.entity';
import { CountryEntity } from '../../entities/domains/geography/country.entity';
import { StateEntity } from '../../entities/domains/geography/state.entity';
import { GeografiaService } from '../../comunes/geografia.service';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'fs-crear-usuario',
  imports: [
    FormsModule,
    MatButton,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss',
})
/**
 * Componente para crear y editar usuarios.
 *
 * Gestiona el formulario de datos del usuario, la carga de catálogos,
 * las asociaciones de permisos, perfiles y grupos, así como las
 * restricciones de operaciones. Permite crear, editar y eliminar
 * usuarios, además de manejar la navegación entre pantallas.
 */
export class CrearUsuarioComponent {
  public userIdEdit: string | undefined;
  public userNameN: string | undefined;
  public docTypeN: string | undefined;
  public docNumberN: string | undefined;
  public nameN: string | undefined;
  public secondNameN: string | undefined;
  public firstLastNameN: string | undefined;
  public secondLastNameN: string | undefined;
  public emailN: string | undefined;
  public passwordN: string | undefined;
  public passwordConfirmationN: string | undefined;
  public descriptionN: string | undefined;
  public countryN: string | undefined;
  public stateN: string | undefined;
  public cityN: string | undefined;
  public phoneN: string | undefined;
  public addressN: string | undefined;
  public officeN: string | undefined;
  public titleN: string | undefined;
  public companyN: string | undefined;
  public areaN: string | undefined;
  public estadoN: string | undefined;
  public operationE: string | undefined;
  public profileE: string | undefined;
  public groupE: string | undefined;
  private loggedUser: LoginEntity | undefined;
  public uc?: UsuariosComponent;
  public documentTypesList: DocumentTypeEntity[] = [];
  public statusesList: StatusEntity[] = [];
  public areasList: AreaEntity[] = [];
  public companiesList: CompanyEntity[] = [];
  public restrictedGroupsList: GroupEntity[] = [];
  public groupsList: string[] = [];
  public profilesList: ProfileEntity[] = [];
  public operationsList: OperationEntity[] = [];
  public restrictedOperationsList: OperationEntity[] = [];
  public countriesList: CountryEntity[] = [] as CountryEntity[];
  public statesList: StateEntity[] = [] as StateEntity[];
  public citiesList: CityEntity[] = [] as CityEntity[];
  public selectedOperation: any;
  public countryObjectN?: CountryEntity;
  public stateObjectN?: StateEntity;
  public cityObjectN?: CityEntity;

  public constructor(
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private usuariosComponentInstanceService: UsuariosComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
    private geografiaService: GeografiaService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.usuariosComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el componente.
   * - Si encuentra parámetro 'id' en ruta, entra en modo edición y carga datos del usuario.
   * - En ambos casos, carga catálogos necesarios (documentos, estados, áreas, compañías y geográficos).
   */
  public async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Edit Mode On. User Id:', id);
    if (id) {
      this.userIdEdit = id;
      this.fillEditFields();
      await this.getGroupsList();
      await this.getRestrictedGroupsList();
      await this.getProfilesList();
      await this.getOperationsList();
      await this.getRestrictedOperationsList();
    } else {
      this.userIdEdit = undefined;
    }
    this.getDocumentTypesList();
    this.getStatusesList();
    this.getAreasList();
    this.getCompaniesList();
    await this.getCountriesList();
    await this.getStatesList();
    await this.getCitiesList();
  }

  /**
   * Llena los campos del formulario con la información del usuario a editar.
   * Muestra mensajes de error en caso de falla.
   */
  public async fillEditFields(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.usuariosService.getUser(
          this.loggedUser?.user_name ?? '',
          this.userIdEdit ?? '',
        ),
      );

      if (response?.respuesta) {
        const user = response.respuesta as CreateUserEntity;

        this.userNameN = user.name ?? '';
        this.docTypeN = user.documentType ?? '';
        this.docNumberN = user.documentNumber ?? '';
        this.nameN = user.firstName ?? '';
        this.secondNameN = user.secondName ?? '';
        this.firstLastNameN = user.lastName ?? '';
        this.secondLastNameN = user.secondLastName ?? '';
        this.emailN = user.email ?? '';
        this.passwordN = '';
        this.passwordConfirmationN = '';
        this.descriptionN = user.description ?? '';
        this.countryN = user.country ?? '';
        this.stateN = user.department ?? '';
        this.cityN = user.city ?? '';
        this.phoneN = user.phone ?? '';
        this.addressN = user.address ?? '';
        this.officeN = user.office ?? '';
        this.titleN = user.title ?? '';
        this.companyN = user.company ?? '';
        this.areaN = user.area ?? '';
        this.estadoN = user.status ?? '';
        this.profileE = await this.getProfileOfUser();
      }
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_USUARIO_DATOS,
          e,
        );
      }
    }
  }

  /**
   * Obtiene el perfil asociado al usuario en edición.
   * Retorna undefined si no tiene perfil o si hay error 400.
   */
  public async getProfileOfUser(): Promise<string | undefined> {
    try {
      const response = await firstValueFrom(
        this.usuariosService.getUserProfile(
          this.loggedUser?.user_name ?? '',
          this.userIdEdit ?? '',
        ),
      );

      if (response?.respuesta) {
        return response.respuesta;
      } else {
        return undefined;
      }
    } catch (e: any) {
      if (e.status === 400) {
        return undefined;
      }
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_USUARIO_PERFIL_ENCONTRAR,
          e,
        );
        return undefined;
      }
    }
    return undefined;
  }

  /**
   * Agrega una restricción de operación al usuario en edición.
   * @param arg0 Operación a restringir.
   */
  public restrict(arg0: OperationEntity | undefined) {
    try {
      this.usuariosService
        .addRestrictionToUser(
          this.loggedUser?.user_name ?? '',
          this.userIdEdit ?? '',
          arg0?.name ?? '',
        )
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.ngOnInit();
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_USUARIO_RESTRINGIR_OPERACION,
                e,
              );
            }
          },
        });
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_USUARIO_ASOCIAR_PERMISO,
          e,
        );
      }
    }
  }

  /**
   * Indica si el componente se encuentra en modo edición.
   */
  public editMode(): boolean {
    return this.userIdEdit !== undefined && this.userIdEdit !== '';
  }

  /**
   * Guarda el usuario: crea o edita según el modo actual.
   */
  public save() {
    if (!this.editMode()) {
      this.create();
    } else {
      this.edit();
    }
  }

  /**
   * Crea un nuevo usuario a partir del formulario actual.
   * Muestra mensaje de éxito o error y navega a la pantalla de edición del nuevo usuario.
   */
  public create() {
    this.usuariosService
      .createUser({
        userName: this.loggedUser?.user_name,
        name: this.userNameN ?? '',
        documentType: this.docTypeN ?? '',
        documentNumber: this.docNumberN ?? '',
        firstName: this.nameN ?? '',
        secondName: this.secondNameN ?? '',
        firstLastName: this.firstLastNameN ?? '',
        secondLastName: this.secondLastNameN ?? '',
        email: this.emailN ?? '',
        password: this.passwordN ?? '',
        passwordConfirmation: this.passwordConfirmationN ?? '',
        description: this.descriptionN ?? '',
        country: this.countryN ?? '',
        state: this.stateN ?? '',
        city: this.cityN ?? '',
        phone: this.phoneN ?? '',
        address: this.addressN ?? '',
        office: this.officeN ?? '',
        title: this.titleN ?? '',
        company: this.companyN ?? '',
        area: this.areaN ?? '',
        status: this.estadoN ?? '',
        operation: this.operationE,
        profile: this.profileE,
        group: this.groupE,
      } as CreateUserEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = 'Usuario creado correctamente.';
              this.userIdEdit = this.userNameN;
              this.ngOnInit();
            }
            // Navegar a la lista de usuarios o realizar otra acción
            this.router.navigate([
              `/main-page/administrarUsuarios/crearUsuario/${this.userIdEdit}`,
            ]);
          } else {
            if (this.uc) {
              this.uc.mensaje = Constants.ERR_USUARIO_CREAR;
            }
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_USUARIO_CREAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Edita el usuario existente con los valores del formulario.
   * Muestra mensajes y retorna al listado tras editar.
   */
  public edit() {
    this.usuariosService
      .editUser({
        userName: this.loggedUser?.user_name,
        name: this.userNameN ?? '',
        documentType: this.docTypeN ?? '',
        documentNumber: this.docNumberN ?? '',
        firstName: this.nameN ?? '',
        secondName: this.secondNameN ?? '',
        firstLastName: this.firstLastNameN ?? '',
        secondLastName: this.secondLastNameN ?? '',
        email: this.emailN ?? '',
        password: this.passwordN ?? '',
        passwordConfirmation: this.passwordConfirmationN ?? '',
        description: this.descriptionN ?? '',
        country: this.countryN ?? '',
        state: this.stateN ?? '',
        city: this.cityN ?? '',
        phone: this.phoneN ?? '',
        address: this.addressN ?? '',
        office: this.officeN ?? '',
        title: this.titleN ?? '',
        company: this.companyN ?? '',
        area: this.areaN ?? '',
        status: this.estadoN ?? '',
        operation: this.operationE,
        profile: this.profileE,
        ideGroup: this.groupE,
      } as CreateUserEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = 'Usuario editado correctamente.';
              this.userIdEdit = this.userNameN;
            }
            this.router.navigate(['/main-page/administrarUsuarios']);
          } else {
            if (this.uc) {
              this.uc.mensaje = Constants.ERR_USUARIO_EDITAR;
            }
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_USUARIO_EDITAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Elimina el usuario actualmente en edición.
   * Tras eliminar, navega al listado de usuarios.
   */
  public delete() {
    this.usuariosService
      .deleteUser(this.loggedUser?.user_name ?? '', this.userIdEdit ?? '')
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = 'Usuario eliminado correctamente.';
            }
            this.router.navigate(['/main-page/administrarUsuarios']);
          } else {
            if (this.uc) {
              this.uc.mensaje = Constants.ERR_USUARIO_ELIMINAR;
            }
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_USUARIO_ELIMINAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Cancela la operación actual y regresa al listado de usuarios.
   */
  public cancel() {
    this.router.navigate(['/main-page/administrarUsuarios/listadoUsuarios']);
  }

  /**
   * Obtiene el listado de tipos de documento para el formulario.
   */
  public getDocumentTypesList(): void {
    try {
      this.documentTypesList = [];
      this.usuariosService
        .getDocumentTypesList(this.loggedUser?.user_name ?? '')
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.documentTypesList =
                response.respuesta as DocumentTypeEntity[];
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_USUARIO_TIPOS_DOCUMENTO,
                e,
              );
            }
          },
        });
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessage(
          Constants.ERR_USUARIO_TIPOS_DOCUMENTO_LISTADO,
          error,
        );
      }
    }
  }

  /**
   * Obtiene el listado de estados del usuario.
   */
  public getStatusesList(): void {
    try {
      this.statusesList = [];
      this.usuariosService
        .getStatusesList(this.loggedUser?.user_name ?? '')
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              if (this.uc) {
                this.statusesList = response.respuesta as StatusEntity[];
              }
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_USUARIO_ESTADOS,
                e,
              );
            }
          },
        });
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessage(
          Constants.ERR_USUARIO_ESTADOS_LISTADO,
          error,
        );
      }
    }
  }

  /**
   * Obtiene el listado de áreas disponibles.
   */
  public getAreasList(): void {
    try {
      this.areasList = [];
      this.usuariosService
        .getAreasList(this.loggedUser?.user_name ?? '')
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.areasList = response.respuesta as AreaEntity[];
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_USUARIO_AREAS,
                e,
              );
            }
          },
        });
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessage(
          Constants.ERR_USUARIO_AREAS_LISTADO,
          error,
        );
      }
    }
  }

  /**
   * Obtiene el listado de compañías disponibles.
   */
  public getCompaniesList(): void {
    try {
      this.companiesList = [];
      this.usuariosService
        .getCompaniesList(this.loggedUser?.user_name ?? '')
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.companiesList = response.respuesta as CompanyEntity[];
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_USUARIO_TIPOS_DOCUMENTO,
                e,
              );
            }
          },
        });
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessage(
          Constants.ERR_USUARIO_TIPOS_DOCUMENTO_LISTADO,
          error,
        );
      }
    }
  }

  /**
   * Obtiene los grupos a los que pertenece el usuario en edición.
   */
  public async getGroupsList(): Promise<void> {
    try {
      this.groupsList = [];
      const response = await firstValueFrom(
        this.usuariosService.getGroupsOfUserList(
          this.loggedUser?.user_name ?? '',
          this.userIdEdit ?? '',
        ),
      );

      if (response?.respuesta) {
        this.groupsList = response.respuesta as string[];
      }
    } catch (e: any) {
      if (this.uc) {
        if (e?.error?.mensaje !== Constants.ERR_NOUSERGROUPS_FOUND) {
          this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
            'No se pudo encontrar los grupos',
            e,
          );
        } else {
          console.log('No se pudo encontrar los grupos', e);
        }
      }
    }
  }

  /**
   * Obtiene los grupos disponibles para asociar (excluye los ya asociados al usuario).
   */
  public async getRestrictedGroupsList(): Promise<void> {
    try {
      this.restrictedGroupsList = [];
      const response = await firstValueFrom(
        this.usuariosService.getGroupsList(this.loggedUser?.user_name ?? ''),
      );
      const grps = (response?.respuesta as GroupEntity[]) ?? [];
      this.restrictedGroupsList = grps.filter(
        (group) => this.groupsList.findIndex((gr) => gr === group.name) < 0,
      );
    } catch (e: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          'No se pudo encontrar los grupos',
          e,
        );
        this.restrictedGroupsList = [];
      }
    }
  }

  /**
   * Obtiene el listado de perfiles disponibles.
   */
  public async getProfilesList(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.usuariosService.getProfilesList(this.loggedUser?.user_name ?? ''),
      );

      if (response?.respuesta) {
        this.profilesList = response.respuesta as ProfileEntity[];
      }
    } catch (e: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          'No se pudo encontrar los perfiles',
          e,
        );
      }
    }
  }

  /**
   * Obtiene el conjunto total de operaciones que aplican al usuario
   * (propias, por perfil y por grupos), eliminando duplicados.
   */
  public async getOperationsList(): Promise<void> {
    if (!this.editMode()) {
      this.operationsList = [];
      return;
    }

    this.operationsList = [];

    try {
      // Operaciones de usuario
      try {
        const response = await firstValueFrom(
          this.usuariosService.getOperationsList(
            this.loggedUser?.user_name ?? '',
            this.userIdEdit ?? '',
          ),
        );
        const ops = response?.respuesta ?? [];
        const arr = ops.map(
          (op: any) => ({ name: op, description: op }) as OperationEntity,
        );
        this.operationsList.push(...arr);
        this.operationsList = this.removeDuplicates(this.operationsList);
      } catch (e: any) {
        if (this.uc) {
          this.uc.mensaje =
            e.status === 400
              ? ''
              : MessageUtil.buildErrorMessageFsResponse(
                  'No se pudo encontrar las operaciones',
                  e,
                );
        }
      }

      // Operaciones de perfil
      if (this.profileE && this.profileE !== '') {
        try {
          const response = await firstValueFrom(
            this.usuariosService.getOperationsByProfile(
              this.profileE ?? '',
              this.loggedUser?.user_name ?? '',
            ),
          );
          const ops = response?.respuesta ?? [];
          const arr = ops.map(
            (op: any) => ({ name: op, description: op }) as OperationEntity,
          );
          this.operationsList.push(...arr);
          this.operationsList = this.removeDuplicates(this.operationsList);
        } catch (e: any) {
          if (this.uc) {
            this.uc.mensaje =
              e.status === 400
                ? ''
                : MessageUtil.buildErrorMessageFsResponse(
                    'No se pudo encontrar las operaciones del perfil',
                    e,
                  );
          }
        }
      }

      // Operaciones de grupo (secuencialmente)
      for (const group of this.groupsList) {
        try {
          const response = await firstValueFrom(
            this.usuariosService.getOperationsByGroup(
              group ?? '',
              this.loggedUser?.user_name ?? '',
            ),
          );
          const ops = response?.respuesta ?? [];
          const arr = ops.map(
            (op: any) => ({ name: op, description: op }) as OperationEntity,
          );
          this.operationsList.push(...arr);
          this.operationsList = this.removeDuplicates(this.operationsList);
        } catch (e: any) {
          if (this.uc) {
            this.uc.mensaje =
              e.status === 400
                ? ''
                : MessageUtil.buildErrorMessageFsResponse(
                    'No se pudo encontrar los perfiles',
                    e,
                  );
          }
        }
      }
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessage(
          'Error al obtener el listado de perfiles',
          error,
        );
      }
    }
  }

  /**
   * Obtiene el listado de operaciones restringidas del usuario.
   */
  public async getRestrictedOperationsList(): Promise<void> {
    if (!this.editMode()) {
      this.restrictedOperationsList = [];
      return;
    }

    this.restrictedOperationsList = [];

    try {
      const response = await firstValueFrom(
        this.usuariosService.getRestrictedOperationsList(
          this.loggedUser?.user_name ?? '',
          this.userIdEdit ?? '',
        ),
      );

      const ops: string[] = response?.respuesta ?? ([] as string[]);
      const mapped = ops.map(
        (op) =>
          ({
            name: op,
            description: op,
          }) as OperationEntity,
      );

      this.restrictedOperationsList.push(...mapped);
    } catch (e: any) {
      if (this.uc) {
        this.uc.mensaje =
          e.status === 400
            ? ''
            : MessageUtil.buildErrorMessageFsResponse(
                'No se pudo encontrar los perfiles',
                e,
              );
      }
    }
  }

  /**
   * Asocia un permiso (operación) al usuario.
   * @param event Evento del select con la operación a asociar.
   */
  public addPermissionToUser(event: MatSelectChange) {
    try {
      this.usuariosService
        .addPermissionToUser(
          this.loggedUser?.user_name ?? '',
          this.userIdEdit ?? '',
          event.value,
        )
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.ngOnInit();
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                'No se pudo asociar el permiso al usuario',
                e,
              );
            }
          },
        });
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          'No se pudo asociar el permiso al usuario',
          e,
        );
      }
    }
  }

  /**
   * Asigna un perfil al usuario.
   * @param event Evento del select con el perfil seleccionado.
   */
  public assignProfileToUser(event: MatSelectChange) {
    try {
      if (event.value !== undefined) {
        this.usuariosService
          .assignProfileToUser(
            this.loggedUser?.user_name ?? '',
            this.userIdEdit ?? '',
            event.value,
          )
          .subscribe({
            next: (response) => {
              if (response && response.respuesta) {
                this.ngOnInit();
              }
            },
            error: (e: any) => {
              if (this.uc) {
                this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                  'No se pudo asignar el perfil al usuario',
                  e,
                );
              }
            },
          });
      }
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          'No se pudo asociar el permiso al usuario',
          e,
        );
      }
    }
  }

  /**
   * Agrega un grupo al usuario.
   * @param event Evento del select con el grupo seleccionado.
   */
  public addGroupToUser(event: MatSelectChange) {
    try {
      this.usuariosService
        .addGroupToUser(
          this.loggedUser?.user_name ?? '',
          this.userIdEdit ?? '',
          event.value,
        )
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.ngOnInit();
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                'No se pudo agregar el grupo al usuario',
                e,
              );
            }
          },
        });
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          'No se pudo agregar el grupo al usuario',
          e,
        );
      }
    }
  }

  /**
   * Elimina un grupo del usuario.
   * @param group Nombre del grupo a eliminar.
   */
  public removeGroup(group: string) {
    try {
      this.usuariosService
        .removeGroupToUser(
          this.loggedUser?.user_name ?? '',
          this.userIdEdit ?? '',
          group,
        )
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.ngOnInit();
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                'No se pudo eliminar el grupo al usuario',
                e,
              );
            }
          },
        });
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          'No se pudo eliminar el grupo al usuario',
          e,
        );
      }
    }
  }

  private async getCountriesList(): Promise<void> {
    try {
      this.countriesList = [];
      const response = await firstValueFrom(
        this.geografiaService.getCountriesList(),
      );
      if (response?.respuesta) {
        this.countriesList = response.respuesta;
        if (this.countryN) {
          this.countryObjectN = this.countriesList.find(
            (country) => country.name === this.countryN,
          );
        }
      }
    } catch (e: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          'No se pudo encontrar los países',
          e,
        );
      }
    }
  }
  private async getStatesList(): Promise<void> {
    try {
      this.statesList = [];
      if (this.countryObjectN) {
        const response = await firstValueFrom(
          this.geografiaService.getStatesOfCountryList(
            this.countryObjectN?.ide ?? '',
          ),
        );
        if (response?.respuesta) {
          this.statesList = response.respuesta as StateEntity[];
          if (this.stateN) {
            this.stateObjectN = this.statesList.find(
              (state) => state.name === this.stateN,
            );
          }
        }
      }
    } catch (e: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          'No se pudo encontrar los departamentos',
          e,
        );
      }
    }
  }
  private async getCitiesList(): Promise<void> {
    try {
      this.citiesList = [];
      if (this.stateObjectN) {
        const response = await firstValueFrom(
          this.geografiaService.getCitiesOfStateList(
            this.stateObjectN?.code ?? '',
          ),
        );
        if (response?.respuesta) {
          this.citiesList = response.respuesta;
          if (this.cityN) {
            this.cityObjectN = this.citiesList.find(
              (city) => city.name === this.cityN,
            );
          }
        }
      }
    } catch (e: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          'No se pudo encontrar las ciudades',
          e,
        );
      }
    }
  }

  /**
   * Maneja el cambio de país y recarga los departamentos correspondientes.
   */
  public async onCountryChangeEvent($event: MatSelectChange<CountryEntity>) {
    this.countryN = $event.value?.name ?? '';
    this.countryObjectN = $event.value;
    await this.getStatesList();
  }

  /**
   * Maneja el cambio de departamento y recarga las ciudades correspondientes.
   */
  public async onStateChangeEvent($event: MatSelectChange<StateEntity>) {
    this.stateN = $event.value?.name ?? '';
    this.stateObjectN = $event.value;
    await this.getCitiesList();
  }

  /**
   * Maneja el cambio de ciudad seleccionada.
   */
  public onCityChangeEvent($event: MatSelectChange<CityEntity>) {
    this.cityN = $event.value?.name ?? '';
    this.cityObjectN = $event.value;
  }

  /**
   * Compara países para selects.
   */
  public compareCountries(a: CountryEntity, b: CountryEntity): boolean {
    return a && b ? a.ide === b.ide && a.name === b.name : a === b;
  }

  /**
   * Compara ciudades para selects.
   */
  public compareCities(a: CityEntity, b: CityEntity): boolean {
    return a && b ? a.code === b.code && a.name === b.name : a === b;
  }

  /**
   * Compara departamentos para selects.
   */
  public compareStates(a: StateEntity, b: StateEntity): boolean {
    return a && b ? a.ide === b.ide && a.name === b.name : a === b;
  }

  /**
   * Elimina elementos duplicados de un arreglo manteniendo el orden.
   */
  public removeDuplicates<T>(arr: T[]): T[] {
    return [...new Set(arr)];
  }
}
