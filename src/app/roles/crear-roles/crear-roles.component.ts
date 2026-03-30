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
import { ResponsableEntity } from '../ResponsableEntity';
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
  public userN : string = '';
  public groupNameN: string = '';
  public responsablesN: string [] = [];
  public uc?: RolesComponent;
  public loggedUser?: LoginEntity;
  public rolesIdEdit?: string;
  public workflowActual: string = '';
  public responsablesList: ResponsableEntity [] = [];
  public responsablesAsignadosList: ResponsableEntity[] = [];
  public responsablesAgregarList: ResponsableEntity[] = [];
  public responsablesRolE!: ResponsablesRolEntity;
  public respuestaServicio: ResponsablesRolEntity | undefined;

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
        this.rolesService.getRol(
          this.rolesIdEdit ?? '',
      ),
      );
      if (response?.respuesta) {
        const rol = response.respuesta as RolesEntity;
        this.nombreRolN = rol.nombre ?? '';
        this.descripcionN = rol.descripcion ?? '';
        await this.getResponsablesRolList();
       /**  await this.diligenciarResponsablesAsignados();
        await this.diligenciarResponsables(); */
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
    this.responsablesList = [];
    console.log('Edit entre a getresponsablesList:', this.rolesIdEdit);
    try {
      const response = await firstValueFrom(
      this.rolesService.getGroups(
        this.loggedUser?.user_name ?? '',
        this.rolesIdEdit ?? ''
      )
    );

   if (response?.respuesta) {
  this.responsablesList = response.respuesta.map(r => ({
    name: r,
    selected: false
  }));
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
   * Consulta los responsables del rol.
   */
  public async getResponsablesRolList() {
    this.responsablesAsignadosList = [];
    console.log('Edit getResponsablesROLLIST: nombreROLN:', this.nombreRolN);
    try {
      const response = await firstValueFrom(
      this.rolesService
        .getGroupsRol(this.nombreRolN ?? '')
      );

      if (response?.respuesta) {
       this.responsablesAsignadosList = response.respuesta.map(r => ({
        name: r,
        selected: false
  }));
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
  console.log("rolesIdEdit", this.rolesIdEdit);
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
      console.log("dentro de guardar - Save, voy a crear", this.rolesIdEdit);
      this.create();
    } else {
      this.edit();
    }
  }

  /**
   * Crea un nuevo grupo con los datos del formulario.
   */
  public create() {
    console.log("estoy en create", this.rolesIdEdit);
    this.rolesService
      .createRole({
        nombre: this.nombreRolN,
        descripcion: this.descripcionN,
        user: this.userN,
        responsables: this.responsablesAsignadosList.map(r => r.name)
       /* falta responsables*/
      } as RolesEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = 'Se ha creado el rol exitosamente';
            }
            console.log("creado", this.rolesIdEdit);
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
        nombre: this.nombreRolN,
        descripcion: this.descripcionN,
        user: this.userN,
       /* falta responsables*/
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


    public diligenciarResponsables() {
    this.responsablesAgregarList = [];
    if(this.responsablesAgregarList.length > 0 ) {
        this.responsablesAgregarList.forEach(responsable => {
        this.responsablesAgregarList.push(responsable);
         
        });
   } 
  }

 

/*
  public diligenciarResponsablesAsignados() {
  this.responsablesAsignadosList = [];
  if (this.editMode()) {
    console.log('Edit diligenciarrespasignados. edit:');
    /* this.responsablesRolE.forEach(responsableRol => {*/
     /* this.responsablesRolE.forEach(responsable => {
        const responsableAsignado: ResponsableRolEntity = {
          name: responsable,
          selected: false
        };
        this.responsablesAsignadosList.push(responsableAsignado);
        console.log('Edit diligenciarrespasignados.responsablesasignados:',this.responsablesAsignadosList);
      });

 );

  }
  } */

  public diligenciarResponsablesAsignados() {
  if (this.editMode()) {
    console.log('Edit1 diligenciarrespasignados');
    this.responsablesAsignadosList =
      this.responsablesRolE.respuesta.map((responsable: string) => ({
        name: responsable,
        selected: false
      }));
    console.log(
      'Edit2 diligenciarrespasignados.responsablesasignados:',
      this.responsablesAsignadosList
    );
  }
}
/*
  public retirar() {
 
    this.responsablesList.push(...this.responsablesAsignadosList.some(responsable => responsable.selected) ? this.responsablesAsignadosList.filter(responsable => responsable.selected) : []);
    this.responsablesAsignadosList = this.responsablesAsignadosList.filter(responsable => !responsable.selected);
    this.responsablesList.forEach(responsable => {responsable.selected= false; });
 
    } 
*/
  public retirar() {
  const nuevosAsignados: ResponsableEntity[] = [];
  this.responsablesAsignadosList = this.responsablesAsignadosList.filter(responsable => {
    if (responsable.selected) {
      responsable.selected = false;
      this.responsablesList.push(responsable);
      return false; // se elimina de la lista de asignados
    }
    return true; // permanece en asignados
  });
}

  public asignar() {
    
    this.responsablesAsignadosList.push(...this.responsablesList.some(responsable => responsable.selected) ? this.responsablesList.filter(responsable => responsable.selected) : []);
    this.responsablesList = this.responsablesList.filter(responsable => !responsable.selected);
    this.responsablesAsignadosList.forEach(responsable => { responsable.selected = false; });
  
  }

}
