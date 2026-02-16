import { Component } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { LoginEntity } from '../../login/login.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { CompanyEntity } from '../../entities/companies/company.entity';
import { UserEntity } from '../../entities/users/user.entity';
import { MessageUtil } from '../../utils/message.util';
import { Constants } from '../../utils/constants';
import { firstValueFrom } from 'rxjs';
import { TareaEntity } from '../tarea.entity';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TareasComponentInstanceService } from '../tareas-component-instance.service';
import { TareasService } from '../tareas.service';
import { TareasComponent } from '../tareas.component';
import { CookieService } from 'ngx-cookie-service';
import { TipoTareaEntity } from '../tipo-tarea.entity';
import { HerramientaTareaEntity } from '../herramienta-tarea.entity';
import { RolTareaEntity } from '../rol-tarea.entity';
import { MetodoAsignacionTareaEntity } from '../metodo-asignacion-tarea.entity';

@Component({
  selector: 'ibpm-crear-tareas',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './crear-tareas.component.html',
  styleUrl: './crear-tareas.component.scss',
})
/**
 * Componente para la creación y edición de grupos.
 * Permite seleccionar compañía, supervisor y administrar permisos/restricciones.
 */
export class CrearTareasComponent {
  public metodosAsignacionList: any[] = [];
  public herramientaN?: HerramientaTareaEntity;
  public rolesList: RolTareaEntity[] = [];
  public metodoAsignacionN?: MetodoAsignacionTareaEntity;
  public nombreMetodoAsignacionN: string = '';
  public rolN?: RolTareaEntity;
  public nombreRolN: string = '';
  public herramientasList: HerramientaTareaEntity[] = [];
  public numeroTareaN: string = '';
  public nombreTareaN: string = '';
  public nombreLargoN: string = '';
  public estadoObjetoN: string = '';
  public modeloCarpetaN: string = '';
  public descripcionN: string = '';
  public tipoN?: TipoTareaEntity;
  public nombreTipoN: string = '';
  public nombreHerramientaN: string = '';
  public uc?: TareasComponent;
  public loggedUser?: LoginEntity;
  public tareasIdEdit?: string;
  public workflowActual: string = '';
  public tiposList: TipoTareaEntity[] = [];

  public constructor(
    private tareasService: TareasService,
    private loginService: LoginService,
    private tareasComponentInstanceService: TareasComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.tareasComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el formulario, carga listas y detecta modo de edición.
   */
  public async ngOnInit(): Promise<void> {
    if (this.uc) {
      this.uc.mensaje = '';
    }
    this.workflowActual = this.cookieService.get("workflowActual");
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Edit Mode On. Group Id:', id);
    await this.getTiposTareaList();
    await this.getHerramientasTareaList();
    await this.getRolesList();
    await this.getMetodosAsignacionList();
    if (id) {
      this.tareasIdEdit = id;
      await this.fillEditFields();

    } else {
      this.tareasIdEdit = undefined;
    }
  }

  

  /**
   * Llena los campos del formulario con la información de la tarea en edición.
   */
  public async fillEditFields(): Promise<void> {
   
    try {
      const response = await firstValueFrom(
        this.tareasService.getTarea(
          this.workflowActual ?? '',
          this.tareasIdEdit ?? '',
          this.loggedUser?.user_name ?? '',
        ),
      );
      if (response?.respuesta) {
        const tarea = response.respuesta as TareaEntity;
        this.numeroTareaN = tarea.numero ? tarea.numero.toString() : '';
        this.nombreTareaN = tarea.nombre ?? '';
        this.nombreLargoN = tarea.nombreLargo ?? '';
        this.estadoObjetoN = tarea.estadoTarea ?? '';
        this.modeloCarpetaN = tarea.modeloCarpeta ?? '';
        this.descripcionN = tarea.descripcion ?? '';
        this.nombreTipoN = tarea.tipo ?? '';
        this.tipoN = this.tiposList.find(t => t.code === this.nombreTipoN) ?? undefined;
        this.nombreHerramientaN = tarea.herramienta ?? '';
        this.herramientaN = this.herramientasList.find(h => h.code === this.nombreHerramientaN) ?? undefined;
        this.nombreRolN = tarea.rol ?? '';
        this.rolN = this.rolesList.find(r => r.code === this.nombreRolN) ?? undefined;
        this.nombreMetodoAsignacionN = tarea.metodoAsignacion ?? '';
        this.metodoAsignacionN = this.metodosAsignacionList.find(m => m.code === this.nombreMetodoAsignacionN) ?? undefined;
      }
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_TAREA_DATOS,
          e,
        );
      }
    }
  }

  /**
   * Consulta los tipos de tarea.
   */
  public async getTiposTareaList() {
    this.tiposList = [];

    try {
      const response = await firstValueFrom(
      this.tareasService
        .getTipos()
      );

      if (response && response.respuesta) {
        const ops = response.respuesta as TipoTareaEntity[];
        this.tiposList.push(...ops);
      }
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje =
          error.status === 400
            ? ''
            : MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_TIPO_TAREA_ENCONTRAR,
                error,
              );
      }
    }
      
  }

  /**
   * Consulta las herramientas de tarea.
   */
  public async getHerramientasTareaList() {
    this.herramientasList = [];

    try {
      const response = await firstValueFrom(
        this.tareasService
        .getHerramientas(this.workflowActual ?? ''));

        if (response && response.respuesta) {
          const ops = response.respuesta as HerramientaTareaEntity[];
            this.herramientasList.push(...ops);
        }
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje =
          error.status === 400
            ? ''
            : MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_HERRAMIENTA_TAREA_ENCONTRAR,
                error,
              );
      }
    }
  }

  /**
   * Consulta los roles de tarea.
   */
  public async getRolesList() {
    this.rolesList = [];

    try {
      const response = await firstValueFrom(
        this.tareasService
        .getRoles());

        if (response && response.respuesta) {
          const ops = response.respuesta as RolTareaEntity[];
            this.rolesList.push(...ops);
        }
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje =
          error.status === 400
            ? ''
            : MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_ROL_TAREA_ENCONTRAR,
                error,
              );
      }
    }
  }

  /**
   * Consulta los métodos de asignación de tarea.
   */
  public async getMetodosAsignacionList() {
    this.metodosAsignacionList = [];

    try {
      const response = await firstValueFrom(
        this.tareasService
        .getMetodosAsignacion());

        if (response && response.respuesta) {
          const ops = response.respuesta as MetodoAsignacionTareaEntity[];
            this.metodosAsignacionList.push(...ops);
        }
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje =
          error.status === 400
            ? ''
            : MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_METODO_ASIGNACION_TAREA_ENCONTRAR,
                error,
              );
      }
    }
  }

  /**
   * Indica si está en modo edición.
   */
  public editMode(): boolean {
    return this.tareasIdEdit !== undefined && this.tareasIdEdit !== '';
  }

  /**
   * Maneja el cambio de compañía seleccionada.
   */
  public onCompanyChange(event: MatSelectChange<CompanyEntity>) {
    /**this.companyObjectN = event.value;
    this.companyN = event.value?.name ?? '';*/
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
  public compareCompanies(c1: CompanyEntity, c2: CompanyEntity): boolean {
    return c1.name === c2.name;
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
    /*this.supervisorObjectN = event.value;
    this.supervisorN = event.value?.name ?? '';*/
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

  public onMetodoAsignacionChange($event: any) {
    let metodoAsignacionSeleccionado = $event as MetodoAsignacionTareaEntity;
    this.metodoAsignacionN = metodoAsignacionSeleccionado;
    this.nombreMetodoAsignacionN = metodoAsignacionSeleccionado.code ?? '';
  }

  public onRolChange($event: any) {
    let rolSeleccionado = $event as RolTareaEntity;
    this.rolN = rolSeleccionado;
    this.nombreRolN = rolSeleccionado.code ?? '';
  }

  public onHerramientaChange($event: any) {
    let herramientaSeleccionada = $event as HerramientaTareaEntity;
    this.herramientaN = herramientaSeleccionada;
    this.nombreHerramientaN = herramientaSeleccionada?.code ?? '';
  } 

  public onTipoChange(event: any) {
    let tipoSeleccionado = event as TipoTareaEntity;
    this.tipoN = tipoSeleccionado;
    this.nombreTipoN = tipoSeleccionado?.code ?? '';
  }   

  public selectOpcion(_t155: any) {
    throw new Error('Method not implemented.');
  }

  
  public toggleRequerido(_t178: any) {  
    throw new Error('Method not implemented.');
  }
  
  public retirar() {
throw new Error('Method not implemented.');
  }

  public asignar() {
    throw new Error('Method not implemented.');
  }

  public toggleDropdown() {
    throw new Error('Method not implemented.');
  }

}
