import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { RolesService } from './roles.service';
import { RolesComponentInstanceService } from './roles-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { RolesEntity } from './roles.entity';
import { AccionesRolesComponent } from './acciones-roles/acciones-roles.component';

@Component({
  selector: 'ibpm-roles',
  imports: [MatCardModule, RouterModule, AccionesRolesComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent {
  public loggedUser: LoginEntity | undefined;
  public workflows: RolesEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';

  constructor(
    private rolesService: RolesService,
    private companiasService: CompaniasService,
    private rolesComponentInstanceService: RolesComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.rolesComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.getAllCompanies();
    this.searchRoles();
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

  public searchRoles(rolesName?: string, supervisor?: string): void {
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
