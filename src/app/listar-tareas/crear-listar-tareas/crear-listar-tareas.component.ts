import { Component } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ListarTareaComponent } from '../listar-tareas.component';
import { LoginEntity } from '../../login/login.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { ListarTareaComponentInstanceService } from '../listar-tareas-component-instance.service';
import { ListarTareaService } from '../listar-tareas.service';
import { EstadoListarTareaEntity } from '../estado-listar-tareas.entity';
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
import { ListarTareasEntity } from '../listar-tareas.entity';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'ibpm-crear-listar-tareas',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './crear-listar-tareas.component.html',
  styleUrl: './crear-listar-tareas.component.scss',
})
/**
 * Componente para la creación y edición de workflows.
 * 
 */
export class CrearListarTareasComponent {
  public uc?: ListarTareaComponent;
  public loggedUser?: LoginEntity;
  public nombreN: string = '';
  public nombreLargoN: string = '';
  public descripcionN: string = '';
  public estadoN: string = '';
  public estadoObjectN?: EstadoListarTareaEntity;
  public fechaCreacionN: string = '';
  public supervisorN: string = '';
  public operationE: string = '';
  public operationsList: string[] = [];
  public restrictedOperationsList: string[] = [];
  public workflowIdEdit?: string;
  public supervisorObjectN?: UserEntity;

  public constructor(
    private workflowService: ListarTareaService,
    private companiasService: CompaniasService,
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private workflowComponentInstanceService: ListarTareaComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.workflowComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el formulario, carga listas y detecta modo de edición.
   */
  public async ngOnInit(): Promise<void> {
    if (this.uc) {
      this.uc.mensaje = '';
    }
    this.obtenerListaTareas();
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Modo Edición Habilitado. ListarTarea:', id);
    if (id) {
      this.workflowIdEdit = id;
      await this.llenarCamposEdicion();
      await this.seleccionarListarTareaActual();
    } else {
      this.workflowIdEdit = undefined;
    }
  }
  obtenerListaTareas() {
    throw new Error('Method not implemented.');
  }


  public async seleccionarListarTareaActual() {
    this.cookieService.set('workflowActual', this.workflowIdEdit ?? '', 1)
  }



  /**
   * Llena los campos del formulario con la información del workflow en edición.
   */
  public async llenarCamposEdicion(): Promise<void> {
    
    try {
      const response = await firstValueFrom(
        this.workflowService.getListarTarea(
          {
            idInstanciaWorkflow: this.workflowIdEdit ?? '',
            nombreWorkflow: '',
            numero: '',
            nombre: '',
            idInstanciaWorkflowPadre: '',
            nombreWorkflowPadre: '',
            nombreLargoTarea: '',
            nombreLargoProceso: '',
            nombreLargoProcesoPadre: '',
            responsable: '',
            valorNegocio: '',
            valorNegocio2: '',
            valorNegocio3: '',
            valorNegocio4: '',
            diasVencimiento: '',
            imagenesSemaforo: [],
            fechaDesde: [],
            fechaHasta: [],
            estado: undefined,
            fechaAsignacion: undefined
          },
        ),
      );
      if (response?.respuesta) {
        const workflow = response.respuesta as ListarTareasEntity;
        this.nombreN = workflow.nombre ?? '';
        this.nombreLargoN = workflow.nombreLargo ?? '';
        this.descripcionN = workflow.descripcion ?? '';
        this.estadoN = workflow.estado instanceof Date 
          ? workflow.estado.toString()
          : (workflow.estado ?? '');
        this.estadoObjectN = this.uc!.estados.find(
          (c) => c.name === this.estadoN,
        );
        this.fechaCreacionN = workflow.fechaCreacion
          ? new Date(workflow.fechaCreacion).toISOString()
          : new Date().toISOString();
      }
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_WORKFLOW_DATOS,
          e,
        );
      }
    }
      
  }

  /**
   * Indica si está en modo edición.
   */
  public editMode(): boolean {
    return this.workflowIdEdit !== undefined && this.workflowIdEdit !== '';
  }

  /**
   * Maneja el cambio de compañía seleccionada.
   */
  public onEstadoChange(event:any): void {
    console.log('Estado seleccionado:', event);
    this.estadoObjectN = event as EstadoListarTareaEntity;
    this.estadoN = event?.name ?? '';
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
   * Crea un nuevo workflow con los datos del formulario.
   */
  public create() {
    let workflow: ListarTareasEntity = {
       nombre: this.nombreN,
        nombreLargo: this.nombreLargoN,
        descripcion: this.descripcionN,
      estado: this.estadoObjectN?.name ?? this.estadoN,
      fechaCreacion: this.fechaCreacionN && this.fechaCreacionN.trim() ? new Date(this.fechaCreacionN) : undefined,
    }
    this.workflowService.createListarTarea(workflow)
      .subscribe({
        next: (response: { respuesta: any; }) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = '';
            }
            this.workflowIdEdit = this.nombreN;
            this.router.navigate([
              `/main-page/workflow/editarListarTarea?id=${this.nombreN}`,
            ]);
          }
        },
        error: (e: any) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_WORKFLOW_CREAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Edita el workflow existente con los datos proporcionados.
   */
  public edit() {
    let workflow: ListarTareasEntity = {
       nombre: this.nombreN,
        nombreLargo: this.nombreLargoN,
        descripcion: this.descripcionN,
      estado: this.estadoN ? new Date(this.estadoN) : undefined,
      fechaCreacion: this.fechaCreacionN ? new Date(this.fechaCreacionN) : undefined,
    }
    this.workflowService
      .editListarTarea(workflow)
      .subscribe({
        next: (response: { respuesta: any; }) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = '';
            }
            this.router.navigate([
              `/main-page/workflows/editarListarTarea?id=${this.nombreN}`,
            ]);
          }
        },
        error: (e: any) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_WORKFLOW_EDITAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Elimina el workflow actual.
   */
  public delete() {
    this.workflowService
      .deleteListarTarea(this.workflowIdEdit ?? '')
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.uc!.mensaje = '';
            this.router.navigate(['/main-page/workflow']);
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_WORKFLOW_ELIMINAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Cancela y regresa al listado de workflows.
   */
  public cancel() {
    if (this.uc) {
      this.uc.mensaje = '';
    }
    this.router.navigate(['/main-page/workflow']);
  }

  /**
   * Compara estados en el selector.
   */
  public compararEstados(c1: EstadoListarTareaEntity, c2: EstadoListarTareaEntity): boolean {
    return c1.name === c2.name && c1.code === c2.code;
  }
}