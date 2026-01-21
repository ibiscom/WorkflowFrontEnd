import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { EntidadService } from './entidad.service';
import { EntidadComponentInstanceService } from './entidad-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { EntidadEntity } from './entidad.entity';
import { AccionesEntidadComponent } from './acciones-entidad/acciones-entidad.component';


@Component({
  selector: 'ibpm-entidad',
  imports: [MatCardModule, RouterModule, AccionesEntidadComponent],
  templateUrl: './entidad.component.html',
  styleUrl: './entidad.component.scss',
})
export class EntidadComponent {
  public loggedUser: LoginEntity | undefined;
  public entidades: EntidadEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';

  constructor(
    private entidadService: EntidadService,
    private companiasService: CompaniasService,
    private entidadComponentInstanceService: EntidadComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.entidadComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.getAllCompanies();
    this.searchEntidades();
  }

  public getAllCompanies() {
    /*
    this.companiasService
      .getAllCompanies(this.loggedUser?.user_name ?? '')
      .subscribe({
        next: (response) => {
          this.companias = response.respuesta;
        },
        error: (err) => {
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_OBTENIENDO_COMPANIAS,
            err,
          );
        },
      });
      */
  }

  public searchEntidades(entidadName?: string, supervisor?: string): void {
    /*
    let workflowServerFilter: WorkflowSearchFilterEntity = {
      userName: this.loggedUser?.user_name ?? '',
      workflowName: workflowName ?? '',
      supervisor: supervisor ?? '',
    };

    this.workflowService.searchWorkflows(workflowServerFilter).subscribe({
      next: (response) => {
        this.workflows = response.respuesta;
      },
      error: (err) => {
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_BUSCAR_WORKFLOWS,
          err,
        );
      },
    });
    */
  }
}
