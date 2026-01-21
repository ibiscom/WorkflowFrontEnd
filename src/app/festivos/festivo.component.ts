import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { FestivoService } from './festivo.service';
import { FestivoComponentInstanceService } from './festivo-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { GroupSearchFilterEntity } from '../entities/groups/group-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';
import { FestivoEntity } from './festivo.entity';
import { AccionesFestivoComponent } from './acciones-festivo/acciones-festivo.component';

@Component({
  selector: 'ibpm-festivo',
  imports: [MatCardModule, RouterModule, AccionesFestivoComponent],
  templateUrl: './festivo.component.html',
  styleUrl: './festivo.component.scss',
})
export class FestivoComponent {
  public loggedUser: LoginEntity | undefined;
  public festivos: FestivoEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';

  constructor(
    private festivoService: FestivoService,
    private companiasService: CompaniasService,
    private festivoComponentInstanceService: FestivoComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.festivoComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.getAllCompanies();
    this.searchFestivos();
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

  public searchFestivos(festivoName?: string, supervisor?: string): void {
    /*
    let festivoServerFilter: FestivoSearchFilterEntity = {
      userName: this.loggedUser?.user_name ?? '',
      festivoName: festivoName ?? '',
      supervisor: supervisor ?? '',
    };

    this.festivoService.searchFestivos(festivoServerFilter).subscribe({
      next: (response) => {
        this.festivos = response.respuesta;
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
