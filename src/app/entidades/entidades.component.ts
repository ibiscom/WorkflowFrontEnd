import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { EntidadesService } from './entidades.service';
import { EntidadesComponentInstanceService } from './entidades-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { EntidadEntity } from './entidad.entity';
import { AccionesEntidadesComponent } from './acciones-entidades/acciones-entidades.component';


@Component({
  selector: 'ibpm-entidad',
  imports: [MatCardModule, RouterModule, AccionesEntidadesComponent],
  templateUrl: './entidades.component.html',
  styleUrl: './entidades.component.scss',
})
export class EntidadesComponent {
  public loggedUser: LoginEntity | undefined;
  public uc?: EntidadesComponent;
  public entidades: EntidadEntity[] = [];
  public mensaje: string = '';
  public userName: string='';

  constructor(
    private entidadesService: EntidadesService,
    private entidadesComponentInstanceService: EntidadesComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
  ) {this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.entidadesComponentInstanceService.getInstance();}

  ngOnInit(): void {
    this.entidadesComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.buscarEntidades();
  }

  

  public buscarEntidades(): void {
    console.log('USER:', this.loggedUser);
    console.log('USERNAME:', this.loggedUser?.user_name);
         this.entidadesService
            .getEntidades(this.loggedUser?.user_name ?? '')
            .subscribe({
              next: (response) => {
                this.entidades = response.respuesta;
                this.mensaje = '';
              },
              error: (err) => {
                this.mensaje = MessageUtil.buildErrorMessageFsResponse(
                  Constants.ERR_OBTENIENDO_WORKFLOWS,
                  err,
                );
              },
            });
        }
      }