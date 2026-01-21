import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { WorkflowService } from './workflow.service';
import { WorkflowComponentInstanceService } from './workflow-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { WorkflowEntity } from './workflow.entity';
import { AccionesWorkflowComponent } from './acciones-workflow/acciones-workflow.component';

@Component({
  selector: 'ibpm-workflow',
  imports: [MatCardModule, RouterModule, AccionesWorkflowComponent],
  templateUrl: './workflow.component.html',
  styleUrl: './workflow.component.scss',
})
export class WorkflowComponent {
  public loggedUser: LoginEntity | undefined;
  public workflows: WorkflowEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';

  constructor(
    private workflowService: WorkflowService,
    private companiasService: CompaniasService,
    private workflowComponentInstanceService: WorkflowComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.workflowComponentInstanceService.setInstance(this);
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

  public searchWorkflows(workflowName?: string, supervisor?: string): void {
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
