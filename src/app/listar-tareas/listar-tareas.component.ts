import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ListarTareaService } from './listar-tareas.service';
import { ListarTareaComponentInstanceService } from './listar-tareas-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { ListarTareaEntity } from './listar-tareas.entity';
import { AccionesListarTareaComponent } from './acciones-listartarea/acciones-listartarea.component';
import { ListarTareaFilterEntity } from './listar-tareas-filter.entity';
import { EstadoListarTareaEntity } from './estado-listar-tareas.entity';

@Component({
  selector: 'ibpm-listartarea',
  imports: [MatCardModule, RouterModule, AccionesListarTareaComponent],
  templateUrl: './listartarea.component.html',
  styleUrl: './listartarea.component.scss',
})
export class ListarTareaComponent {
  public loggedUser: LoginEntity | undefined;
  public listartareas: ListarTareaEntity[] = [];
  public estados: EstadoListarTareaEntity[] = [];
  public mensaje: string = '';

  constructor(
    private listartareaService: ListarTareaService,
    private listartareaComponentInstanceService: ListarTareaComponentInstanceService,
    private loginService: LoginService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.listartareaComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.obtenerEstados();
    this.buscarListarTareas();
  }

  public buscarListarTareas(filtros?: ListarTareaFilterEntity): void {
    this.listartareaService
      .getListarTareas(filtros || {})
      .subscribe({
        next: (response) => {
          this.listartareas = response.respuesta;
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

  public obtenerEstados(): void {
    this.listartareaService
      .getStatus()
      .subscribe({
        next: (response) => {
          this.estados = response.respuesta;
        },
        error: (err) => {
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_OBTENIENDO_ESTADOS_WORKFLOW,
            err,
          );
        },
      });

  }
}
