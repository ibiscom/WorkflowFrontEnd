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
import { EventoInicioEntity } from '../eventoinicio.entity';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EventoInicioComponentInstanceService } from '../eventoinicio-component-instance.service';
import { EventoInicioService } from '../eventoinicio.service';
import { EventoInicioComponent } from '../eventoinicio.component';
import { CookieService } from 'ngx-cookie-service';
import { MetodoAsignacionPrimeraTareaEntity } from '../metodoasignacion-primeratarea.entity';
import { SerieEventoInicioEntity } from '../serie-eventoinicio.entity';
import { TipoDocumentoEventoInicioEntity } from '../tipodocumento-eventoinicio.entity';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { HerramientaEventoInicioEntity } from '../herramienta-eventoinicio.entity';
import { DocumentModelEntity } from '../document-model.entity';

@Component({
  selector: 'ibpm-crear-evento-inicio',
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
  templateUrl: './crear-eventoinicio.component.html',
  styleUrl: './crear-eventoinicio.component.scss',
})
/**
 * Componente para la creación y edición de grupos.
 * Permite seleccionar compañía, supervisor y administrar permisos/restricciones.
 */
export class CrearEventoInicioComponent {
  public metodosAsignacionList: any[] = [];
  public herramientaN?: HerramientaEventoInicioEntity;
  public metodoAsignacionN?: MetodoAsignacionPrimeraTareaEntity;
  public nombreMetodoAsignacionB: boolean = false;
  public nombreMetodoAsignacionN: string = 'No'
  public herramientasList: HerramientaEventoInicioEntity[] = [];
  public nombreEventoInicioN: string = '';
  public nombreLargoEventoInicioN: string = '';
  public descripcionEventoInicioN: string = '';
  public nombreHerramientaN: string = '';
  public modeloCarpetaN?: string;
   public uc?: EventoInicioComponent;
  public loggedUser?: LoginEntity;
  public eventoInicioIdEdit?: string;
  public workflowActual: string = '';
  public serieN?: SerieEventoInicioEntity;
  public idSerieN: string = '';
  public seriesList: SerieEventoInicioEntity[] = [];
  public tiposDocumentoList: TipoDocumentoEventoInicioEntity[] = [];
  public tiposDocumentoAsignadosEventoInicioList: TipoDocumentoEventoInicioEntity[] = [];
  public tiposDocumentoAgregarList: TipoDocumentoEventoInicioEntity[] = [];
  public modelosDocumentoEventoInicioE: DocumentModelEntity[] = [];
  public nombreLargoN: string = '';
  public descripcionN: string = '';
  public editarDocProcesoN: any = false;
  

  public constructor(
    private eventoInicioService: EventoInicioService,
    private loginService: LoginService,
    private eventoInicioComponentInstanceService: EventoInicioComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.eventoInicioComponentInstanceService.getInstance();
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
    await this.getHerramientasEventoInicioList();
    await this.getMetodosAsignacionList();
    await this.getSeriesList();
    if (id) {
      this.eventoInicioIdEdit = id;
      await this.fillEditFields();

    } else {
      this.eventoInicioIdEdit = undefined;
    }
  }
  
  
  /**
   * Llena los campos del formulario con la información de la tarea en edición.
   */
  public async fillEditFields(): Promise<void> {
   
    try {
      const response = await firstValueFrom(
        this.eventoInicioService.getEventoInicio(
          this.workflowActual ?? '',
          this.eventoInicioIdEdit ?? '',
          this.loggedUser?.user_name ?? '',
        ),
      );
      if (response?.respuesta) {
        const eventoInicio = response.respuesta as EventoInicioEntity;
        this.nombreEventoInicioN = eventoInicio.nombreEvento ?? '';
        this.nombreLargoEventoInicioN = eventoInicio.nombreLargo ?? '';
        this.modeloCarpetaN = eventoInicio.modeloCarpeta ?? '';
        this.descripcionEventoInicioN = eventoInicio.descripcion ?? '';
        this.nombreHerramientaN = eventoInicio.herramienta ?? '';
        this.herramientaN = this.herramientasList.find(h => h.code === this.nombreHerramientaN) ?? undefined;
        this.nombreMetodoAsignacionB = eventoInicio.usuarioIniciaTarea ?? false;
        this.metodoAsignacionN = this.metodosAsignacionList.find(m => m.code === this.nombreMetodoAsignacionN) ?? undefined;
        this.idSerieN = eventoInicio.docModels?.[0]?.idSerie ?? '';
        this.serieN = this.seriesList.find(s => s.code === this.idSerieN) ?? undefined;
        this.modelosDocumentoEventoInicioE = eventoInicio.docModels ?? [];
        await this.getTiposDocumentoListBySerie();
        await this.diligenciarTiposDocumentoAsignadosEventoInicio();
        await this.diligenciarTiposDocumentoAsignar();

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
   * Consulta las herramientas de evento de inicio.
   */
  public async getHerramientasEventoInicioList() {
    this.herramientasList = [];

    try {
      const response = await firstValueFrom(
        this.eventoInicioService
        .getHerramientas(this.workflowActual ?? ''));

        if (response && response.respuesta) {
          const ops = response.respuesta as HerramientaEventoInicioEntity[];
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
   * Consulta los métodos de asignación de la primera tarea.
   */
  public async getMetodosAsignacionList() {
    this.metodosAsignacionList = [];

    try {
      const response = await firstValueFrom(
        this.eventoInicioService
        .getMetodosAsignacion());

        if (response && response.respuesta) {
          const ops = response.respuesta as MetodoAsignacionPrimeraTareaEntity[];
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
        this.eventoInicioService        
          .getSeriesEventoInicio(this.loggedUser?.user_name ?? ''));

        if (response && response.respuesta) {
          const ops = response.respuesta as SerieEventoInicioEntity[];
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
        // TEMPORAL: Se rellenan series de evento de inicio por defecto en caso de error para evitar bloqueos en la creación de evento de inicio
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
    return this.eventoInicioIdEdit !== undefined && this.eventoInicioIdEdit !== '';
  }

  private buildEventoInicioPayload(): EventoInicioEntity {
    return {
      nombreWorkflow: this.workflowActual,
      usuario: this.loggedUser?.user_name ?? '',
      nombreEvento: this.nombreEventoInicioN,
      nombreLargo: this.nombreLargoEventoInicioN,
      modeloCarpeta: this.modeloCarpetaN ?? '',
      descripcion: this.descripcionEventoInicioN,
      herramienta: this.nombreHerramientaN,
      usuarioIniciaTarea: this.nombreMetodoAsignacionB,
      docModels: this.mapearModelosDocumentoEventoInicio(),
    };
  }

   /**
    * Guarda los cambios, creando o editando el evento de inicio según corresponda.
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
    this.eventoInicioService
      .createEventoInicio(this.buildEventoInicioPayload())
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = 'Se ha creado el evento de inicio exitósamente';
            }
            this.eventoInicioIdEdit = this.nombreEventoInicioN;
            this.router.navigate([
              `/main-page/eventos-de-inicio/editarEventoInicio?id=${this.nombreEventoInicioN}`,
            ]);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_EVENTO_INICIO_CREAR,
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
    this.eventoInicioService
      .editEventoInicio(this.buildEventoInicioPayload())
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.router.navigate([
              `/main-page/eventos-de-inicio/editarEventoInicio?id=${this.nombreEventoInicioN}`,
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
    this.eventoInicioService
      .deleteEventoInicio( this.eventoInicioIdEdit ?? '')
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.router.navigate(['/main-page/eventos-de-inicio']);
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
    this.router.navigate(['/main-page/eventos-de-inicio']);
  }


  public onMetodoAsignacionChange($event: any) {
    let metodoAsignacionSeleccionado = $event as MetodoAsignacionPrimeraTareaEntity;
    this.metodoAsignacionN = metodoAsignacionSeleccionado;
    this.nombreMetodoAsignacionN = metodoAsignacionSeleccionado.code ?? '';
  }

    public onHerramientaChange($event: any) {
    let herramientaSeleccionada = $event as HerramientaEventoInicioEntity;
    this.herramientaN = herramientaSeleccionada;
    this.nombreHerramientaN = herramientaSeleccionada?.code ?? '';
  } 


  public async onSerieChange($event: any) {
    let serieSeleccionada = $event as SerieEventoInicioEntity;
    this.serieN = serieSeleccionada;
    this.idSerieN = serieSeleccionada?.code ?? '';
    await this.getTiposDocumentoListBySerie();
    this.diligenciarTiposDocumentoAsignadosEventoInicio();
    this.diligenciarTiposDocumentoAsignar();

  }     

  public diligenciarTiposDocumentoAsignar() {
    this.tiposDocumentoAgregarList = [];
    if(this.tiposDocumentoList.length > 0 ) {
        this.tiposDocumentoList.forEach(tipoDoc => {
          if (!this.tiposDocumentoAsignadosEventoInicioList.some(asignado => asignado.code === tipoDoc.code)) {
            this.tiposDocumentoAgregarList.push(tipoDoc);
          }
        });
   } 
  }

  public diligenciarTiposDocumentoAsignadosEventoInicio() {
    this.tiposDocumentoAsignadosEventoInicioList = [];
    if(this.editMode()) {
      this.modelosDocumentoEventoInicioE.forEach(modeloDoc => {
        if(modeloDoc.idSerie === this.idSerieN) {
          const tipoDocAsignado: TipoDocumentoEventoInicioEntity = {
            code: modeloDoc.tipoDocumento ?? '',
            name: modeloDoc.tipoDocumento ?? '',
            obligatorio: modeloDoc.obligatoryTypeDocInTask ?? false,
            visible: true,
            selected: false
          };
          this.tiposDocumentoAsignadosEventoInicioList.push(tipoDocAsignado);
        }
     });
    }
  }

  public async getTiposDocumentoListBySerie() {
   this.tiposDocumentoList = [];
    try {
      const response = await firstValueFrom(
        this.eventoInicioService
          .getTiposDocumentoBySerie(this.idSerieN ?? '')
      );
        if (response && response.respuesta) {
          const ops = response.respuesta as TipoDocumentoEventoInicioEntity[];
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
    this.tiposDocumentoAgregarList.push(...this.tiposDocumentoAsignadosEventoInicioList.some(tipo => tipo.visible) ? this.tiposDocumentoAsignadosEventoInicioList.filter(tipo => tipo.visible) : []);
    this.tiposDocumentoAsignadosEventoInicioList = this.tiposDocumentoAsignadosEventoInicioList.filter(tipo => !tipo.visible);
    this.tiposDocumentoAgregarList.forEach(tipo => { tipo.visible = false; });
  }

  public asignar() {
    this.tiposDocumentoAsignadosEventoInicioList.push(...this.tiposDocumentoAgregarList.some(tipo => tipo.selected) ? this.tiposDocumentoAgregarList.filter(tipo => tipo.selected) : []);
    this.tiposDocumentoAgregarList = this.tiposDocumentoAgregarList.filter(tipo => !tipo.selected);
    this.tiposDocumentoAsignadosEventoInicioList.forEach(tipo => { tipo.selected = false; });
  }

  public toggleObligatorio(tipoDocEventoInicio: TipoDocumentoEventoInicioEntity) {
    tipoDocEventoInicio.obligatorio = !tipoDocEventoInicio.obligatorio;
  }

  public mapearModelosDocumentoEventoInicio(): DocumentModelEntity[] {
    if(this.tiposDocumentoAsignadosEventoInicioList.length === 0) {
      return [];
    }
    return this.tiposDocumentoAsignadosEventoInicioList.map(tipoDoc => {
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