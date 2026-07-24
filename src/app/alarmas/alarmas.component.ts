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
import { AlarmaEntity } from './alarmas.entity';
import { AlarmaService } from './alarmas.service';
import { AlarmaComponentInstanceService } from './alarmas-component-instance.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'ibpm-alarmas',
  imports: [MatCardModule, RouterModule, AccionesAlarmaComponent],
  templateUrl: './alarmas.component.html',
  styleUrl: './alarmas.component.scss',
})
export class AlarmaComponent {
  public loggedUser: LoginEntity | undefined;
  public alarmas: AlarmaEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private alarmaService: AlarmaService,
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
      this.buscarAlarma();
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

  public buscarAlarma(): void {
    console.log('ENTRO buscarAlarmas',this.workflowActual);
    this.alarmaService
    .obtenerAlarmas(this.workflowActual)
    .subscribe({
      next: (response) => {
        this.alarmas = response.respuesta;
        
        console.log('Alarma obtenida:', this.alarmas);
      },
      error: (err: any) => {
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_BUSCAR_ALARMA,
          err,
        );
      },
    });
  }
}

