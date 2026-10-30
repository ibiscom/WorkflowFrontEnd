import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { DistribuirtareaComponentInstanceService } from './distribuirtarea-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { DistribuirtareaEntity } from './distribuirtarea.entity';
import { DistribuirtareaService } from './distribuirtarea.service';
import { CookieService } from 'ngx-cookie-service';
import { DistribuirTareaFilterEntity} from './distribuirtareaFilterEntity';

@Component({
  selector: 'ibpm-distribuirtarea',
  imports: [MatCardModule, RouterModule,],
  templateUrl: './distribuirtarea.component.html',
  styleUrl: './distribuirtarea.component.scss',
})
export class DistribuirtareaComponent {
  public loggedUser: LoginEntity | undefined;
  public distribuirtareas: DistribuirtareaEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private distribuirtareaService: DistribuirtareaService,
    private companiasService: CompaniasService,
    private distribuirtareaComponentInstanceService: DistribuirtareaComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    console.log('ENTRO ngOnInit');
    this.distribuirtareaComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
   console.log('WORKFLOW COOKIE:', this.cookieService.get('workflowActual'));
    if(this.hayWorkflowActual()) {
      console.log('SI hay workflow → voy a buscar');
        this.buscarDistribuirtarea();
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

   public buscarDistribuirtarea(filtros?: DistribuirTareaFilterEntity): void {
    console.log("FILTROS RECIBIDOS EN PADRE:", filtros);
      const workflowActual = this.cookieService.get('workflowActual');
      const body: DistribuirTareaFilterEntity = {
      nombreWorkflow: workflowActual,
      nombre: filtros?.nombre ?? '',
      estado: filtros?.estado ?? '',
      primitiva: filtros?.primitiva ?? '',
      expresion: filtros?.expresion ?? '',
      descripcion: filtros?.descripcion ?? ''
    };
   console.log("BODY FINAL:", body);
      console.log('BODY ENVIADO AL BACKEND:', body);
  
      this.distribuirtareaService
        .getDistribuirtareas(body)
        .subscribe({
          next: (response) => {
            this.distribuirtareas = response.respuesta;
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

