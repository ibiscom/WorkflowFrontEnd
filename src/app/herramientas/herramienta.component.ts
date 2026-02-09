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
import { TiposHerramientaEntity } from './tiposHerramienta.entity';
import { HerramientasFilterEntity } from './herramienta-filter.entity';

@Component({
  selector: 'ibpm-herramienta',
  imports: [MatCardModule, RouterModule, AccionesHerramientaComponent],
  templateUrl: './herramienta.component.html',
  styleUrl: './herramienta.component.scss',
})
export class HerramientaComponent {
  public loggedUser: LoginEntity | undefined;
  public herramientas: HerramientaEntity[] = [];
  public tipos: TiposHerramientaEntity[] = [];
  public mensaje: string = '';

  constructor(
    private herramientaService: HerramientaService,
    private herramientaComponentInstanceService: HerramientaComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.herramientaComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.obtenerTipos();
   /** this.buscarHerramientas(); */
  }

  /**
   * herramientas no tiene filtros!!!!!
  
 public buscarHerramientas(filtros?: HerramientaFilterEntity): void {
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

