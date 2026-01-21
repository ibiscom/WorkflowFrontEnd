import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { DatosCorporativosComponentInstanceService } from './datos-corporativos-component-instance.service';
import { LoginService } from '../login/login.service';
import { DatosCorporativosService } from './datos-corporativos.service';
import { LoginEntity } from '../login/login.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { CorporateDataEntity } from '../entities/corporate-data/corporate-data.entity';

@Component({
  selector: 'fs-datos-corporativos',
  imports: [MatCardModule, RouterModule],
  templateUrl: './datos-corporativos.component.html',
  styleUrl: './datos-corporativos.component.scss',
})
/**
 * Gestión de datos corporativos del sistema.
 */
export class DatosCorporativosComponent {
  public mensaje: string = '';
  public loggedUser?: LoginEntity;
  public corporateDataList: CorporateDataEntity[] = [];

  constructor(
    private datosCorporativosService: DatosCorporativosService,
    private loginService: LoginService,
    private datosCorporativosComponentInstanceService: DatosCorporativosComponentInstanceService,
    public router: Router,
  ) {}

  /**
   * Inicializa el componente y carga los datos corporativos.
   */
  ngOnInit(): void {
    this.datosCorporativosComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.searchCorporateDataItems();
  }

  /**
   * Consulta el servicio para obtener la lista de datos corporativos.
   */
  public searchCorporateDataItems() {
    this.corporateDataList = [];
    this.mensaje = 'Buscando datos corporativos...';
    this.datosCorporativosService.getCorporateDataList().subscribe({
      next: (response) => {
        if (response && response.respuesta) {
          this.mensaje = '';
          this.corporateDataList = response.respuesta as CorporateDataEntity[];
        } else {
          this.mensaje = 'No se encontraron datos corporativos.';
        }
      },
      error: (error) => {
        this.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_BUSCAR_DATOS_CORPORATIVOS,
          error,
        );
      },
    });
  }
}
