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
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { HerramientaEntity } from './herramienta.entity';
import { AccionesHerramientaComponent } from './acciones-herramienta/acciones-herramienta.component';

@Component({
  selector: 'ibpm-herramienta',
  imports: [MatCardModule, RouterModule, AccionesHerramientaComponent],
  templateUrl: './herramienta.component.html',
  styleUrl: './herramienta.component.scss',
})
export class HerramientaComponent {
  public loggedUser: LoginEntity | undefined;
  public herramientas: HerramientaEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';

  constructor(
    private herramientaService: HerramientaService,
    private companiasService: CompaniasService,
    private herramientaComponentInstanceService: HerramientaComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.herramientaComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.getAllCompanies();
    this.searchHerramienta();
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

  public searchHerramienta(herramientaName?: string, supervisor?: string): void {
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

