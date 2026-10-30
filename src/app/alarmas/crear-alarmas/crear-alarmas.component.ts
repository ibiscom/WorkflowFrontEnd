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
import { AlarmaComponentInstanceService } from '../alarmas-component-instance.service';
import { AlarmaService } from '../alarmas.service';
import { AlarmaComponent } from '../alarmas.component';
import { AlarmaEntity } from '../alarmas.entity';
import { AtributoAlarmaEntity } from '../atributo-alarma.entity';
import { TipoAlarmaEntity } from '../tipo-alarma.entity';
import { CookieService } from 'ngx-cookie-service';
import { TareasService } from '../../tareas/tareas.service';
import { TareaEntity } from '../../tareas/tarea.entity';
import { DependenciaService } from '../../dependencias/dependencia.service';
import { ObjetowService } from '../../objetosw/objetow.service';
import { AtributoObjetowEntity } from '../../objetosw/atributo-objetow.entity';
import { EstadoTareaAlarmaEntity } from '../estado-tarea-alarma.entity';

@Component({
  selector: 'ibpm-crear-alarma',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './crear-alarmas.component.html',
  styleUrl: './crear-alarmas.component.scss',
})
/**
 * Componente para la creación y edición de atributos de objetos workflow.
 * Permite seleccionar compañía, supervisor y administrar permisos/restricciones.
 */
export class CrearAlarmaComponent {
tiposalarmasList: TipoAlarmaEntity[] = [];
tareasList: TareaEntity[] = [];
estadosList: EstadoTareaAlarmaEntity[] = [];
atributosWorkflowList: AtributoObjetowEntity[] = [];
mailsDestinosN: any;
destinatariosN: any;
remitenteN: any;
asuntoN: any;
mailN: any;
tipo: any;
atributoN: any;
onTareaChange($event: any) {
throw new Error('Method not implemented.');
}
tareaN: string = '';

onResponsableChange($event: any) {
throw new Error('Method not implemented.');
}

  public uc?: AlarmaComponent;
  public loggedUser?: LoginEntity;
  public nombreN: string= '';
  public descripcionN: string= '';
  public identificadorNegocioN: string= '';
  public labelIdentificadorNegocioN: string= '';
  public atrAlarmaIdEdit?: string;
  public supervisorObjectN?: UserEntity;
  public workflowActual: string | undefined;
  public nombrelargoN: string | undefined;
  public fechaCreacionN: string | undefined;
  public tipoTareaTiempoN: string | undefined;
  public estadoN: string | undefined;
  public numeroN: string | undefined;
  public nombreWorkflowN: string | undefined;
  public estadoTareaN: string | undefined;
  public tipoN: string | undefined;
  public idN: number | undefined;
  public diaAvisoN: number | undefined;
  public horaAvisoN: number | undefined;
  public minutosAvisoN: number | undefined;
  public segundosAvisoN: number | undefined;
  public diaLimiteN: number | undefined;
  public horaLimiteN: number | undefined;
  public minutosLimiteN: number | undefined;
  public segundosLimiteN: number | undefined;
  public tareaInmediataN: boolean | undefined;
  public estadoNoEjecucionN: string | undefined;
  public incluirResponsableN: boolean | undefined;
  public nombreAtributoN: string | undefined;
  public valorN: string | undefined;

  public atributos: AtributoAlarmaEntity[] = [];


  public constructor(
    private alarmaService: AlarmaService,
    private companiasService: CompaniasService,
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private alarmaComponentInstanceService: AlarmaComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private tareasService: TareasService,
    private dependenciaService: DependenciaService,
    private objetowService: ObjetowService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.alarmaComponentInstanceService.getInstance();
  }

  /**
   * Tipos de alarmas que se pueden crear. Se inicializan al cargar el componente.
   */
public async ngOnInit(): Promise<void> {
  this.workflowActual =
    this.uc?.workflowActual || this.cookieService.get('workflowActual');

  if (this.uc) {
    this.uc.mensaje = '';
  }

  await Promise.all([
    this.cargarTiposAlarma(),
    this.cargarTareas(),
    this.cargarEstados(),
    this.cargarAtributos(),
  ]);

  const id = this.route.snapshot.paramMap.get('id');
  console.log('ENTRO ngOnInit',id);
  if (id) {
    this.atrAlarmaIdEdit = id;
    await this.fillEditFields();
  } else {
    this.atrAlarmaIdEdit = undefined;
  }
}

  private tiposAlarmaPorDefecto(): TipoAlarmaEntity[] {
    return [
      { id: '1', nombre: 'Mail', tipotareatiempo: '' },
      { id: '2', nombre: 'Terminar tarea', tipotareatiempo: '' },
      { id: '3', nombre: 'Mail-Manual', tipotareatiempo: '' },
      { id: '4', nombre: 'Mail-Proceso', tipotareatiempo: '' },
      { id: '5', nombre: 'Mail-Día', tipotareatiempo: '' },
    ];
  }

  public nombreOpcion(item: any): string {
    if (item == null) {
      return '';
    }
    if (typeof item === 'string') {
      return item;
    }
    return item.nombre ?? item.name ?? item.code ?? '';
  }

  private async cargarTiposAlarma(): Promise<void> {
    try {
      const response = await firstValueFrom(this.alarmaService.getTiposAlarma());
      const tipos = Array.isArray(response?.respuesta) ? response.respuesta : [];
      this.tiposalarmasList = tipos
        .map((tipo: any, index: number) => ({
          id: String(tipo.id ?? tipo.code ?? index),
          nombre: this.nombreOpcion(tipo),
          tipotareatiempo: tipo.tipotareatiempo ?? tipo.tipoTareaTiempo ?? '',
        }))
        .filter((tipo) => tipo.nombre);
      if (this.tiposalarmasList.length === 0) {
        this.tiposalarmasList = this.tiposAlarmaPorDefecto();
      }
    } catch {
      this.tiposalarmasList = this.tiposAlarmaPorDefecto();
    }
  }

  private async cargarTareas(): Promise<void> {
    this.tareasList = [];
    if (!this.workflowActual) {
      return;
    }
    try {
      const response = await firstValueFrom(
        this.tareasService.getTareas({ nombreWorkflow: this.workflowActual }),
      );
      this.tareasList = Array.isArray(response?.respuesta)
        ? response.respuesta
        : [];
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_OBTENIENDO_TAREAS,
          e,
        );
      }
    }
  }

  private async cargarEstados(): Promise<void> {
    this.estadosList = [];
    try {
      const response = await firstValueFrom(this.alarmaService.getEstadosTareasAlarma());
      const estados = Array.isArray(response?.respuesta) ? response.respuesta : [];
      this.estadosList = estados.map((e: any, index: number) => ({
        code: String(e.code ?? e.id ?? index),
        name: this.nombreOpcion(e),
      } as EstadoTareaAlarmaEntity));
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_OBTENIENDO_ESTADO_DEPENDENCIA,
          e,
        );
      }
    }
  }

  private async cargarAtributos(): Promise<void> {
    this.atributosWorkflowList = [];
    if (!this.workflowActual) {
      return;
    }
    try {
      const response = await firstValueFrom(
        this.objetowService.obtenerAtributosObjetoWorkflow(this.workflowActual),
      );
      this.atributosWorkflowList = Array.isArray(response?.respuesta)
        ? response.respuesta
        : [];
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_BUSCAR_OBJETOW,
          e,
        );
      }
    }
  }

  /**
   * Llena los campos del formulario con la información de la alarma seleccionada en edición.
   */
  public async fillEditFields(): Promise<void> {
    
    try {
      const response = await firstValueFrom(
        this.alarmaService.obtenerAlarma(
      /*    this.uc?.workflowActual ?? '',*/
          this.atrAlarmaIdEdit ?? '',
        ),
      );
      if (response?.respuesta) {
        console.log('response', response);
        const alarma = response.respuesta as AlarmaEntity;
       
        this.workflowActual = this.uc?.workflowActual ?? '';
        this.nombreN = alarma?.tarea?.nombre ?? '';
        this.nombrelargoN = alarma?.tarea?.nombreLargo ?? '';
        this.fechaCreacionN = alarma?.workflow?.fechaCreacion ?? '';
        this.descripcionN = alarma?.tarea?.descripcion ?? '';
        this.estadoN = alarma?.workflow?.estado ?? '';
        this.nombreWorkflowN =
          alarma?.tarea?.nombreWorkflow ?? alarma?.workflow?.nombre ?? '';
        this.numeroN = String(alarma?.tarea?.numero ?? '');
        this.tipoN = alarma?.tipo ?? '';
        this.idN = alarma?.id ?? 0;
        this.estadoTareaN = alarma?.estadoTarea ?? '';
        this.diaAvisoN = alarma?.diaAviso ?? 0;
        this.horaAvisoN = alarma?.horaAviso ?? 0;
        this.minutosAvisoN = alarma?.minutosAviso ?? 0;
        this.segundosAvisoN = alarma?.segundosAviso ?? 0;
        this.diaLimiteN = alarma?.diaLimite ?? 0;
        this.horaLimiteN = alarma?.horaLimite ?? 0;
        this.minutosLimiteN = alarma?.minutosLimite ?? 0;
        this.segundosLimiteN = alarma?.segundosLimite ?? 0;
        this.tareaInmediataN = alarma?.tareaInmediata ?? true;
        this.estadoNoEjecucionN = alarma?.estadoNoEjecucion ?? '';
        this.incluirResponsableN = alarma?.incluirResponsable ?? true;
        this.nombreAtributoN = alarma?.nombreAtributo ?? '';
        this.valorN = alarma?.valorAtributo ?? '';
        this.tipoTareaTiempoN = alarma?.atributos?.[0]?.tipoTareaTiempo ?? '';
        this.tareaN = alarma?.tarea?.nombreLargo ?? '';
        this.onAlarmaChange(this.tipoN);
        this.atributos = alarma?.atributos ?? [];
        
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
    return this.atrAlarmaIdEdit !== undefined && this.atrAlarmaIdEdit !== '';
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
    this.alarmaService
      .crearAlarma({
        workflowActual: this.workflowActual ?? '',
        nombre: this.nombreN,
        nombrelargo: this.nombrelargoN,
        fechaCreacion: this.fechaCreacionN,
        descripcion: this.descripcionN,
        estado: this.estadoN,
        nombreWorkflow: this.nombreWorkflowN,
        numero: this.numeroN,
        tipo: this.tipoN,
        id: this.idN,
        estadoTarea: this.estadoTareaN,
        diaAviso: this.diaAvisoN,
        horaAviso: this.horaAvisoN,
        minutosAviso: this.minutosAvisoN,
        segundosAviso: this.segundosAvisoN,
        diaLimite: this.diaLimiteN,
        horaLimite: this.horaLimiteN,
        minutosLimite: this.minutosLimiteN,
        segundosLimite: this.segundosLimiteN,
        tareaInmediata: this.tareaInmediataN,
        estadoNoEjecucion: this.estadoNoEjecucionN,
        incluirResponsable: this.incluirResponsableN,
        nombreAtributo: this.nombreAtributoN,
        valor: this.valorN,
        tipoTareaTiempo: this.tipoTareaTiempoN,
      } as unknown as AlarmaEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.ngOnInit();
              this.uc.mensaje = Constants.ATRIBUTO_OBJETO_WORKFLOW_CREAR_EXITOSO;
            }
            this.atrAlarmaIdEdit = this.nombreN;
            this.router.navigate([
              `/main-page/alarmas`,
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
    this.alarmaService
      .editarAlarma({
        workflowActual: this.workflowActual ?? '',
        nombre: this.nombreN,
        nombrelargo: this.nombrelargoN,
        fechaCreacion: this.fechaCreacionN,
        descripcion: this.descripcionN,
        estado: this.estadoN,
        nombreWorkflow: this.nombreWorkflowN,
        numero: this.numeroN,
        tipo: this.tipoN,
        id: this.idN,
        estadoTarea: this.estadoTareaN,
        diaAviso: this.diaAvisoN,
        horaAviso: this.horaAvisoN,
        minutosAviso: this.minutosAvisoN,
        segundosAviso: this.segundosAvisoN,
        diaLimite: this.diaLimiteN,
        horaLimite: this.horaLimiteN,
        minutosLimite: this.minutosLimiteN,
        segundosLimite: this.segundosLimiteN,
        tareaInmediata: this.tareaInmediataN,
        estadoNoEjecucion: this.estadoNoEjecucionN,
        incluirResponsable: this.incluirResponsableN,
        nombreAtributo: this.nombreAtributoN,
        valor: this.valorN,
        tipoTareaTiempo: this.tipoTareaTiempoN,
      } as unknown as AlarmaEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
              if (this.uc) {
                this.uc.ngOnInit();
                this.uc.mensaje =
                  Constants.ATRIBUTO_OBJETO_WORKFLOW_EDITAR_EXITOSO;
              }
            this.router.navigate([
              `/main-page/alarmas`,
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
    this.alarmaService
      .eliminarAlarma(this.uc?.workflowActual ?? '', this.nombreN ?? '')
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
                this.uc.ngOnInit();
                this.uc.mensaje =
                  Constants.ATRIBUTO_OBJETO_WORKFLOW_ELIMINAR_EXITOSO;
              }
            this.router.navigate([
              `/main-page/alarmas`,
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
    this.router.navigate(['/main-page/alarmas']);
  }


/**
   * Campos que se visualizan al seleccionar un tipo de alarma
   */
  
public mostrarTarea = false;
public mostrarEstado = false;
public mostrarTiempo = false;
public mostrarResponsable = false;
public mostrarAtributo = false;

public onAlarmaChange($event: any): void {

  this.atributos = [];

   // Valores por defecto
  this.mostrarTarea = true;
  this.mostrarEstado = true;
  this.mostrarTiempo = true;
  this.mostrarResponsable = true;
  this.mostrarAtributo = true;


  const tipo = typeof $event === 'string'
      ? $event
      : $event.nombre;

  switch (tipo) {

    case 'Mail':

        this.mostrarTarea = true;
        this.mostrarEstado = true;
        this.mostrarTiempo = true;
        this.mostrarResponsable = true;
        this.mostrarAtributo = false;
      this.atributos.push(
        { id: 1, nombre: 'Mails_Destinos', valor: '', tipo: 'input', tipoTareaTiempo: ''},
        { id: 2, nombre: 'Destinatarios', valor: '', tipo: 'input', tipoTareaTiempo: '' },
        { id: 3, nombre: 'Asunto', valor: '', tipo: 'input', tipoTareaTiempo: '' },
        { id: 4, nombre: 'Remitente', valor: '', tipo: 'input', tipoTareaTiempo: '' },
        { id: 5, nombre: 'Mail', valor: '', tipo: 'input', tipoTareaTiempo: '' }
      );
      break;


    case 'Mail-Manual':
        this.mostrarTarea = false;
        this.mostrarEstado = false;
        this.mostrarTiempo = false;
        this.mostrarResponsable = false;
        this.mostrarAtributo = false;

      this.atributos.push(
        { id: 1, nombre: 'Mails_Destinos', valor: '', tipo: 'input', tipoTareaTiempo: '' },
        { id: 2, nombre: 'Destinatarios', valor: '', tipo: 'input', tipoTareaTiempo: '' },
        { id: 3, nombre: 'Remitente', valor: '', tipo: 'input', tipoTareaTiempo: '' },
        { id: 4, nombre: 'Asunto', valor: '', tipo: 'input', tipoTareaTiempo: '' },
        { id: 5, nombre: 'Mail', valor: '', tipo: 'textarea', tipoTareaTiempo: '' }
      );
      break;

     case 'Mail-Proceso':

        this.mostrarTarea = false;
        this.mostrarEstado = false;
        this.mostrarTiempo = true;
        this.mostrarResponsable = false;
      this.atributos.push(
        { id: 1, nombre: 'Mails_Destinos', valor: '', tipo: 'input', tipoTareaTiempo: ''},
        { id: 2, nombre: 'Destinatarios', valor: '', tipo: 'input', tipoTareaTiempo: '' },
        { id: 3, nombre: 'Asunto', valor: '', tipo: 'input', tipoTareaTiempo: '' },
        { id: 4, nombre: 'Remitente', valor: '', tipo: 'input', tipoTareaTiempo: '' },
        { id: 5, nombre: 'Mail', valor: '', tipo: 'input', tipoTareaTiempo: '' }
      );
      break;

        case 'Mail-Día':

        this.mostrarTarea = true;
        this.mostrarEstado = false;
        this.mostrarTiempo = false;
        this.mostrarResponsable = false;

      this.atributos.push(
        { id: 1, nombre: 'Mails_Destinos', valor: '', tipo: 'input', tipoTareaTiempo: ''},
        { id: 2, nombre: 'Destinatarios', valor: '', tipo: 'input', tipoTareaTiempo: '' },
        { id: 3, nombre: 'Asunto', valor: '', tipo: 'input', tipoTareaTiempo: '' },
        { id: 4, nombre: 'Remitente', valor: '', tipo: 'input', tipoTareaTiempo: '' },
        { id: 5, nombre: 'Mail', valor: '', tipo: 'input', tipoTareaTiempo: '' }
      );
      break;
  }

  console.log(this.atributos);
}

  

  public camposDuracionVisible():boolean {
    return !(this.nombreAtributoN === undefined) && !(this.nombreAtributoN==="") && !this.nombreAtributoN?.includes("Mail-Dia") && !this.nombreAtributoN?.includes("Mail-Proceso") && !this.nombreAtributoN?.includes("Tarea Manual");
  }
}
