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
import { RolesFilterEntity } from './roles-filter.entity';

@Component({
  selector: 'ibpm-roles',
  imports: [MatCardModule, RouterModule, AccionesRolesComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent {
  public loggedUser: LoginEntity | undefined;
  public roles: RolesEntity[] = [];
  public groups: GroupEntity[] = [];
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
        this.buscarRoles();
  }

  public buscarRoles(filtros?: RolesFilterEntity): void {
      this.rolesService
        .getRols(filtros || {})
        .subscribe({
          next: (response) => {
            this.roles = response.respuesta;
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