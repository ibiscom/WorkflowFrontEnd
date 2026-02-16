import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { LoginEntity } from '../login/login.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { AccionesObjetowComponent } from './acciones-objetow/acciones-objetow.component';
import { ObjetowEntity } from './objetow.entity';
import { ObjetowService } from './objetow.service';
import { ObjetowComponentInstanceService } from './objetow-component-instance.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'ibpm-objetow',
  imports: [MatCardModule, RouterModule, AccionesObjetowComponent],
  templateUrl: './objetow.component.html',
  styleUrl: './objetow.component.scss',
})
export class ObjetowComponent {
  public loggedUser: LoginEntity | undefined;
  public objetoW: ObjetowEntity | undefined;
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private objetowService: ObjetowService,
    private objetowComponentInstanceService: ObjetowComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
    public cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    console.log('ENTRO ngOnInit');
    this.objetowComponentInstanceService.setInstance(this);
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
    this.objetowService.obtenerObjetoWorkflow(this.workflowActual).subscribe({
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

