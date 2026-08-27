import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ConsultarRolResponsableService } from './consultarrolresponsable.service';
import { ConsultarRolResponsableComponentInstanceService } from './consultarrolresponsable-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { ConsultarRolResponsableEntity } from './consultarrolresponsable.entity';
import { CookieService } from 'ngx-cookie-service';
import { ConsultarRolResponsablesFilterEntity } from './consultarrolreponsable-filter.entity';
import { FiltrosBusquedaConsultarRolResponsableComponent } from "./filtros-busqueda-consultarrolresponsable/filtros-busqueda-consultarrolresponsable.component";

@Component({
  selector: 'ibpm-responsable',
  imports: [MatCardModule, RouterModule, FiltrosBusquedaConsultarRolResponsableComponent],
  templateUrl: './consultarrolresponsable.component.html',
  styleUrl: './consultarrolresponsable.component.scss',
})
export class ConsultarRolResponsableComponent {
  public loggedUser: LoginEntity | undefined;
  public responsables: ConsultarRolResponsableEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';

  constructor(
    private consultarRolResponsableService: ConsultarRolResponsableService,
    private companiasService: CompaniasService,
    private consultarRolResponsableComponentInstanceService: ConsultarRolResponsableComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

    ngOnInit(): void {
      this.consultarRolResponsableComponentInstanceService.setInstance(this);
      this.loggedUser = this.loginService.getLoggedUser();
      this.buscarResponsables();
    }
  
    public buscarResponsables(filtros?: ConsultarRolResponsablesFilterEntity): void {
      this.consultarRolResponsableService
        .getUsersRol(filtros?.userLogin || '')
        .subscribe({
          next: (response) => {
            this.responsables = response.respuesta;
            this.mensaje = '';
          },
          error: (err) => {
            this.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_OBTENIENDO_RESPONSABLES,
              err,
            );
          },
        });
    }
  
      public obtenerResponsables(): void {
    this.consultarRolResponsableService
      .getUsersRol('')
      .subscribe({
        next: (response) => {
          this.responsables = response.respuesta;
        },
        error: (err) => {
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_OBTENIENDO_RESPONSABLESS,
            err,
          );
        },
      });

  }

  }