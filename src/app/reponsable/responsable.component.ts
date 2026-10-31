import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ResponsableService } from './responsable.service';
import { ResponsableComponentInstanceService } from './responsable-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { ResponsableEntity } from './responsable.entity';
import { CookieService } from 'ngx-cookie-service';
import { ResponsablesFilterEntity } from './reponsable-filter.entity';
import { FiltrosBusquedaResponsableComponent } from './filtros-busqueda-responsable/filtros-busqueda-responsable.component';

@Component({
  selector: 'ibpm-responsable',
  imports: [MatCardModule, RouterModule, FiltrosBusquedaResponsableComponent],
  templateUrl: './responsable.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './responsable.component.scss',
})
export class ResponsableComponent {
  public loggedUser: LoginEntity | undefined;
  public responsables: ResponsableEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';

  constructor(
    private responsableService: ResponsableService,
    private companiasService: CompaniasService,
    private responsableComponentInstanceService: ResponsableComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.responsableComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.buscarResponsables();
  }

  public buscarResponsables(filtros?: ResponsablesFilterEntity): void {
    this.responsableService.getUsersRol(filtros?.userLogin || '').subscribe({
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
    this.responsableService.getUsersRol('').subscribe({
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
