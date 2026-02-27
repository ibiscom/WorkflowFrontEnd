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
  ResponsablesAgregarList: never[];
 

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
    await this.getRolesList();
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
      .createTarea({
        nombreWorkflow: this.workflowActual,
        usuario: this.loggedUser?.user_name ?? '',
        descripcion: this.descripcionN,
        rol: this.nombreRolN,
        subProceso: '',
        sincronico: '',
        responsable: '',
        docModels: this.mapearModelosDocumentoTarea(),
      } as TareaEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = '';
            }
            this.rolesIdEdit = this.nombreTareaN;
            this.router.navigate([
              `/main-page/roles/editarTarea?id=${this.nombreTareaN}`,
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
      .editRoles({
        nombreWorkflow: this.workflowActual,
        usuario: this.loggedUser?.user_name ?? '',
        numero: this.numeroTareaN ? parseInt(this.numeroTareaN) : undefined,
        nombre: this.nombreTareaN,
        nombreLargo: this.nombreLargoN,
        estadoTarea: this.estadoObjetoN,
        modeloCarpeta: this.modeloCarpetaN,
        descripcion: this.descripcionN,
        tipo: this.nombreTipoN,
        herramienta: this.nombreHerramientaN,
        rol: this.nombreRolN,
        metodoAsignacion: this.nombreMetodoAsignacionN,
        subProceso: '',
        sincronico: '',
        responsable: '',
        diasDuracionEstimada: this.diasDuracionEstimadaN ? parseInt(this.diasDuracionEstimadaN) : undefined,
        horasDuracionEstimada: this.horasDuracionEstimadaN ? parseInt(this.horasDuracionEstimadaN) : undefined,
        minutosDuracionEstimada: this.minutosDuracionEstimadaN ? parseInt(this.minutosDuracionEstimadaN) : undefined,
        segundosDuracionEstimada: this.segundosDuracionEstimadaN ? parseInt(this.segundosDuracionEstimadaN) : undefined,
        diasAlarmaAmarilla: this.diasAlarmaAmarillaN ? parseInt(this.diasAlarmaAmarillaN) : undefined,
        horasAlarmaAmarilla: this.horasAlarmaAmarillaN ? parseInt(this.horasAlarmaAmarillaN) : undefined,
        minutosAlarmaAmarilla: this.minutosAlarmaAmarillaN ? parseInt(this.minutosAlarmaAmarillaN) : undefined,
        segundosAlarmaAmarilla: this.segundosAlarmaAmarillaN ? parseInt(this.segundosAlarmaAmarillaN) : undefined,
        editarDocProceso: this.editarDocProcesoN,
        docModels: this.mapearModelosDocumentoTarea(),
      } as TareaEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.router.navigate([
              `/main-page/roles/editarTarea?id=${this.nombreTareaN}`,
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
      .deleteTarea( this.rolesIdEdit ?? '')
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
  
  public async onSerieChange($event: any) {
    let serieSeleccionada = $event as SerieTareaEntity;
    this.serieN = serieSeleccionada;
    this.nombreSerieN = serieSeleccionada?.code ?? '';
    await this.getTiposDocumentoListBySerie();
    this.diligenciarTiposDocumentoAsignadosTarea();
    this.diligenciarTiposDocumentoAsignar();

  }     

  public diligenciarTiposDocumentoAsignar() {
    this.tiposDocumentoAgregarList = [];
    if(this.tiposDocumentoList.length > 0 ) {
        this.tiposDocumentoList.forEach(tipoDoc => {
          if (!this.tiposDocumentoAsignadosTareaList.some(asignado => asignado.code === tipoDoc.code)) {
            this.tiposDocumentoAgregarList.push(tipoDoc);
          }
        });
   } 
  }

  public diligenciarTiposDocumentoAsignadosTarea() {
    this.tiposDocumentoAsignadosTareaList = [];
    if(this.editMode()) {
      this.modelosDocumentoTareaE.forEach(modeloDoc => {
        if(modeloDoc.nombreSerie === this.nombreSerieN) {
          const tipoDocAsignado: TipoDocumentoTareaEntity = {
            code: modeloDoc.tipoDocumento ?? '',
            name: modeloDoc.tipoDocumento ?? '',
            obligatorio: modeloDoc.obligatoryTypeDocInTask ?? false,
            visible: true,
            selected: false
          };
          this.tiposDocumentoAsignadosTareaList.push(tipoDocAsignado);
        }
     });
    }
  }

  public async getTiposDocumentoListBySerie() {
   this.tiposDocumentoList = [];
    try {
      const response = await firstValueFrom(
        this.rolesService
          .getTiposDocumentoBySerie(this.nombreSerieN ?? '')
      );
        if (response && response.respuesta) {
          const ops = response.respuesta as TipoDocumentoTareaEntity[];
          this.tiposDocumentoList.push(...ops);
        }
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje =
          error.status === 400
            ? ''
            : MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_TIPO_DOCUMENTO_TAREA_ENCONTRAR,
                error,
              );
      }

      //TEMPORAL: Se rellenan tipos de documento por defecto en caso de error para evitar bloqueos en la creación de roles
      this.tiposDocumentoList.push(
        { code: 'Demanda', name: 'Demanda' },
        { code: 'Poder', name: 'Poder' },
        { code: 'Solicitud de Antecedentes', name: 'Solicitud de Antecedentes' },
        { code: 'Pruebas', name: 'Pruebas' },
        { code: 'Fallo de primera instancia', name: 'Fallo de primera instancia' },
        { code: 'Notificacion', name: 'Notificacion' },
        { code: 'Fallo de segunda instancia', name: 'Fallo de segunda instancia' },
      );
    }
  }
  
  public retirar() {
    this.tiposDocumentoAgregarList.push(...this.tiposDocumentoAsignadosTareaList.some(tipo => tipo.visible) ? this.tiposDocumentoAsignadosTareaList.filter(tipo => tipo.visible) : []);
    this.tiposDocumentoAsignadosTareaList = this.tiposDocumentoAsignadosTareaList.filter(tipo => !tipo.visible);
    this.tiposDocumentoAgregarList.forEach(tipo => { tipo.visible = false; });
  }

  public asignar() {
    this.tiposDocumentoAsignadosTareaList.push(...this.tiposDocumentoAgregarList.some(tipo => tipo.selected) ? this.tiposDocumentoAgregarList.filter(tipo => tipo.selected) : []);
    this.tiposDocumentoAgregarList = this.tiposDocumentoAgregarList.filter(tipo => !tipo.selected);
    this.tiposDocumentoAsignadosTareaList.forEach(tipo => { tipo.selected = false; });
  }

  public toggleObligatorio(tipoDocTarea: TipoDocumentoTareaEntity) {
    tipoDocTarea.obligatorio = !tipoDocTarea.obligatorio;
  }

  public mapearModelosDocumentoTarea(): DocumentModelEntity[] {
    if(this.tiposDocumentoAsignadosTareaList.length === 0) {
      return [];
    }
    return this.tiposDocumentoAsignadosTareaList.map(tipoDoc => {
      const modelo: DocumentModelEntity = {
        tipoDocumento: tipoDoc.code,
        idSerie: this.serieN?.code ?? '',
        nombreSerie: this.nombreSerieN,
        obligatoryTypeDocInTask: tipoDoc.obligatorio ?? false,
        editableTypeDocInTask: this.editarDocProcesoN
      };
      return modelo;
    });
}
}