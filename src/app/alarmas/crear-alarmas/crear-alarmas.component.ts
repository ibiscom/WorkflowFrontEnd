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
onTareaChange($event: any) {
throw new Error('Method not implemented.');
}
alarmasList: any;
tareaN: any;

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
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.alarmaComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el formulario, carga listas y detecta modo de edición.
   */
  public async ngOnInit(): Promise<void> {
    if (this.uc) {
      this.uc.mensaje = '';
    }
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Edit Mode On. Group Id:', id);
    if (id) {
      this.atrAlarmaIdEdit = id;
      await this.fillEditFields();
    } else {
      this.atrAlarmaIdEdit = undefined;
    }
  }

  /**
   * Llena los campos del formulario con la información del grupo en edición.
   */
  public async fillEditFields(): Promise<void> {
    
    try {
      const response = await firstValueFrom(
        this.alarmaService.obtenerAlarmas(this.uc?.workflowActual  ?? '')
      );
      if (response?.respuesta) {
        const atributos = response.respuesta as AlarmaEntity[];
        const atributo = atributos.find(attr => attr.nombre === this.atrAlarmaIdEdit);
       
        this.workflowActual = this.uc?.workflowActual ?? '';
        this.nombreN = atributo?.nombre ?? '';
        this.nombrelargoN = atributo?.nombrelargo ?? '';
        this.fechaCreacionN = atributo?.fechaCreacion ?? '';
        this.descripcionN = atributo?.descripcion ?? '';
        this.estadoN = atributo?.estado ?? '';
        this.nombreWorkflowN = atributo?.nombreWorkflow ?? '';
        this.numeroN = atributo?.numero ?? '';
        this.tipoN = atributo?.tipo ?? '';
        this.idN = atributo?.id ?? 0;
        this.estadoTareaN = atributo?.estadoTarea ?? '';
        this.diaAvisoN = atributo?.diaAviso ?? 0;
        this.horaAvisoN = atributo?.horaAviso ?? 0;
        this.minutosAvisoN = atributo?.minutosAviso ?? 0;
        this.segundosAvisoN = atributo?.segundosAviso ?? 0;
        this.diaLimiteN = atributo?.diaLimite ?? 0;
        this.horaLimiteN = atributo?.horaLimite ?? 0;
        this.minutosLimiteN = atributo?.minutosLimite ?? 0;
        this.segundosLimiteN = atributo?.segundosLimite ?? 0;
        this.tareaInmediataN = atributo?.tareaInmediata ?? true;
        this.estadoNoEjecucionN = atributo?.estadoNoEjecucion ?? '';
        this.incluirResponsableN = atributo?.incluirResponsable ?? true;
        this.nombreAtributoN = atributo?.nombreAtributo ?? '';
        this.valorN = atributo?.valor ?? '';
        this.tipoTareaTiempoN = atributo?.tipoTareaTiempo ?? '';
        
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


  public onAlarmaChange($event: string) {
    this.atributos = [];
    //obteniendo del microservicio de con atributos tarea tiempo
    switch ($event) {
      case 'Mail':
        this.atributos.push({ id: 1, nombre: 'Mails_Destinos', valor: '', tipoTareaTiempo: 'Mail' });
        this.atributos.push({ id: 2, nombre: 'Destinatarios', valor: '', tipoTareaTiempo: 'Mail' });
        this.atributos.push({ id: 3, nombre: 'Asunto', valor: '', tipoTareaTiempo: 'Mail' });
        this.atributos.push({ id: 4, nombre: 'Remitente', valor: '', tipoTareaTiempo: 'Mail' });
        this.atributos.push({ id: 5, nombre: 'Mail', valor: '', tipoTareaTiempo: 'Mail' });
      break;        
      case 'Mail Manual':
        this.atributos.push({ id: 1, nombre: 'Mails_Destinos', valor: '', tipoTareaTiempo: 'Mail Manual' });
        this.atributos.push({ id: 2, nombre: 'Destinatarios', valor: '', tipoTareaTiempo: 'Mail Manual' });
        this.atributos.push({ id: 3, nombre: 'Remitente', valor: '', tipoTareaTiempo: 'Mail Manual' });
        this.atributos.push({ id: 4, nombre: 'Asunto', valor: '', tipoTareaTiempo: 'Mail Manual' });
        this.atributos.push({ id: 5, nombre: 'Mail', valor: '', tipoTareaTiempo: 'Mail Manual' });
      break;  
      

    }
  } 

  public camposDuracionVisible():boolean {
    return !(this.nombreAtributoN === undefined) && !(this.nombreAtributoN==="") && !this.nombreAtributoN?.includes("Mail-Dia") && !this.nombreAtributoN?.includes("Mail-Proceso") && !this.nombreAtributoN?.includes("Tarea Manual");
  }
}
