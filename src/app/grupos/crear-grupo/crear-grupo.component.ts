import { Component } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { GrupoComponent } from '../grupo.component';
import { LoginEntity } from '../../login/login.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { GrupoComponentInstanceService } from '../grupo-component-instance.service';
import { GrupoService } from '../grupo.service';
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
import { GrupoEntity } from '../grupo.entity';
import { CookieService } from 'ngx-cookie-service';
import { TipoGrupoEntity } from '../tipo-grupo.entity';

@Component({
  selector: 'ibpm-crear-grupo',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './crear-grupo.component.html',
  styleUrl: './crear-grupo.component.scss',
})
/**
 * Componente para la creación y edición de grupos.
 * Permite seleccionar compañía, supervisor y administrar permisos/restricciones.
 */
export class CrearGrupoComponent {
  public workflowActual: string = '';
  public uc?: GrupoComponent;
  public loggedUser?: LoginEntity;
  public nombreN: string = '';
  public descripcionN: string = '';
  public urlServicioWebN: string = '';
  public tipoGrupoObjectN?: TipoGrupoEntity;
  public tipoGrupoN: string = '';
  public grupoIdEdit?: string;
  public supervisorObjectN?: UserEntity;
  public attributesN: string[] = [];
  public grupo: any;

  public constructor(
    private grupoService: GrupoService,
    private companiasService: CompaniasService,
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private grupoComponentInstanceService: GrupoComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.grupoComponentInstanceService.getInstance();
  }

  
  /**
   * Inicializa el formulario, carga listas y detecta modo de edición.
   */

  public async ngOnInit(): Promise<void> {
    this.workflowActual = this.cookieService.get("workflowActual");
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Modo Edición Habilitado. Id Grupo:', id);
    if (id) {
      this.grupoIdEdit = id;
      await this.llenarCamposEdicion();
    } else {
      this.grupoIdEdit = undefined;
      if (this.uc) {
        this.uc.mensaje = '';
      }
    }
  }

  /**
   * Llena los campos del formulario con la información de la grupo en edición.
   */
  public async llenarCamposEdicion(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.grupoService.getGrupo(
          this.workflowActual ?? '',
          this.grupoIdEdit ?? '',
        ),
      );
      if (response?.respuesta) {
        const grupo = response.respuesta as GrupoEntity;
        this.nombreN = grupo.nombre ?? '';
        this.descripcionN = grupo.descripcion ?? '';
        this.urlServicioWebN = grupo.cadenaRepresentacion ?? '';
        this.tipoGrupoN = grupo.tipo ?? '';
        this.tipoGrupoObjectN = this.uc?.tipos.find(t => t.name === grupo.tipo);
        this.attributesN = grupo.attributes ?? [];
      }
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_OBTENIENDO_HERRAMIENTA,
          e,
        );
      }
    } 
  }

  /**
   * Indica si está en modo edición.
   */
  public editMode(): boolean {
    return this.grupoIdEdit !== undefined && this.grupoIdEdit !== '';
  }

  /**
   * Maneja el cambio de tipo de grupo seleccionada.
   */
  public onTipoGrupoChange(event: any) {
    console.log('Tipo de grupo seleccionada:', event);
    this.tipoGrupoObjectN = event as TipoGrupoEntity;
    this.tipoGrupoN = event?.name ?? '';
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
    let grupo: GrupoEntity = {
        nombreWorkflow: this.workflowActual,
        nombre: this.nombreN,
        tipo: this.tipoGrupoN,
        cadenaRepresentacion: this.urlServicioWebN,
        descripcion: this.descripcionN,
        attributes: [],
    }
    this.grupoService
    .createGrupo(grupo)
    .subscribe({
      next: (response) => {
        if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = Constants.MSG_HERRAMIENTA_CREACION_EXITOSA;
            }
            this.grupoIdEdit = this.nombreN; /** Verificar que atributa va aca */
            this.router.navigate([
              `/main-page/grupos/editarGrupo/${this.nombreN}`,
            ]);
          }
        },
      error: (e) => {
        if (this.uc) {
          this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_HERRAMIENTA_CREAR,
            e,
          );
        }
      },
    });
  }

  /**
   * Edita la grupo existente con los datos proporcionados.
   */
  public edit() {
    this.grupoService
      .editGrupo({
        nombreWorkflow: this.workflowActual,
        nombre: this.nombreN,
        tipo: this.tipoGrupoN,
        cadenaRepresentacion: this.urlServicioWebN,
        descripcion: this.descripcionN,
        attributes: this.attributesN,
      } as GrupoEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = Constants.MSG_HERRAMIENTA_EDICION_EXITOSA;
            }
            this.router.navigate([
               `/main-page/grupos/editarGrupo/${this.nombreN}`
            ]);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_HERRAMIENTA_EDITAR,
              e,
            );
          }
        },
      });
    }
  

  /**
   * Elimina la grupo actual.
   */
  public delete() {
    this.grupoService
      .deleteGrupo(this.workflowActual ?? '', this.grupoIdEdit ?? '')
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if(this.uc) {
              this.uc.buscarGrupos(true);
              this.uc.mensaje = Constants.MSG_HERRAMIENTA_ELIMINACION_EXITOSA;
            }
            this.router.navigate(['/main-page/grupos']);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_HERRAMIENTA_ELIMINAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Cancela y regresa al listado de grupos.
   */
  public cancel() {
    if (this.uc) {
      this.uc.mensaje = '';
      this.uc.buscarGrupos();
    }
    this.router.navigate(['/main-page/grupos']);
  }


  /**
   * Compara tipos de grupo en el selector.
   */
  public compareTiposGrupo(s1: TipoGrupoEntity, s2: TipoGrupoEntity): boolean {
    return s1.name === s2.name;
  }

}
