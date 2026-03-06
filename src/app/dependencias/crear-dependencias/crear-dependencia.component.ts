import { Component } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { DependenciaComponent } from '../dependencia.component';
import { LoginEntity } from '../../login/login.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { DependenciaComponentInstanceService } from '../dependencia-component-instance.service';
import { DependenciaService } from '../dependencia.service';
import { DependenciaEntity } from '../dependencia.entity';
import { UserEntity } from '../../entities/users/user.entity';
import { MessageUtil } from '../../utils/message.util';
import { Constants } from '../../utils/constants';
import { firstValueFrom } from 'rxjs';
import { GroupEntity } from '../../entities/groups/group.entity';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CompaniasService } from '../../companias/companias.service';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { UserSearchFilterEntity } from '../../entities/users/user-search-filter.entity';
import { CookieService } from 'ngx-cookie-service';
import { EstadoDependenciaEntity } from '../estadodependencia.entity';
import { TareaDependenciaEntity } from '../tarea-dependencia.entity';
import { AnyCnameRecord } from 'dns';

@Component({
  selector: 'ibpm-crear-dependencia',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './crear-dependencia.component.html',
  styleUrl: './crear-dependencia.component.scss',
})
/**
 * Componente para la creación y edición de grupos.
 * 
 */
export class CrearDependenciaComponent {
  public workflowActual: string = '';
  public uc?: DependenciaComponent;
  public loggedUser?: LoginEntity;
  public nombreWorkflowN: string =  '';
  public nombreN: string= '';
  public nombreTareaCabezaN: string = '';
  public nombreTareaColaN: string =  '';
  public estadoN: string = '';
  public primitivaN:  string = '';
  public expresionN:  string =  '';
  public descripcionN: string = '';
  public nameN: string = '';
  public descriptionN: string = '';
  public dependenciasN: string = '';
  public estadoObjectN?: EstadoDependenciaEntity;
  public operationE: string = '';
  public operationsList: string[] = [];
  public restrictedOperationsList: string[] = [];
  public dependenciasList: DependenciaEntity[] = [];
  public dependenciaIdEdit?: string;
  public dependencia: any;
  public TareaObjectN?: TareaDependenciaEntity;
  public TareaN: string = '';
  public primitivaObjectN?: PrimitivaDependenciaEntity;

  public constructor(
    private dependenciaService: DependenciaService,
    private companiasService: CompaniasService,
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private dependenciaComponentInstanceService: DependenciaComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.dependenciaComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el formulario, carga listas y detecta modo de edición.
   */
  public async ngOnInit(): Promise<void> {
    this.workflowActual = this.cookieService.get("workflowActual");
    const id = this.route.snapshot.paramMap.get('id');
    /* this.obtenerListaEstados(); */
    console.log('Modo de edicion habilitado. Dependencia:', id);
    if (id) {
      this.dependenciaIdEdit = id;
      await this.llenarCamposEdicion();
    } else {
      this.dependenciaIdEdit = undefined;
      if (this.uc) {
        this.uc.mensaje = '';
      }
    }
  }

   
    
    /**
     * Llena los campos del formulario con la información de la dependencia en edición.
     */
    public async llenarCamposEdicion(): Promise<void> {
      
      try {
        const response = await firstValueFrom(
          this.dependenciaService.getDependencia(
            this.workflowActual ?? '',
            this.dependenciaIdEdit ?? '',
          ),
        );
        if (response?.respuesta) {
          const dependencia = response.respuesta as DependenciaEntity;
          this.nombreWorkflowN = dependencia.nombreWorkflow ?? '';
          this.nombreN = dependencia.nombre ?? '';
          this.nombreTareaCabezaN = dependencia.nombreTareaCabeza ?? '';
          this.nombreTareaColaN = dependencia.nombreTareaCola ?? '';
          this.estadoN = dependencia.estado ?? '';
          this.primitivaN = dependencia.primitiva ?? '';
          this.expresionN = dependencia.expresion ?? '';
          this.descripcionN = dependencia.descripcion ?? '';
               
        }
      } catch (e) {
        if (this.uc) {
          this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_OBTENIENDO_HERRAMIENTA,
            e,
          );
        }
      }
     }
  
    /**
     * Indica si está en modo edición.
     */
    public editMode(): boolean {
      return this.dependenciaIdEdit !== undefined && this.dependenciaIdEdit !== '';
    }
  
    /**
     * Maneja el cambio de Estado de la Tarea seleccionada.
     */
    public onEstadoChange(event:any): void {
      console.log('Estado seleccionado:', event);
      this.estadoObjectN = event as EstadoDependenciaEntity;
      this.estadoN = event?.name ?? '';
    }
  

      public onTareaChange(event:any): void {
      console.log('tarea seleccionada:', event);
      this.TareaObjectN = event as TareaDependenciaEntity;
      this.TareaN = event?.name ?? '';
    }

    public onPrimitivaChange(event:any): void {
      console.log('Primitiva seleccionada:', event);
      this.primitivaObjectN = event as PrimitivaDependenciaEntity;
      this.primitivaN = event?.name ?? '';
    }

    /**
     * Guarda los cambios, creando o editando la dependencia  según corresponda.
     */
    public save() {
      if (!this.editMode()) {
        this.create();
      } else {
        this.edit();
      }
    }
  
    /**
     * Crea una  nueva dependencia con los datos del formulario.
     */
    public create() {
      let dependencia: DependenciaEntity = {
          nombreWorkflow: this.nombreWorkflowN, 
          nombre:  this.nombreN,
          nombreTareaCabeza: this.nombreTareaCabezaN, 
          nombreTareaCola:  this.nombreTareaColaN, 
          estado: this.estadoN, 
          primitiva:this.primitivaN, 
          expresion: this.expresionN,
          descripcion:this.descripcionN, 
      }
      this.dependenciaService
        .createDependency(dependencia)
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              if (this.uc) {
                this.uc.mensaje = '';
              }
              this.dependenciaIdEdit = this.nombreN;
              this.router.navigate([
                `/main-page/dependencias/editardependencia?id=${this.nombreN}`,
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
     * Edita una dependencia existente con los datos proporcionados.
     */
    public edit() {
      this.dependenciaService
      .editDependencia({
         nombreWorkflow: this.nombreWorkflowN, 
          nombre:  this.nombreN,
          nombreTareaCabeza: this.nombreTareaCabezaN, 
          nombreTareaCola:  this.nombreTareaColaN, 
          estado: this.estadoN, 
          primitiva:this.primitivaN, 
          expresion: this.expresionN,
          descripcion:this.descripcionN, 
      } as DependenciaEntity)
      .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.router.navigate([
                `/main-page/dependencias/editarDependencia?id=${this.nombreN}`,
              ]);
            }
          },
          error: (e) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_HERRAMIENTA_EDITAR,
                e,
              );
            }
          },
        });
    }
  
    /**
     * Elimina la dependencia actual.
     */
    public delete() {
      this.dependenciaService
        .deleteDependencia(this.workflowActual ?? '')
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
             if(this.uc) {
              this.uc.buscarDependencias();
              this.uc.mensaje = Constants.MSG_HERRAMIENTA_ELIMINACION_EXITOSA;
            }
              this.router.navigate(['/main-page/dependencias']);
            }
          },
          error: (e) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_HERRAMIENTA_ELIMINAR,
                e,
              );
            }
          },
        });
    }
  
    /**
     * Cancela y regresa al listado de dependencias.
     */
    public cancel() {
      if (this.uc) {
        this.uc.mensaje = '';
        this.uc.buscarDependencias();
      }
      this.router.navigate(['/main-page/dependencias']);
    }
  
    /**
     * Compara estados en el selector.
     */
    public compararEstados(c1: EstadoDependenciaEntity, c2: EstadoDependenciaEntity): boolean {
      return c1.respuesta  === c2.respuesta;
    }
  

   public and() {
      if (!this.editMode()) {
        this.create();
      } else {
        this.edit();
      }
    }

     public or() {
      if (!this.editMode()) {
        this.create();
      } else {
        this.edit();
      }
    }


     public NOT() {
      if (!this.editMode()) {
        this.create();
      } else {
        this.edit();
      }
    }

     public atributo() {
      if (!this.editMode()) {
        this.create();
      } else {
        this.edit();
      }
    }
  
}