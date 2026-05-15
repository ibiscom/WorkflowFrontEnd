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
  public loggedUser?: LoginEntity;
  public workflowActual: string = '';
  public userNameN: string = '';
  public idEntidadN: number = 0; 
  public nombreEntidadN: string = '';
  public descripcionN: string = '';
  public entidadesList: EntidadesEntity[] = [];
  public entidadesIdEdit?: number;
  public nombreRolN: string = '';
  public rolesList: RolesEntity[] = [];
  public rolN?: RolesEntity;
  public rolesIdEdit?: string;
  public userN : string = '';
  public groupNameN: string = '';
  public responsablesN: string [] = [];
  public uc?: EntidadesComponent;
  public nombreIdEdit?: string;
  public responsablesRolList: ResponsableEntity [] = [];
  public responsablesAsignadosList: ResponsableEntity[] = [];
  public responsablesAgregarList: ResponsableEntity[] = [];
  public editarRolesN: boolean = false;
  public responsablesRolE!: ResponsablesRolEntity;
  public respuestaServicio: ResponsablesRolEntity | undefined;
responsable: any;

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
       console.log('Id seleccionado en roleslist:', id); 
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
        this.rolN = this.rolesList.find(r => r.name === this.nombreRolN) ?? undefined;
        await this.getResponsablesRolList(); 
        /*await this.diligenciarResponsablesAsignadosRolEntidad();
        await this.diligenciarResponsablesAsignar();
        */
      }
    } 
    catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_TAREA_DATOS,
          e,
        );
      }
    }
  }
/* Consulta los roles  */

  public async getRolesList() {
   this.rolesList = [];
    try {const response:FsResponseEntity<string[]> = await firstValueFrom(
    this.entidadesService.getRoles()
    );
    console.log('getRolesListRoles obtenidos:', response);
    if (response && response.respuesta) {
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
  
public async onrolChange($event: any) {
    let rolSeleccionado = $event as RolesEntity;
    this.rolN = rolSeleccionado;
    this.nombreRolN = rolSeleccionado?.name ?? '';
    console.log('rol seleccionado de la Lista:', this.nombreRolN);
    await this.getResponsablesRolList ();     
   /*  await this.diligenciarResponsablesAsignar();
   await this.diligenciarResponsablesAsignadosRolEntidad(); */
  }    


  /**
   * Consulta los resonsables del rol entidad.
   */
  public async getResponsablesList() {
    this.responsablesRolList = [];
    console.log('Edit entre a getresponsablesList:', this.entidadesIdEdit);
    try {
      const response = await firstValueFrom(
      this.entidadesService.getGroupsRol(
        this.rolesIdEdit ?? '',
        this.loggedUser?.user_name ?? ''     )
    );

   if (response?.respuesta) {
    this.responsablesRolList = response.respuesta.map(r => ({
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
    this.responsablesRolList = [];
    console.log('Entre a getResponsablesRolList: nombreROLN:', this.nombreRolN);
    try {
      const response = await firstValueFrom(
      this.entidadesService
        .getGroupsRol(this.nombreRolN ?? '','')
      );
       console.log('Edit getResponsablesRolList: responsablesasignadoslist1:', this.responsablesRolList);
      if (response?.respuesta) {
       this.responsablesRolList = response.respuesta.map(r => ({
        name: r,
        selected: false
  }));
}
console.log('Edit getResponsablesRolList: responsablesasignadoslist2:', this.responsablesRolList);
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
    console.log("estoy en create", this.entidadesIdEdit,this.userNameN,this.idEntidadN, this.nombreEntidadN, this.descripcionN, this.nombreRolN, this.responsablesAsignadosList);
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
              Constants.ERR_ENTIDADES_CREAR,
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


    public diligenciarResponsablesAsignar() {
      console.log('Entre a diligenciarrespasignar');
      this.responsablesAgregarList = [];
      if(this.responsablesRolList.length > 0 ) {
      this.responsablesRolList.forEach(responsable => {
        if (!this.responsablesAsignadosList.some(asignado => asignado === responsable )){
            this.responsablesAgregarList.push(responsable);
          }
         
        });
   } 
  }

 

  public diligenciarResponsablesAsignadosRolEntidad() {
   console.log('Entra adiligenciarrespasignados');
    if (this.editMode()) {
   
    this.responsablesAsignadosList =[];
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


  public retirar() {
  const nuevosAsignados: ResponsableEntity[] = [];
  this.responsablesAsignadosList = this.responsablesAsignadosList.filter(responsable => {
    if (responsable.selected) {
      responsable.selected = false;
      this.responsablesRolList.push(responsable);
      return false; // se elimina de la lista de asignados
    }
    return true; // permanece en asignados
  });
}

  public asignar() {
    
    this.responsablesAsignadosList.push(...this.responsablesRolList.some(responsable => responsable.selected) ? this.responsablesRolList.filter(responsable => responsable.selected) : []);
    this.responsablesRolList = this.responsablesRolList.filter(responsable => !responsable.selected);
    this.responsablesAsignadosList.forEach(responsable => { responsable.selected = false; });
  
  }

}
