import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ConsultarPorObjetoComponentInstanceService } from './consultarporobjeto-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { ConsultarPorObjetoService } from './consultarporobjeto.service';
import { CookieService } from 'ngx-cookie-service';
import { ConsultarPorObjetoFilterEntity } from './consultarporobjetoFilterEntity';
import { ConsultarPorObjetoEntity } from './consultarporobjeto.entity';

@Component({
  selector: 'ibpm-consultarporobjeto',
  imports: [MatCardModule, RouterModule,],
  templateUrl: './consultarporobjeto.component.html',
  styleUrl: './consultarporobjeto.component.scss',
})
export class ConsultarPorObjetoComponent {
  public loggedUser: LoginEntity | undefined;
  public consultarporobjeto: ConsultarPorObjetoEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private consultarporobjetoService: ConsultarPorObjetoService,
    private companiasService: CompaniasService,
    private consultarporobjetoComponentInstanceService: ConsultarPorObjetoComponentInstanceService ,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    console.log('ENTRO ngOnInit');
    this.consultarporobjetoComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
   console.log('WORKFLOW COOKIE:', this.cookieService.get('workflowActual'));
    if(this.hayWorkflowActual()) {
      console.log('SI hay workflow → voy a buscar');
        this.buscarConsultarPorObjeto();
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

   public buscarConsultarPorObjeto(filtros?: ConsultarPorObjetoFilterEntity): void {
    console.log("FILTROS RECIBIDOS EN PADRE:", filtros);
      const workflowActual = this.cookieService.get('workflowActual');
      const body: ConsultarPorObjetoFilterEntity = {
      nombreWorkflow: workflowActual,
      nombre: filtros?.nombre ?? '',
      estado: filtros?.estado ?? '',
      primitiva: filtros?.primitiva ?? '',
      expresion: filtros?.expresion ?? '',
      descripcion: filtros?.descripcion ?? ''
    };
   console.log("BODY FINAL:", body);
      console.log('BODY ENVIADO AL BACKEND:', body);
  
      this.consultarporobjetoService
        .getConsultarPorObjeto(body)
        .subscribe({
          next: (response) => {
            this.consultarporobjeto = response.respuesta;
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

