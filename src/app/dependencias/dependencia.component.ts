import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { DependenciaComponentInstanceService } from './dependencia-component-instance.service';
import { DependenciaService } from './dependencia.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { DependenciaEntity } from './dependencia.entity';
import { AccionesDependenciaComponent } from './acciones-dependencias/acciones-dependencia.component';
import { DependenciaFilterEntity } from './dependencia-filter.entity';
import { EstadoDependenciaEntity } from './estadoDependencia.entity';



@Component({
  selector: 'ibpm-dependencia',
  imports: [MatCardModule, RouterModule, AccionesDependenciaComponent],
  templateUrl: './dependencia.component.html',
  styleUrl: './dependencia.component.scss',
})
export class DependenciaComponent {
  searchDependencys() {
    throw new Error('Method not implemented.');
  }
  public loggedUser: LoginEntity | undefined;
  public dependencys: DependenciaEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';
  public estado: EstadoDependenciaEntity[] = [];

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
    this.buscarDependencia();
  }

  
  public buscarDependencia(filtros?: DependenciaFilterEntity): void {
      this.dependenciaService
        .buscarDependencia(filtros || {})
        .subscribe({
          next: (response) => {
            this.dependencys = response.respuesta;
            this.mensaje = '';
          },
          error: (err) => {
            this.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_OBTENIENDO_DEPENDENCIAS,
              err,
            );
          },
        });
    }

  

    public obtenerEstado(): void {
    this.dependenciaService
      .getEstado()
      .subscribe({
        next: (response) => {
          this.estado = response.respuesta;
        },
        error: (err) => {
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_OBTENIENDO_ESTADO_DEPENDENCIA,
            err,
          );
        },
      });

  }
}
