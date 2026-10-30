import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ConsultarPorResponsableComponentInstanceService } from './consultarporresponsable-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { ConsultarPorResponsableService } from './consultarporresponsable.service';
import { CookieService } from 'ngx-cookie-service';
import { ConsultarPorResponsableFilterEntity } from './consultarporresponsableFilterEntity';
import { ConsultarPorResponsableEntity } from './consultarporresponsable.entity';

@Component({
  selector: 'ibpm-consultarporresponsable',
  imports: [MatCardModule, RouterModule,],
  templateUrl: './consultarporresponsable.component.html',
  styleUrl: './consultarporresponsable.component.scss',
})
export class ConsultarPorResponsableComponent {
  public loggedUser: LoginEntity | undefined;
  public consultarporresponsable: ConsultarPorResponsableEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private consultarporresponsableService: ConsultarPorResponsableService,
    private companiasService: CompaniasService,
    private consultarporresponsableComponentInstanceService: ConsultarPorResponsableComponentInstanceService ,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    console.log('ENTRO ngOnInit');
    this.consultarporresponsableComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
   console.log('WORKFLOW COOKIE:', this.cookieService.get('workflowActual'));
    if(this.hayWorkflowActual()) {
      console.log('SI hay workflow → voy a buscar');
        this.buscarConsultarPorResponsable();
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

   public buscarConsultarPorResponsable(filtros?: ConsultarPorResponsableFilterEntity): void {
    console.log("FILTROS RECIBIDOS EN PADRE:", filtros);
      const workflowActual = this.cookieService.get('workflowActual');
      const body: ConsultarPorResponsableFilterEntity = {
      nombreWorkflow: workflowActual,
      nombre: filtros?.nombre ?? '',
      estado: filtros?.estado ?? '',
      primitiva: filtros?.primitiva ?? '',
      expresion: filtros?.expresion ?? '',
      descripcion: filtros?.descripcion ?? ''
    };
   console.log("BODY FINAL:", body);
      console.log('BODY ENVIADO AL BACKEND:', body);
  
      this.consultarporresponsableService
        .getConsultarPorResponsable(body)
        .subscribe({
          next: (response) => {
            this.consultarporresponsable = response.respuesta;
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

