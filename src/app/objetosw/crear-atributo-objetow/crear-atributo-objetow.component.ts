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
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CompaniasService } from '../../companias/companias.service';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { ObjetowComponentInstanceService } from '../objetow-component-instance.service';
import { ObjetowService } from '../objetow.service';
import { ObjetowComponent } from '../objetow.component';
import { AtributoObjetowEntity } from '../atributo-objetow.entity';

@Component({
  selector: 'ibpm-crear-atributo-objetow',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './crear-atributo-objetow.component.html',
  styleUrl: './crear-atributo-objetow.component.scss',
})
/**
 * Componente para la creación y edición de atributos de objetos workflow.
 * Permite seleccionar compañía, supervisor y administrar permisos/restricciones.
 */
export class CrearAtributoObjetowComponent {

  public uc?: ObjetowComponent;
  public loggedUser?: LoginEntity;
  public nombreN: string= '';
  public descripcionN: string= '';
  public identificadorNegocioN: string= '';
  public labelIdentificadorNegocioN: string= '';
  public atrObjetowIdEdit?: string;
  public supervisorObjectN?: UserEntity;


  public constructor(
    private objetowService: ObjetowService,
    private companiasService: CompaniasService,
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private objetowComponentInstanceService: ObjetowComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.objetowComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el formulario, carga listas y detecta modo de edición.
   */
  public async ngOnInit(): Promise<void> {
    if (this.uc) {
      this.uc.mensaje = '';
    }
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Edit Mode On. Group Id:', id);
    if (id) {
      this.atrObjetowIdEdit = id;
      await this.fillEditFields();
    } else {
      this.atrObjetowIdEdit = undefined;
    }
  }

  /**
   * Llena los campos del formulario con la información del grupo en edición.
   */
  public async fillEditFields(): Promise<void> {
    
    try {
      const response = await firstValueFrom(
        this.objetowService.obtenerAtributosObjetoWorkflow(this.uc?.workflowActual  ?? '')
      );
      if (response?.respuesta) {
        const atributos = response.respuesta as AtributoObjetowEntity[];
        const atributo = atributos.find(attr => attr.nombre === this.atrObjetowIdEdit);
       

        this.nombreN = atributo?.nombre ?? '';
        this.descripcionN = atributo?.descripcion ?? '';
        this.identificadorNegocioN = atributo?.identificadorNegocio ?? '';
        this.labelIdentificadorNegocioN = atributo?.labelId ?? '';
        
      }
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_GRUPO_DATOS,
          e,
        );
      }
    }
    
  }

  /**
   * Indica si está en modo edición.
   */
  public editMode(): boolean {
    return this.atrObjetowIdEdit !== undefined && this.atrObjetowIdEdit !== '';
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
   * Crea un nuevo atributo de objeto workflow con los datos del formulario.
   */
  public create() {
    this.objetowService
      .crearAtributoObjetoWorkflow({
        nombre: this.nombreN,
        descripcion: this.descripcionN,
        identificadorNegocio: this.identificadorNegocioN,
        nombreWorkflow: this.uc?.workflowActual ?? '',
        labelId: this.labelIdentificadorNegocioN,
      } as AtributoObjetowEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.ngOnInit();
              this.uc.mensaje = Constants.ATRIBUTO_OBJETO_WORKFLOW_CREAR_EXITOSO;
            }
            this.atrObjetowIdEdit = this.nombreN;
            this.router.navigate([
              `/main-page/objetosWorkflow`,
            ]);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_ATRIBUTO_OBJETO_WORKFLOW_CREAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Edita el atributo de objeto workflow existente con los datos proporcionados.
   */
  public edit() {
    this.objetowService
      .editarAtributoObjetoWorkflow({
        nombre: this.nombreN,
        descripcion: this.descripcionN,
        identificadorNegocio: this.identificadorNegocioN,
        nombreWorkflow: this.uc?.workflowActual ?? '',
        labelId: this.labelIdentificadorNegocioN,
      } as AtributoObjetowEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
              if (this.uc) {
                this.uc.ngOnInit();
                this.uc.mensaje =
                  Constants.ATRIBUTO_OBJETO_WORKFLOW_EDITAR_EXITOSO;
              }
            this.router.navigate([
              `/main-page/objetosWorkflow`,
            ]);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_ATRIBUTO_OBJETO_WORKFLOW_EDITAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Elimina el atributo de objeto workflow actual y regresa al listado.
   */
  public delete() {
    this.objetowService
      .eliminarAtributoObjetoWorkflow(this.uc?.workflowActual ?? '', this.nombreN ?? '')
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
                this.uc.ngOnInit();
                this.uc.mensaje =
                  Constants.ATRIBUTO_OBJETO_WORKFLOW_ELIMINAR_EXITOSO;
              }
            this.router.navigate([
              `/main-page/objetosWorkflow`,
            ]);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_ATRIBUTO_OBJETO_WORKFLOW_ELIMINAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Cancela y regresa al listado de atributos de objeto workflow.
   */
  public cancel() {
    if (this.uc) {
      this.uc.mensaje = '';
    }
    this.router.navigate(['/main-page/objetosWorkflow']);
  }

  /**
   * Verifica si el identificador de negocio está marcado como "SI" para habilitar/deshabilitar el campo de label del identificador de negocio.
   * @returns 
   */
  public esIdentificadorNegocioSi(): boolean {
    return this.identificadorNegocioN === 'SI';   
  }

  public eventoCambioIdentificadorNegocio() {
    // Aquí puedes agregar la lógica que deseas ejecutar cuando cambie el valor del identificador de negocio.
    // Por ejemplo, podrías habilitar o deshabilitar el campo de label del identificador de negocio.
    if (!this.esIdentificadorNegocioSi()) {
      this.labelIdentificadorNegocioN = '';
    }
  }
}
