import { Component } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { HerramientaComponent } from '../herramienta.component';
import { LoginEntity } from '../../login/login.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { HerramientaComponentInstanceService } from '../herramienta-component-instance.service';
import { HerramientaService } from '../herramienta.service';
import { UserEntity } from '../../entities/users/user.entity';
import { MessageUtil } from '../../utils/message.util';
import { Constants } from '../../utils/constants';
import { firstValueFrom } from 'rxjs';
import { GroupEntity } from '../../entities/groups/group.entity';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CompaniasService } from '../../companias/companias.service';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { UserSearchFilterEntity } from '../../entities/users/user-search-filter.entity';
import { HerramientasEntity } from '../herramientas.entity';

@Component({
  selector: 'ibpm-crear-herramienta',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './crear-herramienta.component.html',
  styleUrl: './crear-herramienta.component.scss',
})
/**
 * Componente para la creación y edición de grupos.
 * Permite seleccionar compañía, supervisor y administrar permisos/restricciones.
 */
export class CrearHerramientaComponent {
  public uc?: HerramientaComponent;
  public loggedUser?: LoginEntity;
  public nameN: string = '';
  public descriptionN: string = '';
  public estadoN: string = '';
  public herramientasObjectN?: HerramientasEntity;
  public supervisorN: string = '';
  public operationE: string = '';
  public operationsList: string[] = [];
  public restrictedOperationsList: string[] = [];
  public supervisorsList: UserEntity[] = [];
  public herramientaIdEdit?: string;
  public supervisorObjectN?: UserEntity;
  public herramientasList: string[] = [];
herramienta: any;

  public constructor(
    private herramientaService: HerramientaService,
    private companiasService: CompaniasService,
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private herramientaComponentInstanceService: HerramientaComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.herramientaComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el formulario, carga listas y detecta modo de edición.
   */
  public async ngOnInit(): Promise<void> {
    if (this.uc) {
      this.uc.mensaje = '';
    }
    this.getEstadoList();
    this.getSupervisorsList();
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Edit Mode On. Group Id:', id);
    if (id) {
      this.herramientaIdEdit = id;
      await this.fillEditFields();
      this.getOperationsList();
      this.getRestrictedOperationsList();
    } else {
      this.herramientaIdEdit = undefined;
    }
  }

  /**
   * Carga la lista de supervisores disponibles.
   */
  public getSupervisorsList() {
    /*
    let filter: UserSearchFilterEntity = {
      userName: this.loggedUser?.user_name ?? '',
      status: 'Activo',
    };
    this.usuariosService.searchUsers(filter).subscribe({
      next: (response) => {
        if (response && response.respuesta) {
          this.supervisorsList = response.respuesta as UserEntity[];
        }
      },
      error: (e) => {
        if (this.uc) {
          this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_GRUPO_SUPERVISORES,
            e,
          );
        }
      },
    });
    */
  }

  /**
   * Carga la lista de compañías disponibles para selección.
   */
  public getEstadoList() {
    /*
    this.companiesList = [];
    this.companiasService
      .getAllCompanies(this.loggedUser?.user_name ?? '')
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.companiesList = response.respuesta as CompanyEntity[];
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_GRUPO_COMPANIAS,
              e,
            );
          }
        },
      });
      */
  }

  /**
   * Llena los campos del formulario con la información del grupo en edición.
   */
  public async fillEditFields(): Promise<void> {
    /*
    try {
      const response = await firstValueFrom(
        this.gruposService.getGroup(
          this.loggedUser?.user_name ?? '',
          this.groupIdEdit ?? '',
        ),
      );
      if (response?.respuesta) {
        const group = response.respuesta as GroupEntity;
        this.nameN = group.name ?? '';
        this.descriptionN = group.description ?? '';
        this.companyN = group.company ?? '';
        this.companyObjectN = this.companiesList.find(
          (c) => c.name === this.companyN,
        );
        this.supervisorN = group.supervisor ?? '';
        this.supervisorObjectN = this.supervisorsList.find(
          (s) => s.name === this.supervisorN,
        );
      }
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_GRUPO_DATOS,
          e,
        );
      }
    }
      */
  }

  /**
   * Consulta las operaciones asociadas al grupo.
   */
  public getOperationsList() {
    /*
    if (!this.editMode()) {
      this.operationsList = [];
      return;
    }

    this.operationsList = [];

    try {
      this.workflowService
        .getOperationsByGroup(
          this.loggedUser?.user_name ?? '',
          this.workflowIdEdit ?? '',
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
              if (
                !String(e.error.mensaje).includes(
                  'no tiene operaciones asociadas',
                )
              ) {
                this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                  Constants.ERR_GRUPO_OPERACIONES,
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
                Constants.ERR_GRUPO_OPERACIONES_ENCONTRAR,
                error,
              );
      }
    }
      */
  }

  /**
   * Consulta las operaciones restringidas (no permitidas) del grupo.
   */
  public getRestrictedOperationsList() {
    /*
    if (!this.editMode()) {
      this.restrictedOperationsList = [];
      return;
    }

    this.restrictedOperationsList = [];

    try {
      this.workflowService
        .getRestrictedOperationsByGroup(
          this.loggedUser?.user_name ?? '',
          this.workflowIdEdit ?? '',
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
                      Constants.ERR_GRUPO_OPERACIONES_RESTRINGIDAS,
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
                Constants.ERR_GRUPO_OPERACIONES_RESTRINGIDAS,
                error,
              );
      }
    }
      */
  }

  /**
   * Indica si está en modo edición.
   */
  public editMode(): boolean {
    return this.herramientaIdEdit !== undefined && this.herramientaIdEdit !== '';
  }

  /**
   * Maneja el cambio de compañía seleccionada.
   */
  public onEstadoChange(event: MatSelectChange<HerramientasEntity>) {
    this.herramientasObjectN = event.value;
    this.estadoN = event.value?.nombre ?? '';
  }

  /**
   * Guarda los cambios, creando o editando el grupo según corresponda.
   */
  public save() {
    if (!this.editMode()) {
      this.create();
    } else {
      this.edit();
    }
  }

  /**
   * Crea un nuevo grupo con los datos del formulario.
   */
  public create() {
    /*
    this.gruposService
      .createGroup({
        userName: this.loggedUser?.user_name ?? '',
        name: this.nameN,
        description: this.descriptionN,
        company: this.companyN,
        supervisor: this.supervisorN,
      } as GroupEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = '';
            }
            this.groupIdEdit = this.nameN;
            this.router.navigate([
              `/main-page/administrarGrupos/editarGrupo?id=${this.nameN}`,
            ]);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_GRUPO_CREAR,
              e,
            );
          }
        },
      });
      */
  }

  /**
   * Edita el grupo existente con los datos proporcionados.
   */
  public edit() {
    /*
    this.gruposService
      .editGroup({
        userName: this.loggedUser?.user_name ?? '',
        name: this.nameN,
        description: this.descriptionN,
        company: this.companyN,
        supervisor: this.supervisorN,
      } as GroupEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.router.navigate([
              `/main-page/administrarGrupos/editarGrupo?id=${this.nameN}`,
            ]);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_GRUPO_EDITAR,
              e,
            );
          }
        },
      });
      */
  }

  /**
   * Agrega una operación al grupo.
   */
  public addOperationToGroup(event: MatSelectChange<any>) {
    /*
    const operation = event.value;
    this.gruposService
      .addOperationToGroup(
        this.loggedUser?.user_name ?? '',
        this.groupIdEdit ?? '',
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
              Constants.ERR_GRUPO_AGREGAR_OPERACION,
              e,
            );
          }
        },
      });
      */
  }

  /**
   * Elimina una operación del grupo.
   */
  public remove(operation: string) {
    /*
    this.gruposService
      .removeOperationFromGroup(
        this.loggedUser?.user_name ?? '',
        this.groupIdEdit ?? '',
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
              Constants.ERR_GRUPO_ELIMINAR_OPERACION,
              e,
            );
          }
        },
      });
      */
  }

  /**
   * Elimina el grupo actual.
   */
  public delete() {
    /*
    this.gruposService
      .deleteGroup(this.loggedUser?.user_name ?? '', this.groupIdEdit)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.router.navigate(['/main-page/administrarGrupos']);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_GRUPO_ELIMINAR,
              e,
            );
          }
        },
      });
      */
  }

  /**
   * Cancela y regresa al listado de grupos.
   */
  public cancel() {
    /*
    if (this.uc) {
      this.uc.mensaje = '';
    }
    this.router.navigate(['/main-page/administrarGrupos']);
    */
  }

  /**
   * Compara compañías en el selector.
   */
  public compareCompanies(c1: HerramientasEntity, c2: HerramientasEntity): boolean {
    return c1.nombre === c2.nombre;
  }

  /**
   * Compara supervisores en el selector.
   */
  public compareSupervisors(s1: UserEntity, s2: UserEntity): boolean {
    return s1.name === s2.name;
  }

  /**
   * Maneja el cambio de supervisor seleccionado.
   */
  public onSupervisorChange(event: MatSelectChange<UserEntity>) {
    this.supervisorObjectN = event.value;
    this.supervisorN = event.value?.name ?? '';
  }


 /**
   * Agrega una restricción de operación a la compañía.
   */
  public restrict(operation?: string | undefined) {
    /*
    try {
      this.companiasService
        .addRestrictionToCompany(
          this.loggedUser?.user_name ?? '',
          this.groupIdEdit?? '',
          operation ?? '',
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
                Constants.ERR_COMPANIA_RESTRINGIR_OPERACION,
                e,
              );
            }
          },
        });
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_COMPANIA_ASOCIAR_PERMISO,
          e,
        );
      }
    }
      */
  }
}
