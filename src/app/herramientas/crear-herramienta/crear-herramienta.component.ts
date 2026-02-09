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
import { HerramientaEntity } from '../herramienta.entity';
import { CookieService } from 'ngx-cookie-service';
import { TipoHerramientaEntity } from '../tipo-herramienta.entity';

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
  public workflowActual: string = '';
  public uc?: HerramientaComponent;
  public loggedUser?: LoginEntity;
  public nombreN: string = '';
  public descripcionN: string = '';
  public urlServicioWebN: string = '';
  public tipoHerramientaObjectN?: TipoHerramientaEntity;
  public tipoHerramientaN: string = '';
 

  public herramientaIdEdit?: string;
  public supervisorObjectN?: UserEntity;
  public attributesN: string[] = [];

  public herramienta: any;

  public constructor(
    private herramientaService: HerramientaService,
    private companiasService: CompaniasService,
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private herramientaComponentInstanceService: HerramientaComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.herramientaComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el formulario, carga listas y detecta modo de edición.
   */
  public async ngOnInit(): Promise<void> {
    this.workflowActual = this.cookieService.get("workflowActual");
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Modo Edición Habilitado. Id Herramienta:', id);
    if (id) {
      this.herramientaIdEdit = id;
      await this.llenarCamposEdicion();
    } else {
      this.herramientaIdEdit = undefined;
      if (this.uc) {
        this.uc.mensaje = '';
      }
    }
  }

  /**
   * Llena los campos del formulario con la información del grupo en edición.
   */
  public async llenarCamposEdicion(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.herramientaService.getHerramienta(
          this.workflowActual ?? '',
          this.herramientaIdEdit ?? '',
        ),
      );
      if (response?.respuesta) {
        const herramienta = response.respuesta as HerramientaEntity;
        this.nombreN = herramienta.nombre ?? '';
        this.descripcionN = herramienta.descripcion ?? '';
        this.urlServicioWebN = herramienta.cadenaRepresentacion ?? '';
        this.tipoHerramientaN = herramienta.tipo ?? '';
        this.tipoHerramientaObjectN = this.uc?.tipos.find(t => t.name === herramienta.tipo);
        this.attributesN = herramienta.attributes ?? [];
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
    return this.herramientaIdEdit !== undefined && this.herramientaIdEdit !== '';
  }

  /**
   * Maneja el cambio de tipo de herramienta seleccionada.
   */
  public onTipoHerramientaChange(event: any) {
    console.log('Tipo de herramienta seleccionada:', event);
    this.tipoHerramientaObjectN = event as TipoHerramientaEntity;
    this.tipoHerramientaN = event?.name ?? '';
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
   * Crea un nuevo herramienta con los datos del formulario.
   */
  public create() {
    let herramienta: HerramientaEntity = {
        nombreWorkflow: this.workflowActual,
        nombre: this.nombreN,
        tipo: this.tipoHerramientaN,
        cadenaRepresentacion: this.urlServicioWebN,
        descripcion: this.descripcionN,
        attributes: [],
    }
    this.herramientaService
    .createHerramienta(herramienta)
    .subscribe({
      next: (response) => {
        if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = Constants.MSG_HERRAMIENTA_CREACION_EXITOSA;
            }
            this.herramientaIdEdit = this.nombreN; /** Verificar que atributa va aca */
            this.router.navigate([
              `/main-page/herramientas/editarHerramienta/${this.nombreN}`,
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
   * Edita la herramienta existente con los datos proporcionados.
   */
  public edit() {
    this.herramientaService
      .editHerramienta({
        nombreWorkflow: this.workflowActual,
        nombre: this.nombreN,
        tipo: this.tipoHerramientaN,
        cadenaRepresentacion: this.urlServicioWebN,
        descripcion: this.descripcionN,
        attributes: this.attributesN,
      } as HerramientaEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = Constants.MSG_HERRAMIENTA_EDICION_EXITOSA;
            }
            this.router.navigate([
               `/main-page/herramientas/editarHerramienta/${this.nombreN}`
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
   * Elimina la herramienta actual.
   */
  public delete() {
    this.herramientaService
      .deleteHerramienta(this.workflowActual ?? '', this.herramientaIdEdit ?? '')
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if(this.uc) {
              this.uc.buscarHerramientas(true);
              this.uc.mensaje = Constants.MSG_HERRAMIENTA_ELIMINACION_EXITOSA;
            }
            this.router.navigate(['/main-page/herramientas']);
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
   * Cancela y regresa al listado de herramientas.
   */
  public cancel() {
    if (this.uc) {
      this.uc.mensaje = '';
      this.uc.buscarHerramientas();
    }
    this.router.navigate(['/main-page/herramientas']);
  }


  /**
   * Compara tipos de herramienta en el selector.
   */
  public compareTiposHerramienta(s1: TipoHerramientaEntity, s2: TipoHerramientaEntity): boolean {
    return s1.name === s2.name;
  }

}
