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
import { EntidadesEntity } from '../entidades.entity';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EntidadesComponentInstanceService } from '../entidades-component-instance.service';
import { EntidadesService } from '../entidades.service';
import { EntidadesComponent } from '../entidades.component';
import { CookieService } from 'ngx-cookie-service';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ResponsablesRolEntity } from '../ResponsablesRolEntity';
import { ResponsableEntity } from '../Responsable.Entity';
import { RolesEntity } from '../roles.entity'; 
import { FsResponseEntity } from '../../entities/backend/fs-response.entity';

@Component({
  selector: 'ibpm-crear-entidades',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,
    MatSlideToggleModule
],
  templateUrl: './crear-entidades.component.html',
  styleUrl: './crear-entidades.component.scss',
})
/**
 * Componente para la creación y edición de grupos.
 * Permite seleccionar compañía, supervisor y administrar permisos/restricciones.
 */
export class CrearEntidadesComponent {
  public userNameN: string = '';
  public idEntidadN: number = 0; 
  public nombreEntidadN: string = '';
  public descripcionN: string = '';
  public nombreRolN: string = '';
  public entidadesList: EntidadesEntity[] = [];
  public rolesList: RolesEntity[] = [];
  public rolN?: EntidadesEntity;
  public userN : string = '';
  public groupNameN: string = '';
  public responsablesN: string [] = [];
  public uc?: EntidadesComponent;
  public loggedUser?: LoginEntity;
  public rolesIdEdit?: string;
  public nombreIdEdit?: string;
  public entidadesIdEdit?: number;
  public workflowActual: string = '';
  public responsablesList: ResponsableEntity [] = [];
  public responsablesAsignadosList: ResponsableEntity[] = [];
  public responsablesAgregarList: ResponsableEntity[] = [];
  public responsablesRolE!: ResponsablesRolEntity;
  public respuestaServicio: ResponsablesRolEntity | undefined;

  public constructor(
    private entidadesService: EntidadesService,
    private loginService: LoginService,
    private entidadesComponentInstanceService: EntidadesComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.entidadesComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el formulario, carga listas y detecta modo de edición.
   */
  public async ngOnInit(): Promise<void> {
    console.log('entre a crear /editar', this.loggedUser);

    if (this.uc) {
      this.uc.mensaje = '';
    }
    this.workflowActual = this.cookieService.get("workflowActual");
    const id = this.route.snapshot.paramMap.get('nombre');
    console.log('Edit Mode On. Group Id:', id);
    await this.getRolesList();
    /* await this.getResponsablesList(); */
    
    if (id) {
      this.nombreIdEdit = id;
      await this.fillEditFields();

    } else {
      this.nombreIdEdit = undefined;
    }
  }
  
    

  /**
   * Llena los campos del formulario con la información de la entidad en edición.
   */
  
  
  public async fillEditFields(): Promise<void> {
   
    try {
      const response = await firstValueFrom(
        this.entidadesService.getEntidad(
          this.entidadesIdEdit ?? 0,
          this.nombreIdEdit ?? '',
      ),
      );
      if (response?.respuesta) {
        const entidad = response.respuesta as EntidadesEntity;
        this.nombreEntidadN = entidad.nombre ?? '';
        this.descripcionN = entidad.descripcion ?? '';
      /*  await this.getResponsablesRolList(); */
       
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

   public async getRolesList() {
      this.rolesList = [];

  
      try {const response:FsResponseEntity<string[]> = await firstValueFrom(
      this.entidadesService.getRoles()
    );

    if (response?.respuesta) {
      this.rolesList = response.respuesta.map((rol: string) => ({
        name: rol
      }));
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
   * Consulta los tipos de entidad.
   */
  public async getResponsablesList() {
    this.responsablesList = [];
    console.log('Edit entre a getresponsablesList:', this.entidadesIdEdit);
    try {
      const response = await firstValueFrom(
      this.entidadesService.getGroupsRol(
        this.rolesIdEdit ?? '',
        this.loggedUser?.user_name ?? ''     )
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
   * Consulta los responsables asociados al rol.
   */
  public async getResponsablesRolList() {
    this.responsablesAsignadosList = [];
    console.log('Edit getResponsablesROLLIST: nombreROLN:', this.nombreRolN);
    try {
      const response = await firstValueFrom(
      this.entidadesService
        .getGroupsRol(this.nombreRolN ?? '',this.loggedUser?.user_name ?? '')
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
    return this.entidadesIdEdit !== undefined && this.nombreIdEdit !== '';
  console.log("rolesIdEdit", this.entidadesIdEdit);
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
      console.log("dentro de guardar - Save, voy a crear", this.entidadesIdEdit);
      this.create();
    } else {
      this.edit();
    }
  }

  /**
   * Crea un nuevo grupo con los datos del formulario.
   */
  public create() {
    console.log("estoy en create", this.entidadesIdEdit);
    this.entidadesService
      .createEntidad({
        userName: this.userNameN,
        idEntidad: this.idEntidadN,
        nombre: this.nombreEntidadN,
        descripcion: this.descripcionN,
        nombreRol: this.nombreRolN,
        listaGrupos: this.responsablesAsignadosList.map(r => r.name)
             } as EntidadesEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = 'Se ha creado el entidad exitosamente';
            }
            console.log("creado", this.entidadesIdEdit);
            this.nombreIdEdit = this.nombreRolN;
            this.router.navigate([
              `/main-page/entidades/editarRol?id=${this.nombreRolN}`,
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
   * Edita la entidad existente con los datos proporcionados.
   */
  public edit() {
    this.entidadesService
      .editEntidad({
        userName: this.userNameN,
        idEntidad: this.idEntidadN,
        nombre: this.nombreEntidadN,
        descripcion: this.descripcionN,
        nombreRol: this.nombreRolN,
       /* falta responsables*/
      } as EntidadesEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.router.navigate([
              `/main-page/entidades/editarRol?id=${this.nombreRolN}`,
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
   * Elimina la entidad actual.
   */
  public delete() {
    this.entidadesService
      .deleteEntidad( this.nombreIdEdit?? '')
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.router.navigate(['/main-page/entidades']);
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
   * Cancela y regresa al listado de entidades.
   */
  public cancel() {
    if (this.uc) {
      this.uc.mensaje = '';
    }
    this.router.navigate(['/main-page/entidades']);
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
