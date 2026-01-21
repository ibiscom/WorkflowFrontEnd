import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { AccionesCompaniasComponent } from './acciones-companias/acciones-companias.component';
import { CompanyEntity } from '../entities/companies/company.entity';
import { LoginEntity } from '../login/login.entity';
import { LoginService } from '../login/login.service';
import { CompaniasComponentInstanceService } from './companias-component-instance.service';
import { CompaniasService } from './companias.service';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';

@Component({
  selector: 'fs-companias',
  imports: [MatCardModule, RouterModule, AccionesCompaniasComponent],
  templateUrl: './companias.component.html',
  styleUrl: './companias.component.scss',
})
/**
 * Listado de compañías con acciones disponibles.
 */
export class CompaniasComponent {
  public loggedUser: LoginEntity | undefined;
  public companies: CompanyEntity[] = [];
  public mensaje: string = '';

  constructor(
    private companiasService: CompaniasService,
    private loginService: LoginService,
    private companiasComponentInstanceService: CompaniasComponentInstanceService,
    public router: Router,
  ) {}

  /**
   * Inicializa el componente y carga las compañías del usuario.
   */
  ngOnInit(): void {
    this.companiasComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.getCompanies();
  }

  /**
   * Consulta el backend para obtener las compañías disponibles.
   */
  public getCompanies(): void {
    try {
      this.mensaje = 'Obteniendo compañías...';
      this.companiasService
        .getAllCompanies(this.loggedUser?.user_name ?? '')
        .subscribe({
          next: (response) => {
            this.mensaje = '';
            if (response && response.respuesta) {
              this.companies = response.respuesta as CompanyEntity[];
              this.mensaje = '';
            } else {
              this.mensaje = 'No se encontraron compañías.';
            }
          },
          error: (error) => {
            this.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_OBTENIENDO_COMPANIAS,
              error,
            );
            console.error(error);
          },
        });
    } catch (error) {
      this.mensaje = MessageUtil.buildErrorMessageFsResponse(
        Constants.ERR_OBTENIENDO_COMPANIAS,
        error,
      );
      console.error(error);
    }
  }
}
