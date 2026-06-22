import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { EventoInicioComponentInstanceService } from './eventoinicio-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { AccionesEventoInicioComponent } from './acciones-eventoinicio/acciones-eventoinicio.component';
import { EventoInicioEntity } from './eventoinicio.entity';
import { EventoInicioService } from './eventoinicio.service';
import { CookieService } from 'ngx-cookie-service';
import { EventoInicioFilterEntity } from './eventoinicio-filter.entity';

@Component({
  selector: 'ibpm-eventos-de-inicio',
  imports: [MatCardModule, RouterModule, AccionesEventoInicioComponent],
  templateUrl: './eventoinicio.component.html',
  styleUrl: './eventoinicio.component.scss',
})
export class EventoInicioComponent {
  public loggedUser: LoginEntity | undefined; 
  public eventosInicio: EventoInicioEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private eventoInicioService: EventoInicioService,
    private companiasService: CompaniasService,
    private eventoInicioComponentInstanceService: EventoInicioComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    console.log('Evento Inicio ENTRO ngOnInit');
    this.eventoInicioComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
   console.log('WORKFLOW COOKIE:', this.cookieService.get('workflowActual'));
    if(this.hayWorkflowActual()) {
      console.log('SI hay workflow → voy a buscar');
        this.buscarEventosInicio();
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
  public buscarEventosInicio(filtros?: EventoInicioFilterEntity): void {
    const workflowActual = this.cookieService.get('workflowActual');
    const body: EventoInicioFilterEntity = {
      nombreWorkflow: workflowActual,
      nombre: filtros?.nombre ?? '',
      modeloCarpeta: filtros?.modeloCarpeta ?? '',
      descripcion: filtros?.descripcion ?? '',
      editarDocProceso: filtros?.editarDocProceso ?? false,
      idSerie: filtros?.idSerie ?? '',
    };

    console.log('buscando eventos de inicio para el workflow:', workflowActual,body);

    this.eventoInicioService
      .getEventoInicioList(body)
      .subscribe({
          next: (response) => {
            this.eventosInicio = response.respuesta;
            this.mensaje = '';
          },
          error: (err) => {
            this.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_EVENTO_INICIO_LISTAR,
              err,
            );
          },
        });
        console.log('eventosInicio', Response, 'EI:',this.eventosInicio);
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

