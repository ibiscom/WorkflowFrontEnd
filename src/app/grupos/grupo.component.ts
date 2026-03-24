import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { GrupoService } from './grupo.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GrupoEntity } from './grupo.entity';
import { AccionesGrupoComponent } from './acciones-grupo/acciones-grupo.component';
import { TipoGrupoEntity } from './tipo-grupo.entity';
import { GruposFilterEntity } from './grupo-filter.entity';
import { CookieService } from 'ngx-cookie-service';
import { GrupoComponentInstanceService } from './grupo-component-instance.service';

@Component({
  selector: 'ibpm-grupo',
  imports: [MatCardModule, RouterModule, AccionesGrupoComponent],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.scss',
})
export class GrupoComponent {
  public loggedUser: LoginEntity | undefined;
  public grupos: GrupoEntity[] = [];
  public tipos: TipoGrupoEntity[] = [];
  public mensaje: string = '';
  public workflowActual: string = '';

  constructor(
    private grupoService: GrupoService,
    private grupoComponentInstanceService: GrupoComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.grupoComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    if(this.hayWorkflowActual()) {
      this.obtenerTipos();
      this.buscarGrupos();
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


 public  buscarGrupos(noLimpiar?:boolean): void {
     this.grupoService
       .getGrupos(this.workflowActual)
       .subscribe({
         next: (response) => {
           this.grupos = response.respuesta;          
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
    
   public buscarGrupos(filtros?: GruposFilterEntity): void {
       this.grupoService
         .getGrupos(filtros || {})
         .subscribe({
           next: (response) => {
             this.grupos = response.respuesta;
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
    this.grupoService
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

