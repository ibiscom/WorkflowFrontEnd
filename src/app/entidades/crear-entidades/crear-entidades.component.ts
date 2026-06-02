import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class CrearEntidadesComponent implements OnInit, OnDestroy {
  private routeSub?: Subscription;
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
    this.userNameN = this.loggedUser?.user_name ?? '';
    if (this.uc) {
      this.uc.mensaje = '';
    }
    this.workflowActual = this.cookieService.get('workflowActual');
    await this.getRolesList();
    this.routeSub = this.route.paramMap.subscribe(async (params) => {
      await this.initFromRoute(params.get('id'));
    });
  }

  public ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private async initFromRoute(id: string | null): Promise<void> {
    this.resetFormState();
    if (id) {
      this.nombreIdEdit = id;
      await this.fillEditFields();
    } else {
      this.nombreIdEdit = undefined;
    }
  }

  private resetFormState(): void {
    this.nombreIdEdit = undefined;
    this.entidadesIdEdit = undefined;
    this.idEntidadN = 0;
    this.nombreEntidadN = '';
    this.descripcionN = '';
    this.nombreRolN = '';
    this.rolN = undefined;
    this.rolesIdEdit = undefined;
    this.responsablesN = [];
    this.responsablesRolList = [];
    this.responsablesAsignadosList = [];
    this.responsablesAgregarList = [];
  }

  private buildEntidadPayload(): EntidadesEntity {
    return {
      userName: this.userNameN,
      idEntidad: this.idEntidadN,
      nombre: this.nombreEntidadN,
      descripcion: this.descripcionN,
      nombreRol: this.nombreRolN,
      listaGrupos: this.responsablesAsignadosList.map((r) => r.name),
    };
  }

  private syncResponsablesN(): void {
    this.responsablesN = this.responsablesAsignadosList.map((r) => r.name);
  }

  private async resolveIdEntidadAfterCreate(
    createResponse: FsResponseEntity<unknown>,
  ): Promise<void> {
    const resp = createResponse.respuesta;
    if (resp && typeof resp === 'object' && 'idEntidad' in resp) {
      const id = (resp as EntidadesEntity).idEntidad;
      if (id) {
        this.idEntidadN = id;
        this.entidadesIdEdit = id;
        return;
      }
    }
    if (typeof resp === 'number' && resp > 0) {
      this.idEntidadN = resp;
      this.entidadesIdEdit = resp;
      return;
    }
    const getResponse = await firstValueFrom(
      this.entidadesService.getEntidad(0, this.nombreEntidadN),
    );
    if (getResponse?.respuesta) {
      const entidad = getResponse.respuesta as EntidadesEntity;
      this.idEntidadN = entidad.idEntidad ?? 0;
      this.entidadesIdEdit = entidad.idEntidad ?? 0;
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
        this.entidadesIdEdit = entidad.idEntidad ?? 0;
        this.idEntidadN = entidad.idEntidad ?? 0;
        console.log("FilledEditFields nombreIdEdit**", this.nombreIdEdit,this.responsablesN);
        this.responsablesN = entidad.listaGrupos;
        this.rolesIdEdit = entidad.nombreRol ?? '';
        this.nombreRolN = entidad.nombreRol ?? '';
        await this.getResponsablesList(); 
        await this.diligenciarResponsablesAsignadosEntidad();
        await this.diligenciarResponsablesAsignar();
      
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
    console.log('getRolesList Roles obtenidos:', response.respuesta);
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
  
  public async onrolChange($event: any): Promise<void> {
    const rolSeleccionado = $event as RolesEntity | null;
    this.rolN = rolSeleccionado ?? undefined;
    this.nombreRolN = rolSeleccionado?.name ?? '';
    if (!this.nombreRolN) {
      this.responsablesRolList = [];
      return;
    }
    await this.getResponsablesRolList();
    await this.diligenciarResponsablesAsignar();
    if (this.editMode()) {
      await this.diligenciarResponsablesAsignadosEntidad();
    }
  }


  /**
   * Consulta los resonsables del rol entidad.
   */
  public async getResponsablesList() {
    this.responsablesRolList = [];
    console.log('Edit entre a getresponsablesList:', this.rolesIdEdit ,
        this.loggedUser?.user_name ,  this.entidadesIdEdit);
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
    return this.nombreIdEdit !== undefined && this.nombreIdEdit !== '';
  console.log("rolesIdEdit", this.nombreIdEdit);
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
  public create(): void {
    void this.createAndPersistResponsables();
  }

  /**
   * Crea la entidad y encadena edit para persistir listaGrupos (create no los guarda en backend).
   */
  private async createAndPersistResponsables(): Promise<void> {
    this.syncResponsablesN();
    const createPayload = this.buildEntidadPayload();
    try {
      const createResponse = await firstValueFrom(
        this.entidadesService.createEntidad(createPayload),
      );
      if (!createResponse?.respuesta) {
        return;
      }
      await this.resolveIdEntidadAfterCreate(createResponse);
      this.nombreIdEdit = this.nombreEntidadN;
      const editResponse = await firstValueFrom(
        this.entidadesService.editEntidad(this.buildEntidadPayload()),
      );
      if (editResponse?.respuesta) {
        if (this.uc) {
          this.uc.mensaje =
            'Se ha creado la entidad y se guardaron los responsables exitosamente';
        }
        await this.router.navigate([
          '/main-page/entidades/editarEntidad',
          this.nombreEntidadN,
        ]);
      }
    } catch (e) {
      if (this.uc) {
        const msg = this.nombreIdEdit
          ? MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_TAREA_EDITAR,
              e,
            )
          : MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_ENTIDADES_CREAR,
              e,
            );
        this.uc.mensaje = this.nombreIdEdit
          ? `La entidad se creó pero no se pudieron guardar los responsables. ${msg}`
          : msg;
      }
    }
  }

  /**
   * Edita la entidad existente con los datos proporcionados.
   */
  public edit(): void {
    void this.persistEdit(true);
  }

  private async persistEdit(navigateAfterSuccess: boolean): Promise<void> {
    this.syncResponsablesN();
    try {
      const response = await firstValueFrom(
        this.entidadesService.editEntidad(this.buildEntidadPayload()),
      );
      if (response?.respuesta) {
        if (this.uc) {
          this.uc.mensaje = 'Se ha actualizado la entidad exitosamente';
        }
        if (navigateAfterSuccess) {
          await this.router.navigate([
            '/main-page/entidades/editarEntidad',
            this.nombreEntidadN,
          ]);
        }
      }
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_TAREA_EDITAR,
          e,
        );
      }
    }
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

 

  public diligenciarResponsablesAsignadosEntidad() {
   console.log('Entra adiligenciarrespasignadosEntidad',this.editMode());
   console.log('Responsables asignados:', this.responsablesAsignadosList);
  
   if (this.editMode()) {

    this.responsablesAsignadosList = this.responsablesN.map( 
    (responsable: string): ResponsableEntity => ({
    name: responsable,
    selected: false
    })
   );
       
    console.log(
      'Edit2 diligenciarresponsablesasignados.responsablesasignados:',
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
