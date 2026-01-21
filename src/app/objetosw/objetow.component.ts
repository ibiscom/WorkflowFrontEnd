import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { AccionesObjetowComponent } from './acciones-objetow/acciones-objetow.component';
import { ObjetowEntity } from './objetow.entity';
import { ObjetowService } from './objetow.service';
import { ObjetowComponentInstanceService } from './objetow-component-instance.service';

@Component({
  selector: 'ibpm-objetow',
  imports: [MatCardModule, RouterModule, AccionesObjetowComponent],
  templateUrl: './objetow.component.html',
  styleUrl: './objetow.component.scss',
})
export class ObjetowComponent {
  public loggedUser: LoginEntity | undefined;
  public tareas: ObjetowEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';

  constructor(
    private objetowService: ObjetowService,
    private companiasService: CompaniasService,
    private objetowComponentInstanceService: ObjetowComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.objetowComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.getAllCompanies();
    this.searchTareas();
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

  public searchTareas(tareasName?: string, supervisor?: string): void {
    /*
    let groupServerFilter: TareasSearchFilterEntity = {
      userName: this.loggedUser?.user_name ?? '',
      tareasName: tareasName ?? '',
      supervisor: supervisor ?? '',
    };

    this.gruposService.searchTareas(tareasServerFilter).subscribe({
      next: (response) => {
        this.tareas = response.respuesta;
      },
      error: (err) => {
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_BUSCAR_GRUPOS,
          err,
        );
      },
    });
    */
  }
}
