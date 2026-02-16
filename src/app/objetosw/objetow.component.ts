import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
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
  public tareas: ObjetowEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private objetowService: ObjetowService,
    private objetowComponentInstanceService: ObjetowComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    console.log('ENTRO ngOnInit');
    this.objetowComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
   console.log('WORKFLOW COOKIE:', this.cookieService.get('workflowActual'));
    if(this.hayWorkflowActual()) {
      console.log('SI hay workflow → voy a buscar');
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
}

