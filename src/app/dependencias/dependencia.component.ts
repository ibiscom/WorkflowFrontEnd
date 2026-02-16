import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { DependenciaComponentInstanceService } from './dependencia-component-instance.service';
import { DependenciaService } from './dependencia.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { DependenciaEntity } from './dependencia.entity';
import { AccionesDependenciaComponent } from './acciones-dependencias/acciones-dependencia.component';
import { DependenciaFilterEntity } from './dependencia-filter.entity';
import { EstadoDependenciaEntity } from './estadoDependencia.entity';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'ibpm-dependencia',
  imports: [MatCardModule, RouterModule, AccionesDependenciaComponent],
  templateUrl: './dependencia.component.html',
  styleUrl: './dependencia.component.scss',
})
export class DependenciaComponent {
  searchDependencys() {
    throw new Error('Method not implemented.');
  }
  public loggedUser: LoginEntity | undefined;
  public dependencia: DependenciaEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private dependenciaService: DependenciaService,
    private dependenciaComponentInstanceService: DependenciaComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    console.log('ENTRO ngOnInit');
    this.dependenciaComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
   console.log('WORKFLOW COOKIE:', this.cookieService.get('workflowActual'));
    if(this.hayWorkflowActual()) {
      console.log('SI hay workflow → voy a buscar');
        this.buscarDependencias();
    }
    else {
    console.log('NO hay workflow');
         }

      }
  
   public hayWorkflowActual(): boolean {
    this.workflowActual = this.cookieService.get("workflowActual");
    if (this.workflowActual === '') { 
      this.mensaje = Constants.ERR_WORKFLOW_NO_SELECCIONADO;
      return false;
    }
    return true;
  }

  /**
    public  buscarDependencias(filtros?:DependenciaFilterEntity): void {
     this.dependenciaService
       .getDependencies(filtros || {})
      .subscribe({
        next: (response) => {
          this.dependencia = response.respuesta;
          this.mensaje = '';
        },
         error: (err) => {
           this.mensaje = MessageUtil.buildErrorMessageFsResponse(
             Constants.ERR_OBTENIENDO_DEPENDENCIAS,
             err,
           );
         },
       });
   }
*/
 public buscarDependencias(filtros?: DependenciaFilterEntity): void {
  console.log("FILTROS RECIBIDOS EN PADRE:", filtros);
    const workflowActual = this.cookieService.get('workflowActual');
    const body: DependenciaFilterEntity = {
    nombreWorkflow: workflowActual,
    nombre: filtros?.nombre ?? '',
    nombreTareaCabeza: filtros?.nombreTareaCabeza ?? '',
    nombreTareaCola: filtros?.nombreTareaCola ?? '',
    estado: filtros?.estado ?? '',
    primitiva: filtros?.primitiva ?? '',
    expresion: filtros?.expresion ?? '',
    descripcion: filtros?.descripcion ?? ''
  };
 console.log("BODY FINAL:", body);
    console.log('BODY ENVIADO AL BACKEND:', body);

    this.dependenciaService
      .getDependencies(body)
      .subscribe({
        next: (response) => {
          this.dependencia = response.respuesta;
          this.mensaje = '';
        },
        error: (err) => {
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_OBTENIENDO_DEPENDENCIAS,
            err,
          );
        },
      });
  }
}




/**
    public obtenerEstado(): void {
    this.dependenciaService
      .getEstado()
      .subscribe({
        next: (response) => {
          this.estado = response.respuesta;
        },
        error: (err) => {
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_OBTENIENDO_ESTADO_DEPENDENCIA,
            err,
          );
        },
      });
      

  }
      */

