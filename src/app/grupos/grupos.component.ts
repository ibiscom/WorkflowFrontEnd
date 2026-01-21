import { Component } from '@angular/core';
import { AccionesGruposComponent } from './acciones-grupos/acciones-grupos.component';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { GruposService } from './grupos.service';
import { GruposComponentInstanceService } from './grupos-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';

@Component({
  selector: 'fs-grupos',
  imports: [MatCardModule, RouterModule, AccionesGruposComponent],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.scss',
})
export class GruposComponent {
  public loggedUser: LoginEntity | undefined;
  public groups: GroupEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';

  constructor(
    private gruposService: GruposService,
    private companiasService: CompaniasService,
    private gruposComponentInstanceService: GruposComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.gruposComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.getAllCompanies();
    this.searchGroups();
  }

  public getAllCompanies() {
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
  }

  public searchGroups(groupName?: string, supervisor?: string): void {
    let groupServerFilter: GroupSearchFilterEntity = {
      userName: this.loggedUser?.user_name ?? '',
      groupName: groupName ?? '',
      supervisor: supervisor ?? '',
    };

    this.gruposService.searchGroups(groupServerFilter).subscribe({
      next: (response) => {
        this.groups = response.respuesta;
      },
      error: (err) => {
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_BUSCAR_GRUPOS,
          err,
        );
      },
    });
  }
}
