import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ActividadPendientePorResponsableComponentInstanceService } from './actividadpendienteporresponsable-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { ActividadPendientePorResponsableService } from './actividadpendienteporresponsable.service';
import { CookieService } from 'ngx-cookie-service';
import { ActividadPendientePorResponsableFilterEntity } from './actividadpendienteporresponsableFilterEntity';
import { ActividadPendientePorResponsableEntity } from './actividadpendienteporresponsable.entity';

@Component({
  selector: 'ibpm-actividadpendienteporresponsable',
  imports: [MatCardModule, RouterModule,],
  templateUrl: './actividadpendienteporresponsable.component.html',
  styleUrl: './actividadpendienteporresponsable.component.scss',
})
export class ActividadPendientePorResponsableComponent {
  public loggedUser: LoginEntity | undefined;
  public indicadordetarea: ActividadPendientePorResponsableEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';
  actividadpendienteporresponsable: any;
 

  constructor(
    private actividadpendienteporresponsableService: ActividadPendientePorResponsableService,
    private companiasService: CompaniasService,
    private indicadordetareaComponentInstanceService: ActividadPendientePorResponsableComponentInstanceService ,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    console.log('ENTRO ngOnInit');
    this.indicadordetareaComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
   console.log('WORKFLOW COOKIE:', this.cookieService.get('workflowActual'));
    if(this.hayWorkflowActual()) {
      console.log('SI hay workflow → voy a buscar');
        this.buscarActividadPendientePorResponsable();
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

   public buscarActividadPendientePorResponsable(filtros?: ActividadPendientePorResponsableFilterEntity): void {
    console.log("FILTROS RECIBIDOS EN PADRE:", filtros);
      const workflowActual = this.cookieService.get('workflowActual');
      const body: ActividadPendientePorResponsableFilterEntity = {
      nombreWorkflow: workflowActual,
      nombre: filtros?.nombre ?? '',
      estado: filtros?.estado ?? '',
      primitiva: filtros?.primitiva ?? '',
      expresion: filtros?.expresion ?? '',
      descripcion: filtros?.descripcion ?? ''
    };
   console.log("BODY FINAL:", body);
      console.log('BODY ENVIADO AL BACKEND:', body);
  
      this.actividadpendienteporresponsableService
        .getActividadesPendientesPorResponsable(body)
        .subscribe({
          next: (response) => {
            this.indicadordetarea = response.respuesta;
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

