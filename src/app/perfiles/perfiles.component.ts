import { Component } from '@angular/core';
import { AccionesPerfilesComponent } from './acciones-perfiles/acciones-perfiles.component';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { PerfilesService } from './perfiles.service';
import { PerfilesComponentInstanceService } from './perfiles-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { ProfileEntity } from '../entities/profiles/profile.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { ProfileSearchFilterEntity } from '../entities/profiles/profile-search-filter.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { CompaniasService } from '../companias/companias.service';

@Component({
  selector: 'fs-perfiles',
  imports: [MatCardModule, RouterModule, AccionesPerfilesComponent],
  templateUrl: './perfiles.component.html',
  styleUrl: './perfiles.component.scss',
})
/**
 * Gestión de perfiles: listado, filtros y compañías relacionadas.
 */
export class PerfilesComponent {
  public loggedUser: LoginEntity | undefined;
  public profiles: ProfileEntity[] = [];
  public companias: CompanyEntity[] = [];
  public mensaje: string = '';

  constructor(
    private perfilesService: PerfilesService,
    private companiasService: CompaniasService,
    private perfilesComponentInstanceService: PerfilesComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
  ) {}

  /**
   * Inicializa el componente cargando compañías y perfiles.
   */
  ngOnInit(): void {
    this.perfilesComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.getAllCompanies();
    this.searchProfiles();
  }

  /**
   * Carga todas las compañías asociadas al usuario para filtros.
   */
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

  /**
   * Busca perfiles por nombre (opcional).
   */
  public searchProfiles(profileName?: string): void {
    let profileServerFilter: ProfileSearchFilterEntity = {
      userName: this.loggedUser?.user_name ?? '',
      profileName: profileName ?? '',
    };

    this.perfilesService.searchProfiles(profileServerFilter).subscribe({
      next: (response) => {
        this.profiles = response.respuesta;
      },
      error: (err) => {
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_BUSCAR_PERFILES,
          err,
        );
      },
    });
  }
}
