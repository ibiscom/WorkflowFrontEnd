import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ConsultarPorFlujoComponentInstanceService } from './consultarporflujo-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { ConsultarPorFlujoService } from './consultarporflujo.service';
import { CookieService } from 'ngx-cookie-service';
import { ConsultarPorFlujoFilterEntity } from './consultarporflujoFilterEntity';
import { ConsultarPorFlujoEntity } from './consultarporflujo.entity';

@Component({
  selector: 'ibpm-consultarporflujo',
  imports: [MatCardModule, RouterModule,],
  templateUrl: './consultarporflujo.component.html',
  styleUrl: './consultarporflujo.component.scss',
})
export class ConsultarPorFlujoComponent {
  public loggedUser: LoginEntity | undefined;
  public consultarporflujo: ConsultarPorFlujoEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private consultarporflujoService: ConsultarPorFlujoService,
    private companiasService: CompaniasService,
    private consultarporflujoComponentInstanceService: ConsultarPorFlujoComponentInstanceService ,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    console.log('ENTRO ngOnInit');
    this.consultarporflujoComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
   console.log('WORKFLOW COOKIE:', this.cookieService.get('workflowActual'));
    if(this.hayWorkflowActual()) {
      console.log('SI hay workflow → voy a buscar');
        this.buscarConsultarPorFlujo();
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

   public buscarConsultarPorFlujo(filtros?: ConsultarPorFlujoFilterEntity): void {
    console.log("FILTROS RECIBIDOS EN PADRE:", filtros);
      const workflowActual = this.cookieService.get('workflowActual');
      const body: ConsultarPorFlujoFilterEntity = {
      nombreWorkflow: workflowActual,
      nombre: filtros?.nombre ?? '',
      estado: filtros?.estado ?? '',
      primitiva: filtros?.primitiva ?? '',
      expresion: filtros?.expresion ?? '',
      descripcion: filtros?.descripcion ?? ''
    };
   console.log("BODY FINAL:", body);
      console.log('BODY ENVIADO AL BACKEND:', body);
  
      this.consultarporflujoService
        .getConsultarPorFlujo(body)
        .subscribe({
          next: (response) => {
            this.consultarporflujo = response.respuesta;
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

}

