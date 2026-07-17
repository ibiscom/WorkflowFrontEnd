import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { FinalizarprocesoComponentInstanceService } from './finalizarproceso-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { FinalizarprocesoEntity } from './finalizarproceso.entity';
import { FinalizarprocesoService } from './finalizarproceso.service';
import { CookieService } from 'ngx-cookie-service';
import { FinalizarprocesoFilterEntity } from './finalizarprocesoFilterEntity';

@Component({
  selector: 'ibpm-finalizarproceso',
  imports: [MatCardModule, RouterModule,],
  templateUrl: './finalizarproceso.component.html',
  styleUrl: './finalizarproceso.component.scss',
})
export class FinalizarprocesoComponent {
  public loggedUser: LoginEntity | undefined;
  public finalizarproceso: FinalizarprocesoEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private finalizarprocesoService: FinalizarprocesoService,
    private companiasService: CompaniasService,
    private finalizarprocesoComponentInstanceService: FinalizarprocesoComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    console.log('ENTRO ngOnInit');
    this.finalizarprocesoComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
   console.log('WORKFLOW COOKIE:', this.cookieService.get('workflowActual'));
    if(this.hayWorkflowActual()) {
      console.log('SI hay workflow → voy a buscar');
        this.buscarFinalizarproceso();
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

   public buscarFinalizarproceso(filtros?: FinalizarprocesoFilterEntity): void {
    console.log("FILTROS RECIBIDOS EN PADRE:", filtros);
      const workflowActual = this.cookieService.get('workflowActual');
      const body: FinalizarprocesoFilterEntity = {
      nombreWorkflow: workflowActual,
      nombre: filtros?.nombre ?? '',
      estado: filtros?.estado ?? '',
      primitiva: filtros?.primitiva ?? '',
      expresion: filtros?.expresion ?? '',
      descripcion: filtros?.descripcion ?? ''
    };
   console.log("BODY FINAL:", body);
      console.log('BODY ENVIADO AL BACKEND:', body);
  
      this.finalizarprocesoService
        .getFinalizarproceso(body)
        .subscribe({
          next: (response) => {
            this.finalizarproceso = response.respuesta;
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

