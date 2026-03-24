import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { PatronService } from './patron.service';
import { PatronComponentInstanceService } from './patron-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { PatronEntity } from './patron.entity';
import { AccionesPatronComponent } from './acciones-patron/acciones-patron.component';
import { PatronsFilterEntity } from './patron-filter.entity';
import { CookieService } from 'ngx-cookie-service';
import { TipoPatronEntity } from './tipo-patron.entity';

@Component({
  selector: 'ibpm-patron',
  imports: [MatCardModule, RouterModule, AccionesPatronComponent],
  templateUrl: './patron.component.html',
  styleUrl: './patron.component.scss',
})
export class PatronComponent {
  public loggedUser: LoginEntity | undefined;
  public patrones: PatronEntity[] = [];
  public tipos: TipoPatronEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private patronService: PatronService,
    private patronComponentInstanceService: PatronComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.patronComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    if(this.hayWorkflowActual()) {
      this.obtenerTipos();
      this.buscarPatrones();
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


 public  buscarPatrones(noLimpiar?:boolean): void {
     this.patronService
       .getPatrones(this.workflowActual)
       .subscribe({
         next: (response) => {
           this.patrones = response.respuesta;          
           if(!noLimpiar) {
             this.mensaje = '';
           }
         },
         error: (err) => {
           this.mensaje = MessageUtil.buildErrorMessageFsResponse(
             Constants.ERR_OBTENIENDO_PATRONES,
             err,
           );
         },
       });
   }

   /**
    * REVISIÓN CARLOS!!!
    
   public buscarPatrons(filtros?: PatronsFilterEntity): void {
       this.patronService
         .getPatrons(filtros || {})
         .subscribe({
           next: (response) => {
             this.patrons = response.respuesta;
             this.mensaje = '';
           },
           error: (err) => {
             this.mensaje = MessageUtil.buildErrorMessageFsResponse(
               Constants.ERR_OBTENIENDO_HERRAMIENTAS,
               err,
             );
           },
         });
     }
*/
    public obtenerTipos(): void {
    this.patronService
      .getTypes()
      .subscribe({
        next: (response) => {
          this.tipos = response.respuesta;
        },
        error: (err) => {
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_OBTENIENDO_TIPOS_HERR,
            err,
          );
        },
      });

  }
}

