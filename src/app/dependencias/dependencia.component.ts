import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { DependenciaService } from './dependencia.service';
import { DependenciaComponentInstanceService } from './dependencia-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { DependenciaEntity } from './dependencia.entity';
import { AccionesDependenciaComponent } from './acciones-dependencias/acciones-dependencia.component';


@Component({
  selector: 'ibpm-dependencia',
  imports: [MatCardModule, RouterModule, AccionesDependenciaComponent],
  templateUrl: './dependencia.component.html',
  styleUrl: './dependencia.component.scss',
})
export class DependenciaComponent {
  searchDependencias() {
    throw new Error('Method not implemented.');
  }
  public loggedUser: LoginEntity | undefined;
  public workflows: DependenciaEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';

  constructor(
    private dependenciaService: DependenciaService,
    private companiasService: CompaniasService,
    private dependenciaComponentInstanceService: DependenciaComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.dependenciaComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.getAllCompanies();
    this.searchWorkflows();
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

  public searchWorkflows(dependenciaName?: string, supervisor?: string): void {
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
