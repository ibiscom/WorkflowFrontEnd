import { Component } from '@angular/core';
import { AccionesTiposIdentificacionComponent } from './acciones-tipos-identificacion/acciones-tipos-identificacion.component';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { DocumentTypeEntity } from '../entities/domains/document-type.entity';
import { TiposIdentificacionComponentInstanceService } from './tipos-identificacion-component-instance.service';
import { LoginService } from '../login/login.service';
import { LoginEntity } from '../login/login.entity';
import { TiposIdentificacionService } from './tipos-identificacion.service';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';

@Component({
  selector: 'fs-tipos-identificacion',
  imports: [MatCardModule, RouterModule, AccionesTiposIdentificacionComponent],
  templateUrl: './tipos-identificacion.component.html',
  styleUrl: './tipos-identificacion.component.scss',
})
export class TiposIdentificacionComponent {
  public mensaje: string = '';
  public identTypes: DocumentTypeEntity[] = [] as DocumentTypeEntity[];
  public loggedUser?: LoginEntity;

  constructor(
    public router: Router,
    private tiposIdentificacionComponentInstanceService: TiposIdentificacionComponentInstanceService,
    private loginService: LoginService,
    private tiposIdentificacionService: TiposIdentificacionService,
  ) {}

  ngOnInit(): void {
    this.tiposIdentificacionComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.searchIdentificationTypes();
  }

  public searchIdentificationTypes(): void {
    try {
      this.mensaje = 'Buscando tipos de identificación...';

      this.tiposIdentificacionService.getIdentificationTypes().subscribe({
        next: (response) => {
          this.mensaje = '';
          if (response && response.respuesta) {
            this.identTypes = response.respuesta;
          } else {
            this.identTypes = [];
          }
        },
        error: (e: any) => {
          this.mensaje += MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_BUSCAR_TIPOS_IDENTIFICACION,
            e,
          );
          this.identTypes = [];
        },
      });
    } catch (error: any) {
      this.mensaje += MessageUtil.buildErrorMessage(
        Constants.ERR_BUSCAR_TIPOS_IDENTIFICACION_ERROR,
        error,
      );
      this.identTypes = [];
    }
  }
}
