import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { IndicadorDeFlujoComponentInstanceService } from './indicadordeflujo-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { IndicadorDeFlujoService } from './indicadordeflujo.service';
import { CookieService } from 'ngx-cookie-service';
import { IndicadorDeFlujoFilterEntity } from './indicadordeflujoFilterEntity';
import { IndicadorDeFlujoEntity } from './indicadordeflujo.entity';

@Component({
  selector: 'ibpm-indicadordeflujo',
  imports: [MatCardModule, RouterModule,],
  templateUrl: './indicadordeflujo.component.html',
  styleUrl: './indicadordeflujo.component.scss',
})
export class IndicadorDeFlujoComponent {
  public loggedUser: LoginEntity | undefined;
  public indicadordeflujo: IndicadorDeFlujoEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private indicadordeflujoService: IndicadorDeFlujoService,
    private companiasService: CompaniasService,
    private indicadordeflujoComponentInstanceService: IndicadorDeFlujoComponentInstanceService ,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    console.log('ENTRO ngOnInit');
    this.indicadordeflujoComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
   console.log('WORKFLOW COOKIE:', this.cookieService.get('workflowActual'));
    if(this.hayWorkflowActual()) {
      console.log('SI hay workflow → voy a buscar');
        this.buscarIndicadorDeFlujo();
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

   public buscarIndicadorDeFlujo(filtros?: IndicadorDeFlujoFilterEntity): void {
    console.log("FILTROS RECIBIDOS EN PADRE:", filtros);
      const workflowActual = this.cookieService.get('workflowActual');
      const body: IndicadorDeFlujoFilterEntity = {
      nombreWorkflow: workflowActual,
      nombre: filtros?.nombre ?? '',
      estado: filtros?.estado ?? '',
      primitiva: filtros?.primitiva ?? '',
      expresion: filtros?.expresion ?? '',
      descripcion: filtros?.descripcion ?? ''
    };
   console.log("BODY FINAL:", body);
      console.log('BODY ENVIADO AL BACKEND:', body);
  
      this.indicadordeflujoService
        .getIndicadoresDeFlujo(body)
        .subscribe({
          next: (response) => {
            this.indicadordeflujo = response.respuesta;
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

