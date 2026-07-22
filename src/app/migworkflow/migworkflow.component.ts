import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { MigworkflowService } from './migworkflow.service';
import { MigworkflowComponentInstanceService } from './migworkflow-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { MigworkflowEntity } from './migworkflow.entity';
import { CookieService } from 'ngx-cookie-service';
import { MigworkflowFilterEntity } from './migworkflow-filter.entity';
import { FiltrosBusquedaMigworkflowComponent } from "./filtros-busqueda-migworkflow/filtros-busqueda-migworkflow.component";

@Component({
  selector: 'ibpm-migworkflow',
  imports: [MatCardModule, RouterModule, FiltrosBusquedaMigworkflowComponent],
  templateUrl: './migworkflow.component.html',
  styleUrl: './migworkflow.component.scss',
})
export class MigworkflowComponent {
  public loggedUser: LoginEntity | undefined;
  public migworkflows: MigworkflowEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';
  public name: any;
  public largename: any;
  public migworkflow: any;

  constructor(
    private migworkflowService: MigworkflowService,
    private companiasService: CompaniasService,
    private migworkflowComponentInstanceService: MigworkflowComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
  ) {}

    ngOnInit(): void {
      this.migworkflowComponentInstanceService.setInstance(this);
      this.loggedUser = this.loginService.getLoggedUser();
      this.buscarMigworkflows();
    }
  
    public buscarMigworkflows(filtros?: MigworkflowFilterEntity): void {
      const response$ = this.migworkflowService.getUsersRol(
        filtros?.userLogin || '',
      ) as any;

      response$?.subscribe({
        next: (response: any) => {
          this.migworkflows = response.respuesta;
          this.mensaje = '';
        },
        error: (err: any) => {
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_OBTENIENDO_RESPONSABLES,
            err,
          );
        },
      });
    }
  
      public obtenerMigworkflows(): void {
    const response$ = this.migworkflowService.getUsersRol('') as any;

    response$?.subscribe({
      next: (response: any) => {
        this.migworkflows = response.respuesta;
      },
      error: (err: any) => {
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_OBTENIENDO_RESPONSABLESS,
          err,
        );
      },
    });

  }

  }