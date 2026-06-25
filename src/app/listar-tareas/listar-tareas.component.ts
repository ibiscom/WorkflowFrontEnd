import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ListarTareaService } from './listar-tareas.service';
import { ListarTareaComponentInstanceService } from './listar-tareas-component-instance.service';
import { LoginEntity } from '../login/login.entity';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { ListarTareasEntity } from './listar-tareas.entity';
import { ListarTareaFilterEntity } from './listar-tareas-filter.entity';
import { EstadoListarTareaEntity } from './estado-listar-tareas.entity';


@Component({
  selector: 'ibpm-listar-tareas',
  imports: [MatCardModule, RouterModule],
  templateUrl: './listar-tareas.component.html',
  styleUrl: './listar-tareas.component.scss',
})
export class ListarTareaComponent {
  public loggedUser: LoginEntity | undefined;
  public listartareas: ListarTareasEntity[] = [];
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
    this.buscarListarTareas();
  }

  public buscarListarTareas(filtros?: ListarTareaFilterEntity): void {
    this.listartareaService
      .getListarTarea(filtros || ({} as ListarTareaFilterEntity))
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

}
