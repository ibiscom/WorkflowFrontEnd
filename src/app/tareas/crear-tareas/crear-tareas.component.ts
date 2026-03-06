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
import { TareaEntity } from '../tarea.entity';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TareasComponentInstanceService } from '../tareas-component-instance.service';
import { TareasService } from '../tareas.service';
import { TareasComponent } from '../tareas.component';
import { CookieService } from 'ngx-cookie-service';
import { TipoTareaEntity } from '../tipo-tarea.entity';
import { HerramientaTareaEntity } from '../herramienta-tarea.entity';
import { RolTareaEntity } from '../rol-tarea.entity';
import { MetodoAsignacionTareaEntity } from '../metodo-asignacion-tarea.entity';
import { SerieTareaEntity } from '../serie-tarea.entity';
import { TipoDocumentoTareaEntity } from '../tipo-documento-tarea.entity';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { DocumentModelEntity } from '../document-model.entity';

@Component({
  selector: 'ibpm-crear-tareas',
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
  templateUrl: './crear-tareas.component.html',
  styleUrl: './crear-tareas.component.scss',
})
/**
 * Componente para la creación y edición de grupos.
 * Permite seleccionar compañía, supervisor y administrar permisos/restricciones.
 */
export class CrearTareasComponent {
  public metodosAsignacionList: any[] = [];
  public herramientaN?: HerramientaTareaEntity;
  public rolesList: RolTareaEntity[] = [];
  public metodoAsignacionN?: MetodoAsignacionTareaEntity;
  public nombreMetodoAsignacionN: string = '';
  public rolN?: RolTareaEntity;
  public nombreRolN: string = '';
  public herramientasList: HerramientaTareaEntity[] = [];
  public numeroTareaN: string = '';
  public nombreTareaN: string = '';
  public nombreLargoN: string = '';
  public estadoObjetoN: string = '';
  public modeloCarpetaN: string = '';
  public descripcionN: string = '';
  public tipoN?: TipoTareaEntity;
  public nombreTipoN: string = '';
  public nombreHerramientaN: string = '';
  public uc?: TareasComponent;
  public loggedUser?: LoginEntity;
  public tareasIdEdit?: string;
  public workflowActual: string = '';
  public tiposList: TipoTareaEntity[] = [];
  public serieN?: SerieTareaEntity;
  public idSerieN: string = '';
  public seriesList: SerieTareaEntity[] = [];
  public tiposDocumentoList: TipoDocumentoTareaEntity[] = [];
  public tiposDocumentoAsignadosTareaList: TipoDocumentoTareaEntity[] = [];
  public tiposDocumentoAgregarList: TipoDocumentoTareaEntity[] = [];
  public modelosDocumentoTareaE: DocumentModelEntity[] = [];
  public diasDuracionEstimadaN: string = '';
  public horasDuracionEstimadaN: string = '';
  public minutosDuracionEstimadaN: string = '';
  public segundosDuracionEstimadaN: string = '';
  public diasAlarmaAmarillaN: string = '';
  public horasAlarmaAmarillaN: string = '';
  public minutosAlarmaAmarillaN: string = '';
  public segundosAlarmaAmarillaN: string = '';
  public editarDocProcesoN: boolean = false;

  public constructor(
    private tareasService: TareasService,
    private loginService: LoginService,
    private tareasComponentInstanceService: TareasComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.tareasComponentInstanceService.getInstance();
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
    await this.getTiposTareaList();
    await this.getHerramientasTareaList();
    await this.getRolesList();
    await this.getMetodosAsignacionList();
    await this.getSeriesList();
    await this.getTiposDocumentoListBySerie();
    await this.diligenciarTiposDocumentoAsignadosTarea();
    await this.diligenciarTiposDocumentoAsignar();
    if (id) {
      this.tareasIdEdit = id;
      await this.fillEditFields();

    } else {
      this.tareasIdEdit = undefined;
    }
  }
  
  


  

  /**
   * Llena los campos del formulario con la información de la tarea en edición.
   */
  public async fillEditFields(): Promise<void> {
   
    try {
      const response = await firstValueFrom(
        this.tareasService.getTarea(
          this.workflowActual ?? '',
          this.tareasIdEdit ?? '',
          this.loggedUser?.user_name ?? '',
        ),
      );
      if (response?.respuesta) {
        const tarea = response.respuesta as TareaEntity;
        this.numeroTareaN = tarea.numero ? tarea.numero.toString() : '';
        this.nombreTareaN = tarea.nombre ?? '';
        this.nombreLargoN = tarea.nombreLargo ?? '';
        this.estadoObjetoN = tarea.estadoTarea ?? '';
        this.modeloCarpetaN = tarea.modeloCarpeta ?? '';
        this.descripcionN = tarea.descripcion ?? '';
        this.nombreTipoN = tarea.tipo ?? '';
        this.tipoN = this.tiposList.find(t => t.code === this.nombreTipoN) ?? undefined;
        this.nombreHerramientaN = tarea.herramienta ?? '';
        this.herramientaN = this.herramientasList.find(h => h.code === this.nombreHerramientaN) ?? undefined;
        this.nombreRolN = tarea.rol ?? '';
        this.rolN = this.rolesList.find(r => r.code === this.nombreRolN) ?? undefined;
        this.nombreMetodoAsignacionN = tarea.metodoAsignacion ?? '';
        this.metodoAsignacionN = this.metodosAsignacionList.find(m => m.code === this.nombreMetodoAsignacionN) ?? undefined;
        this.diasDuracionEstimadaN = tarea.diasDuracionEstimada ? tarea.diasDuracionEstimada.toString() : '';
        this.horasDuracionEstimadaN = tarea.horasDuracionEstimada ? tarea.horasDuracionEstimada.toString() : '';
        this.minutosDuracionEstimadaN = tarea.minutosDuracionEstimada ? tarea.minutosDuracionEstimada.toString() : '';
        this.segundosDuracionEstimadaN = tarea.segundosDuracionEstimada ? tarea.segundosDuracionEstimada.toString() : '';
        this.diasAlarmaAmarillaN = tarea.diasAlarmaAmarilla ? tarea.diasAlarmaAmarilla.toString() : '';
        this.horasAlarmaAmarillaN = tarea.horasAlarmaAmarilla ? tarea.horasAlarmaAmarilla.toString() : '';
        this.minutosAlarmaAmarillaN = tarea.minutosAlarmaAmarilla ? tarea.minutosAlarmaAmarilla.toString() : '';
        this.segundosAlarmaAmarillaN = tarea.segundosAlarmaAmarilla ? tarea.segundosAlarmaAmarilla.toString() : '';
        this.editarDocProcesoN = tarea.editarDocProceso ?? false;
        this.idSerieN = tarea.docModels?.[0]?.idSerie ?? '';
        this.serieN = this.seriesList.find(s => s.code === this.idSerieN) ?? undefined;
        this.modelosDocumentoTareaE = tarea.docModels ?? [];

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
   * Consulta los tipos de tarea.
   */
  public async getTiposTareaList() {
    this.tiposList = [];

    try {
      const response = await firstValueFrom(
      this.tareasService
        .getTipos()
      );

      if (response && response.respuesta) {
        const ops = response.respuesta as TipoTareaEntity[];
        this.tiposList.push(...ops);
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
   * Consulta las herramientas de tarea.
   */
  public async getHerramientasTareaList() {
    this.herramientasList = [];

    try {
      const response = await firstValueFrom(
        this.tareasService
        .getHerramientas(this.workflowActual ?? ''));

        if (response && response.respuesta) {
          const ops = response.respuesta as HerramientaTareaEntity[];
            this.herramientasList.push(...ops);
        }
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje =
          error.status === 400
            ? ''
            : MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_HERRAMIENTA_TAREA_ENCONTRAR,
                error,
              );
      }
    }
  }

  /**
   * Consulta los roles de tarea.
   */
  public async getRolesList() {
    this.rolesList = [];

    try {
      const response = await firstValueFrom(
        this.tareasService
        .getRoles());

        if (response && response.respuesta) {
          const ops = response.respuesta as RolTareaEntity[];
            this.rolesList.push(...ops);
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
   * Consulta los métodos de asignación de tarea.
   */
  public async getMetodosAsignacionList() {
    this.metodosAsignacionList = [];

    try {
      const response = await firstValueFrom(
        this.tareasService
        .getMetodosAsignacion());

        if (response && response.respuesta) {
          const ops = response.respuesta as MetodoAsignacionTareaEntity[];
            this.metodosAsignacionList.push(...ops);
        }
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje =
          error.status === 400
            ? ''
            : MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_METODO_ASIGNACION_TAREA_ENCONTRAR,
                error,
              );
      }
    }
  }

  /**
   * Consulta las series de tarea.
   */
  public async getSeriesList() {
    this.seriesList = [];
    try {
      const response = await firstValueFrom(
        this.tareasService        
          .getSeriesTareas(this.loggedUser?.user_name ?? ''));

        if (response && response.respuesta) {
          const ops = response.respuesta as SerieTareaEntity[];
          this.seriesList.push(...ops);
        }
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje =
          error.status === 400
            ? ''
            : MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_SERIE_TAREA_ENCONTRAR,
                error,
              );
        // TEMPORAL: Se rellenan series de tarea por defecto en caso de error para evitar bloqueos en la creación de tareas
        this.seriesList.push(
          { code: 'Acciones Populares', name: 'Acciones Populares' },
          { code: 'Serie2', name: 'Serie 2' },
          { code: 'Serie3', name: 'Serie 3' },
        );
      }
    }
  }

  /**
   * Indica si está en modo edición.
   */
  public editMode(): boolean {
    return this.tareasIdEdit !== undefined && this.tareasIdEdit !== '';
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
    this.tareasService
      .createTarea({
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
            if (this.uc) {
              this.uc.mensaje = 'Se ha creado la tarea exitósamente';
            }
            this.tareasIdEdit = this.nombreTareaN;
            this.router.navigate([
              `/main-page/tareas/editarTarea?id=${this.nombreTareaN}`,
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
   * Edita la tarea existente con los datos proporcionados.
   */
  public edit() {
    this.tareasService
      .editTareas({
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
              `/main-page/tareas/editarTarea?id=${this.nombreTareaN}`,
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
   * Elimina la tarea actual.
   */
  public delete() {
    this.tareasService
      .deleteTarea( this.tareasIdEdit ?? '')
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.router.navigate(['/main-page/tareas']);
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
   * Cancela y regresa al listado de tareas.
   */
  public cancel() {
    if (this.uc) {
      this.uc.mensaje = '';
    }
    this.router.navigate(['/main-page/tareas']);
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
    this.idSerieN = serieSeleccionada?.code ?? '';
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
        if(modeloDoc.idSerie === this.idSerieN) {
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
        this.tareasService
          .getTiposDocumentoBySerie(this.idSerieN ?? '')
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

      //TEMPORAL: Se rellenan tipos de documento por defecto en caso de error para evitar bloqueos en la creación de tareas
      /*this.tiposDocumentoList.push(
        { code: 'Demanda', name: 'Demanda' },
        { code: 'Poder', name: 'Poder' },
        { code: 'Solicitud de Antecedentes', name: 'Solicitud de Antecedentes' },
        { code: 'Pruebas', name: 'Pruebas' },
        { code: 'Fallo de primera instancia', name: 'Fallo de primera instancia' },
        { code: 'Notificacion', name: 'Notificacion' },
        { code: 'Fallo de segunda instancia', name: 'Fallo de segunda instancia' },
      );*/
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
        nombreSerie: this.serieN?.name ?? '',
        obligatoryTypeDocInTask: tipoDoc.obligatorio ?? false,
        editableTypeDocInTask: this.editarDocProcesoN
      };
      return modelo;
    });
}
}