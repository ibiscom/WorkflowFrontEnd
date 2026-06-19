import { Component } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { WorkflowComponent } from '../listar-tareas.component';
import { LoginEntity } from '../../login/login.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { WorkflowComponentInstanceService } from '../listar-tareas-component-instance.service';
import { WorkflowService } from '../listar-tareas.service';
import { EstadoWorkflowEntity } from '../estado-listar-tareas.entity';
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
import { WorkflowEntity } from '../listar-tareas.entity';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'ibpm-crear-workflow',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './crear-workflow.component.html',
  styleUrl: './crear-workflow.component.scss',
})
/**
 * Componente para la creación y edición de workflows.
 * 
 */
export class CrearWorkflowComponent {
  public uc?: WorkflowComponent;
  public loggedUser?: LoginEntity;
  public nombreN: string = '';
  public nombreLargoN: string = '';
  public descripcionN: string = '';
  public estadoN: string = '';
  public estadoObjectN?: EstadoWorkflowEntity;
  public fechaCreacionN: string = '';
  public supervisorN: string = '';
  public operationE: string = '';
  public operationsList: string[] = [];
  public restrictedOperationsList: string[] = [];
  public workflowIdEdit?: string;
  public supervisorObjectN?: UserEntity;

  public constructor(
    private workflowService: WorkflowService,
    private companiasService: CompaniasService,
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private workflowComponentInstanceService: WorkflowComponentInstanceService,
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
    this.obtenerListaEstados();
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Modo Edición Habilitado. Workflow:', id);
    if (id) {
      this.workflowIdEdit = id;
      await this.llenarCamposEdicion();
      await this.seleccionarWorkflowActual();
    } else {
      this.workflowIdEdit = undefined;
    }
  }


  public async seleccionarWorkflowActual() {
    this.cookieService.set('workflowActual', this.workflowIdEdit ?? '', 1)
  }

  /**
   * Carga la lista de estados de workflow disponibles para selección.
   */
  public obtenerListaEstados() {
    this.uc!.obtenerEstados();
  }

  /**
   * Llena los campos del formulario con la información del workflow en edición.
   */
  public async llenarCamposEdicion(): Promise<void> {
    
    try {
      const response = await firstValueFrom(
        this.workflowService.getWorkflow(
          this.workflowIdEdit ?? '',
        ),
      );
      if (response?.respuesta) {
        const workflow = response.respuesta as WorkflowEntity;
        this.nombreN = workflow.nombre ?? '';
        this.nombreLargoN = workflow.nombreLargo ?? '';
        this.descripcionN = workflow.descripcion ?? '';
        this.estadoN = workflow.estado ?? '';
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
    this.estadoObjectN = event as EstadoWorkflowEntity;
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
    let workflow: WorkflowEntity = {
       nombre: this.nombreN,
        nombreLargo: this.nombreLargoN,
        descripcion: this.descripcionN,
        estado: this.estadoN,
    }
    this.workflowService
      .createWorkflow(workflow)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = '';
            }
            this.workflowIdEdit = this.nombreN;
            this.router.navigate([
              `/main-page/workflow/editarWorkflow?id=${this.nombreN}`,
            ]);
          }
        },
        error: (e) => {
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
    let workflow: WorkflowEntity = {
       nombre: this.nombreN,
        nombreLargo: this.nombreLargoN,
        descripcion: this.descripcionN,
        estado: this.estadoN,
    }
    this.workflowService
      .editWorkflow(workflow)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.router.navigate([
              `/main-page/workflows/editarWorkflow?id=${this.nombreN}`,
            ]);
          }
        },
        error: (e) => {
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
      .deleteWorkflow(this.workflowIdEdit ?? '')
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
  public compararEstados(c1: EstadoWorkflowEntity, c2: EstadoWorkflowEntity): boolean {
    return c1.name === c2.name && c1.code === c2.code;
  }
}