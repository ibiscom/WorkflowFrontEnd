import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { HerramientaService } from './herramienta.service';
import { HerramientaComponentInstanceService } from './herramienta-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { HerramientaEntity } from './herramienta.entity';
import { AccionesHerramientaComponent } from './acciones-herramienta/acciones-herramienta.component';
import { TipoHerramientaEntity } from './tipo-herramienta.entity';
import { HerramientasFilterEntity } from './herramienta-filter.entity';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'ibpm-herramienta',
  imports: [MatCardModule, RouterModule, AccionesHerramientaComponent],
  templateUrl: './herramienta.component.html',
  styleUrl: './herramienta.component.scss',
})
export class HerramientaComponent {
  public loggedUser: LoginEntity | undefined;
  public herramientas: HerramientaEntity[] = [];
  public tipos: TipoHerramientaEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private herramientaService: HerramientaService,
    private herramientaComponentInstanceService: HerramientaComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.herramientaComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    if(this.hayWorkflowActual()) {
      this.obtenerTipos();
      this.buscarHerramientas();
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


 public  buscarHerramientas(noLimpiar?:boolean): void {
     this.herramientaService
       .getHerramientas(this.workflowActual)
       .subscribe({
         next: (response) => {
           this.herramientas = response.respuesta;          
           if(!noLimpiar) {
             this.mensaje = '';
           }
         },
         error: (err) => {
           this.mensaje = MessageUtil.buildErrorMessageFsResponse(
             Constants.ERR_OBTENIENDO_HERRAMIENTAS,
             err,
           );
         },
       });
   }

   /**
    * REVISIÓN CARLOS!!!
    
   public buscarHerramientas(filtros?: HerramientasFilterEntity): void {
       this.herramientaService
         .getHerramientas(filtros || {})
         .subscribe({
           next: (response) => {
             this.herramientas = response.respuesta;
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
    this.herramientaService
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

