import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ObjetowComponent } from '../objetow.component';
import { ObjetowService } from '../objetow.service';
import { LoginEntity } from '../../login/login.entity';
import { MessageUtil } from '../../utils/message.util';
import { Constants } from '../../utils/constants';
import { ObjetowEntity } from '../objetow.entity';
import { AtributoObjetowEntity } from '../atributo-objetow.entity';

@Component({
  selector: 'ibpm-crear-objetow',
  imports: [FormsModule],
  templateUrl: './crear-objetow.component.html',
  styleUrl: './crear-objetow.component.scss',
})
export class CrearObjetowComponent {


  public nombreObjetoWN: string = '';
  public descripcionObjetoWN: string = '';
  public editMode: boolean = false;


  @Input() public uc?: ObjetowComponent;
  public loggedUser: LoginEntity | undefined;
  public workflowActual: string = '';
  public atributosW: AtributoObjetowEntity[] = [];


  
  constructor(private objetowService: ObjetowService) {}

  ngOnInit(): void {
    this.loggedUser = this.uc?.loggedUser;
    if(this.uc?.hayWorkflowActual()){
      this.workflowActual = this.uc?.workflowActual ?? '';
      this.cargarInfoObjetoWorkFlow();
    } else {
      this.editMode = false;
      this.nombreObjetoWN = '';
      this.descripcionObjetoWN = '';
      this.atributosW = [];
    }


  }

  // 🔹 Simulación / carga de estados
  private cargarInfoObjetoWorkFlow(): void {
    this.objetowService.obtenerObjetoWorkflow(this.workflowActual).subscribe({
      next: (response) => {
        console.log('Objeto Workflow obtenido:', response?.respuesta);
        if(response && response.respuesta && response.respuesta.nombre){
          this.editMode = true;
          this.nombreObjetoWN = response.respuesta.nombre;
          this.descripcionObjetoWN = response.respuesta.descripcion;
          this.atributosW = response.respuesta.attributes || [];
        } else {
          this.editMode = false;
          this.nombreObjetoWN = '';
          this.descripcionObjetoWN = ''; 
          this.atributosW = [];
        }
      },
      error: (e) => {
        if (this.uc) {
           this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_OBJETO_WORKFLOW_OBTENER,
               e,
            );
        }
      }
  });
  }

 

  // Ejecuta búsqueda
  public save(): void {
    if(this.isEditMode()){
      this.editarObjetoWorkflow();
    } else {
      this.crearObjetoWorkflow();
    }
  }

  private crearObjetoWorkflow(): void {
    let objetow: ObjetowEntity = {  
      nombre: this.nombreObjetoWN,
      nombreWorkflow: this.workflowActual,
      descripcion: this.descripcionObjetoWN,
      attributes: []
    };
    this.objetowService.crearObjetoWorkflow(objetow).subscribe({
      next: (response) => {
        console.log('Objeto Workflow creado:', response);
        if (this.uc) {
          this.uc.mensaje = 'Objeto Workflow creado exitosamente';
          this.editMode = true;              
        }
      },
      error: (e) => {
        if (this.uc) {
           this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_OBJETO_WORKFLOW_CREAR,
               e,
            );
        }
      }
    });
  }

  public editarObjetoWorkflow(): void {
    let objetow: ObjetowEntity = {
      nombre: this.nombreObjetoWN,
      nombreWorkflow: this.workflowActual,
      descripcion: this.descripcionObjetoWN,
      attributes: this.atributosW
    };
    this.objetowService.editarObjetoWorkflow(objetow).subscribe({
      next: (response) => {
        console.log('Objeto Workflow editado:', response);
        if (this.uc) {
          this.uc.mensaje = 'Objeto Workflow editado exitosamente';
        }
      },
      error: (e) => {
        if (this.uc) {
           this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_OBJETO_WORKFLOW_EDITAR,
               e,
            );
        }
      }
    });
  }

  public isEditMode(): boolean {
    return this.editMode;
  }

}

