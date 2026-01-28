import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { WorkflowService } from './workflow.service';
import { WorkflowComponentInstanceService } from './workflow-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { WorkflowEntity } from './workflow.entity';
import { AccionesWorkflowComponent } from './acciones-workflow/acciones-workflow.component';
import { WorkflowFilterEntity } from './workflow-filter.entity';
import { EstadoWorkflowEntity } from './estado-workflow.entity';

@Component({
  selector: 'ibpm-workflow',
  imports: [MatCardModule, RouterModule, AccionesWorkflowComponent],
  templateUrl: './workflow.component.html',
  styleUrl: './workflow.component.scss',
})
export class WorkflowComponent {
  public loggedUser: LoginEntity | undefined;
  public workflows: WorkflowEntity[] = [];
  public estados: EstadoWorkflowEntity[] = [];
  public mensaje: string = '';

  constructor(
    private workflowService: WorkflowService,
    private workflowComponentInstanceService: WorkflowComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.workflowComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.obtenerEstados();
    this.buscarWorkflows();
  }

  public buscarWorkflows(filtros?: WorkflowFilterEntity): void {
    this.workflowService
      .getWorkflows(filtros || {})
      .subscribe({
        next: (response) => {
          this.workflows = response.respuesta;
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

  public obtenerEstados(): void {
    this.workflowService
      .getStatus()
      .subscribe({
        next: (response) => {
          this.estados = response.respuesta;
        },
        error: (err) => {
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_OBTENIENDO_ESTADOS_WORKFLOW,
            err,
          );
        },
      });

  }
}
