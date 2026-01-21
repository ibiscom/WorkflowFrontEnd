import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { OperacionesService } from './operaciones.service';
import { OperacionesComponentInstanceService } from './operaciones-component-instance.service';
import { LoginEntity } from '../login/login.entity';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { FsResponseEntity } from '../entities/backend/fs-response.entity';
import { OperationEntity } from '../entities/operations/operation.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { NuevaOperacionComponent } from './nueva-operacion/nueva-operacion.component';

@Component({
  selector: 'fs-operaciones',
  imports: [FormsModule, MatCardModule, RouterModule, NuevaOperacionComponent],
  templateUrl: './operaciones.component.html',
  styleUrl: './operaciones.component.scss',
})
/**
 * Gestión de operaciones: listado y creación.
 */
export class OperacionesComponent {
  public loggedUser: LoginEntity | undefined;
  public operations: OperationEntity[] = [];
  public mensaje: string = '';

  constructor(
    private operacionesService: OperacionesService,
    private loginService: LoginService,
    private operacionesComponentInstanceService: OperacionesComponentInstanceService,
    public router: Router,
  ) {}

  /**
   * Inicializa el componente y carga operaciones del usuario logueado.
   */
  ngOnInit() {
    this.operacionesComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.loggedUser = this.loginService.getLoggedUser();
    if (!this.loggedUser) {
      this.router.navigate(['/login']);
    } else {
      this.loadOperations();
    }
  }

  private loadOperations() {
    this.operacionesService
      .getOperations(this.loggedUser?.user_name ?? '')
      .subscribe({
        next: (response) => {
          this.operations = response.respuesta;
        },
        error: (error) => {
          console.error('Error al cargar las operaciones:', error);
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_OPERACION_CARGAR,
            error,
          );
        },
      });
  }

  /**
   * Persiste una nueva operación y recarga el listado.
   */
  public saveOperation(operation: OperationEntity) {
    if (!this.loggedUser) {
      this.router.navigate(['/login']);
    } else {
      operation.userName = this.loggedUser.user_name;
      operation.ip = this.loggedUser.user_ip;

      this.operacionesService.createOperation(operation).subscribe({
        next: (response) => {
          this.mensaje = response.mensaje;
          this.loadOperations();
        },
        error: (error) => {
          console.error('Error al guardar la operación:', error);
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_OPERACION_GUARDAR,
            error,
          );
        },
      });
    }
  }
}
