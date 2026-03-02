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
import { RolesEntity } from '../roles.entity';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RolesComponentInstanceService } from '../roles-component-instance.service';
import { RolesService } from '../roles.service';
import { RolesComponent } from '../roles.component';
import { CookieService } from 'ngx-cookie-service';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ResponsablesRolEntity } from '../ResponsablesRolEntity';

@Component({
  selector: 'ibpm-crear-roles',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,
    MatSlideToggleModule
],
  templateUrl: './crear-roles.component.html',
  styleUrl: './crear-roles.component.scss',
})
/**
 * Componente para la creación y edición de grupos.
 * Permite seleccionar compañía, supervisor y administrar permisos/restricciones.
 */
export class CrearRolesComponent {
  public rolesList: RolesEntity[] = [];
  public rolN?: RolesEntity;
  public nombreRolN: string = '';
  public descripcionN: string = '';
  public uc?: RolesComponent;
  public loggedUser?: LoginEntity;
  public rolesIdEdit?: string;
  public workflowActual: string = '';
  public responsablesAsignadosList: ResponsablesRolEntity[] = [];
  public ResponsablesAgregarList: ResponsablesRolEntity[] = [];
 

  public constructor(
    private rolesService: RolesService,
    private loginService: LoginService,
    private rolesComponentInstanceService: RolesComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.rolesComponentInstanceService.getInstance();
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
    await this.getResponsablesList();
      await this.getResponsablesRolList();

    if (id) {
      this.rolesIdEdit = id;
      await this.fillEditFields();

    } else {
      this.rolesIdEdit = undefined;
    }
  }
  
  


  

  /**
   * Llena los campos del formulario con la información de la rol en edición.
   */
  public async fillEditFields(): Promise<void> {
   
    try {
      const response = await firstValueFrom(
        this.rolesService.getGroups(
          this.workflowActual ?? '',
          this.rolesIdEdit ?? '',
          this.loggedUser?.user_name ?? '',
        ),
      );
      if (response?.respuesta) {
        const rol = response.respuesta as RolesEntity;
        this.nombreRolN = rol.nombre ?? '';
        this.descripcionN = rol.descripcion ?? '';
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
   * Consulta los tipos de rol.
   */
  public async getResponsablesList() {
    this.ResponsablesAgregarList = [];

    try {
      const response = await firstValueFrom(
      this.rolesService
        .getGroups()
      );

      if (response && response.respuesta) {
        const ops = response.respuesta as ResponsablesRolEntity[];
        this.ResponsablesAgregarList.push(...ops);
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
   * Consulta los tipos de rol.
   */
  public async getResponsablesRolList() {
    this.responsablesAsignadosList = [];

    try {
      const response = await firstValueFrom(
      this.rolesService
        .getGroupsRol()
      );

      if (response && response.respuesta) {
        const ops = response.respuesta as ResponsablesRolEntity[];
        this.responsablesAsignadosList.push(...ops);
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
   * Indica si está en modo edición.
   */
  public editMode(): boolean {
    return this.rolesIdEdit !== undefined && this.rolesIdEdit !== '';
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
    this.rolesService
      .createRole({
        nombreWorkflow: this.workflowActual,
        usuario: this.loggedUser?.user_name ?? '',
        descripcion: this.descripcionN,
        rol: this.nombreRolN,
        subProceso: '',
        sincronico: '',
        responsable: '',
        docModels: this.mapearModelosDocumentoTarea(),
      } as RolesEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = '';
            }
            this.rolesIdEdit = this.nombreRolN;
            this.router.navigate([
              `/main-page/roles/editarRol?id=${this.nombreRolN}`,
            ]);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_TAREA_CREAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Edita la rol existente con los datos proporcionados.
   */
  public edit() {
    this.rolesService
      .editRol({
        nombreWorkflow: this.workflowActual,
        usuario: this.loggedUser?.user_name ?? '',
        descripcion: this.descripcionN,
        rol: this.nombreRolN,
        subProceso: '',
        sincronico: '',
        responsable: '',
        docModels: this.mapearModelosDocumentoTarea(),
      } as RolesEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.router.navigate([
              `/main-page/roles/editarRol?id=${this.nombreRolN}`,
            ]);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_TAREA_EDITAR,
              e,
            );
          }
        },
      });

    
  }

 
  /**
   * Elimina la rol actual.
   */
  public delete() {
    this.rolesService
      .deleteRol( this.rolesIdEdit ?? '')
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.router.navigate(['/main-page/roles']);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_TAREA_ELIMINAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Cancela y regresa al listado de roles.
   */
  public cancel() {
    if (this.uc) {
      this.uc.mensaje = '';
    }
    this.router.navigate(['/main-page/roles']);
  }


  

  public onRolChange($event: any) {
    let rolSeleccionado = $event as RolesEntity;
    this.rolN = rolSeleccionado;
    this.nombreRolN = rolSeleccionado.code ?? '';
  }

     

  public diligenciarResponsable() {
    this.ResponsablesAgregarList = [];
    if(this.ResponsablesAgregarList.length > 0 ) {
        this.ResponsablesAgregarList.forEach(tipoDoc => {
          if (!this.responsablesAsignadosList.some(asignado => asignado.code === tipoDoc.code)) {
            this.ResponsablesAgregarList.push(tipoDoc);
          }
        });
   } 
  }

  public diligenciarResponsablesAsignados() {
    this.responsablesAsignadosList = [];
    if(this.editMode()) {
      this.modelosDocumentoTareaE.forEach(modeloDoc => {
        if(modeloDoc.nombreSerie === this.nombreSerieN) {
          const responsableasignado: ResponsablesRolEntity = {
            code: modeloDoc.tipoDocumento ?? '',
            name: modeloDoc.tipoDocumento ?? '',
            obligatorio: modeloDoc.obligatoryTypeDocInTask ?? false,
            visible: true,
            selected: false
          };
          this.responsablesAsignadosList.push(responsableasignado);
        }
     });
    }
  
  
  public retirar() {
    this.responsablesAgregarList.push(...this.responsablesAsignadosList.some(responsable => responsable.visible) ? this.responsablesAsignadosList.filter(responsable => responsable.visible) : []);
    this.responsablesAsignadosList = this.responsablesAsignadosList.filter(responsable => !responsable.visible);
    this.responsablesAgregarList.forEach(responsable => { responsable.visible = false; });
  }

  public asignar() {
    this.responsablesAsignadosList.push(...this.responsablesAgregarList.some(responsable => responsable.selected) ? this.responsablesAgregarList.filter(responsable => responsable.selected) : []);
    this.responsablesAgregarList = this.responsablesAgregarList.filter(responsable => !responsable.selected);
    this.responsablesAsignadosList.forEach(responsable => { responsable.selected = false; });
  }

}
}