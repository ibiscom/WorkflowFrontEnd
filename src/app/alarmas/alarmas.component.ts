import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { LoginEntity } from '../login/login.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { AccionesAlarmaComponent } from './acciones-alarmas/acciones-alarmas.component';
import { AlarmasEntity } from './alarmas.entity';
import { AlarmasService } from './alarmas.service';
import { AlarmaComponentInstanceService } from './alarmas-component-instance.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'ibpm-alarma',
  imports: [MatCardModule, RouterModule, AccionesAlarmaComponent],
  templateUrl: './alarma.component.html',
  styleUrl: './alarma.component.scss',
})
export class AlarmaComponent {
  public loggedUser: LoginEntity | undefined;
  public objetoW: AlarmasEntity | undefined;
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private alarmasService: AlarmasService,
    private alarmaComponentInstanceService: AlarmaComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
    public cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    console.log('ENTRO ngOnInit');
    this.alarmaComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    if(this.hayWorkflowActual()) {
      this.buscarObjetoWorkflow();
    }
  }

  public hayWorkflowActual(): boolean {
    this.workflowActual = this.cookieService.get("workflowActual");
    if (!this.workflowActual || this.workflowActual === '') { 
      this.mensaje = Constants.ERR_WORKFLOW_NO_SELECCIONADO;
      return false;
    }
    return true;
  }

  public buscarObjetoWorkflow(): void {
    this.alarmasService.obtenerObjetoWorkflow(this.workflowActual).subscribe({
      next: (response) => {
        this.objetoW = response.respuesta;
        console.log('Objeto workflow obtenido:', this.objetoW);
      },
      error: (err) => {
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_BUSCAR_OBJETOW,
          err,
        );
      },
    });
  }
}

