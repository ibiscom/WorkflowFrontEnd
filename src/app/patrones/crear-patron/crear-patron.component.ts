import { Component } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { PatronComponent } from '../patron.component';
import { LoginEntity } from '../../login/login.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { PatronComponentInstanceService } from '../patron-component-instance.service';
import { PatronService } from '../patron.service';
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
import { PatronEntity } from '../patron.entity';
import { CookieService } from 'ngx-cookie-service';
import { TipoPatronEntity } from '../tipo-patron.entity';


@Component({
  selector: 'ibpm-crear-patron',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './crear-patron.component.html',
  styleUrl: './crear-patron.component.scss',
})
/**
 * Componente para la creación y edición de grupos.
 * Permite seleccionar compañía, supervisor y administrar permisos/restricciones.
 */
export class CrearPatronComponent {
dependenciasPatronList: any;
retirar() {
throw new Error('Method not implemented.');
}
asignar() {
throw new Error('Method not implemented.');
}
dependenciasWorkflow: any;
tiposPatronList: any;
descripcionPatronN: any;
nombrePatronN: any;
dependenciasWorkflowList: any;
asignarDependencias() {
throw new Error('Method not implemented.');
}
retirarDependencias() {
throw new Error('Method not implemented.');
}
  public workflowActual: string = '';
  public uc?: PatronComponent;
  public loggedUser?: LoginEntity;
  public nombreN: string = '';
  public descripcionN: string = '';
  public urlServicioWebN: string = '';
  public tipoPatronObjectN?: TipoPatronEntity;
  public tipoPatronN: string = '';
  public patronIdEdit?: string;
  public supervisorObjectN?: UserEntity;
  public attributesN: string[] = [];
  public patron: any;
dependenciasPatron: any;

  public constructor(
    private patronService: PatronService,
    private companiasService: CompaniasService,
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private patronComponentInstanceService: PatronComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.patronComponentInstanceService.getInstance();
  }

  
  /**
   * Inicializa el formulario, carga listas y detecta modo de edición.
   */

  public async ngOnInit(): Promise<void> {
    this.workflowActual = this.cookieService.get("workflowActual");
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Modo Edición Habilitado. Id Patron:', id);
    if (id) {
      this.patronIdEdit = id;
      await this.llenarCamposEdicion();
    } else {
      this.patronIdEdit = undefined;
      if (this.uc) {
        this.uc.mensaje = '';
      }
    }
  }

  /**
   * Llena los campos del formulario con la información de la patron en edición.
   */
  public async llenarCamposEdicion(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.patronService.getPatron(
          this.workflowActual ?? '',
          this.patronIdEdit ?? '',
        ),
      );
      if (response?.respuesta) {
        const patron = response.respuesta as PatronEntity;
        this.nombreN = patron.nombre ?? '';
        this.descripcionN = patron.descripcion ?? '';
        this.urlServicioWebN = patron.cadenaRepresentacion ?? '';
        this.tipoPatronN = patron.tipo ?? '';
        this.tipoPatronObjectN = this.uc?.tipos.find(t => t.name === patron.tipo);
        this.attributesN = patron.attributes ?? [];
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
    return this.patronIdEdit !== undefined && this.patronIdEdit !== '';
  }

  /**
   * Maneja el cambio de tipo de patron seleccionada.
   */
  public onTipoPatronChange(event: any) {
    console.log('Tipo de patron seleccionada:', event);
    this.tipoPatronObjectN = event as TipoPatronEntity;
    this.tipoPatronN = event?.name ?? '';
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
   * Crea un nuevo patron con los datos del formulario.
   */
  public create() {
    let patron: PatronEntity = {
        nombreWorkflow: this.workflowActual,
        nombre: this.nombreN,
        tipo: this.tipoPatronN,
        cadenaRepresentacion: this.urlServicioWebN,
        descripcion: this.descripcionN,
        attributes: [],
    }
    this.patronService
    .createPatron(patron)
    .subscribe({
      next: (response) => {
        if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = Constants.MSG_HERRAMIENTA_CREACION_EXITOSA;
            }
            this.patronIdEdit = this.nombreN; /** Verificar que atributa va aca */
            this.router.navigate([
              `/main-page/Gateway/create/${this.nombreN}`,
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
   * Edita la patron existente con los datos proporcionados.
   */
  public edit() {
    this.patronService
      .editPatron({
        nombreWorkflow: this.workflowActual,
        nombre: this.nombreN,
        tipo: this.tipoPatronN,
        cadenaRepresentacion: this.urlServicioWebN,
        descripcion: this.descripcionN,
        attributes: this.attributesN,
      } as PatronEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = Constants.MSG_HERRAMIENTA_EDICION_EXITOSA;
            }
            this.router.navigate([
               `/main-page/Gateway/edit/${this.nombreN}`
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
   * Elimina la patron actual.
   */
  public delete() {
    this.patronService
      .deletePatron(this.workflowActual ?? '', this.patronIdEdit ?? '')
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if(this.uc) {
              this.uc.buscarPatrones(true);
              this.uc.mensaje = Constants.MSG_HERRAMIENTA_ELIMINACION_EXITOSA;
            }
            this.router.navigate(['/main-page/Gateway/delete']);
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
   * Cancela y regresa al listado de patrons.
   */
  public cancel() {
    if (this.uc) {
      this.uc.mensaje = '';
      this.uc.buscarPatrones();
    }
    this.router.navigate(['/main-page/Patrones']);
  }


  /**
   * Compara tipos de patron en el selector.
   */
  public compareTiposPatron(s1: TipoPatronEntity, s2: TipoPatronEntity): boolean {
    return s1.name === s2.name;
  }

}
