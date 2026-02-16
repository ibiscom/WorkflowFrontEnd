import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { TareasComponentInstanceService } from './tareas-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { AccionesTareasComponent } from './acciones-tareas/acciones-tareas.component';
import { TareasEntity } from './tareas.entity';
import { TareasService } from './tareas.service';
import { CookieService } from 'ngx-cookie-service';
import { TareasFilterEntity } from './TareasFilterEntity';

@Component({
  selector: 'ibpm-tareas',
  imports: [MatCardModule, RouterModule, AccionesTareasComponent],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.scss',
})
export class TareasComponent {
  public loggedUser: LoginEntity | undefined;
  public tareas: TareasEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private tareasService: TareasService,
    private companiasService: CompaniasService,
    private tareasComponentInstanceService: TareasComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    console.log('ENTRO ngOnInit');
    this.tareasComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
   console.log('WORKFLOW COOKIE:', this.cookieService.get('workflowActual'));
    if(this.hayWorkflowActual()) {
      console.log('SI hay workflow → voy a buscar');
        this.buscarTareas();
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

   public buscarTareas(filtros?: TareasFilterEntity): void {
    console.log("FILTROS RECIBIDOS EN PADRE:", filtros);
      const workflowActual = this.cookieService.get('workflowActual');
      const body: TareasFilterEntity = {
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
  
      this.tareasService
        .getTareas(body)
        .subscribe({
          next: (response) => {
            this.tareas = response.respuesta;
            this.mensaje = '';
          },
          error: (err) => {
            this.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_OBTENIENDO_TAREAS,
              err,
            );
          },
        });
    }

  public getAllCompanies() {
    /*
    this.companiasService
      .getAllCompanies(this.loggedUser?.user_name ?? '')
      .subscribe({
        next: (response) => {
          this.companias = response.respuesta;
        },
        error: (err) => {
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_OBTENIENDO_COMPANIAS,
            err,
          );
        },
      });
      */
  }

  public searchTareas(tareasName?: string, supervisor?: string): void {
    /*
    let groupServerFilter: TareasSearchFilterEntity = {
      userName: this.loggedUser?.user_name ?? '',
      tareasName: tareasName ?? '',
      supervisor: supervisor ?? '',
    };

    this.gruposService.searchTareas(tareasServerFilter).subscribe({
      next: (response) => {
        this.tareas = response.respuesta;
      },
      error: (err) => {
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_BUSCAR_GRUPOS,
          err,
        );
      },
    });
    */
  }
}

