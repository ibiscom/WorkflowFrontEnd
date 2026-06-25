import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListarTareaComponent } from '../listar-tareas.component';
import { ListarTareaService } from '../listar-tareas.service';
import { LoginEntity } from '../../login/login.entity';
import { Constants } from '../../utils/constants';
import { MessageUtil } from '../../utils/message.util';
import { ListarTareaFilterEntity } from '../listar-tareas-filter.entity';
import { EstadoListarTareaEntity } from '../estado-listar-tareas.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-listartarea',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-listar-tareas.component.html',
  styleUrl: './filtros-busqueda-listar-tareas.component.scss',
})
export class FiltrosBusquedaListarTareaComponent {
nombreWorkFlowPadreN: any;
numero: any;
idInstanciaWorkflowPadreF: any;
idInstanciaWorkflowPadreN: any;
fechaAsignacionN: any;
fechaDesdeN: any;
fechaHastaN: any;
idNegocioN: any;
tareasList: any;
search() {
throw new Error('Method not implemented.');
}
  public nombreWorkFlowB: string = '';
  public nombreLargoWorkFlowB: string = '';

  // 🔹 Estado seleccionado
  public estadoObjectN?: EstadoListarTareaEntity = undefined;

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: ListarTareaComponent;
  public loggedUser: LoginEntity | undefined;
  nombreWorkFlowN: string = '';
  nombreN: string = '';
  idInstanciaWorkflowF: any;

  constructor(private listartareaService: ListarTareaService) {}

  ngOnInit(): void {
    this.loggedUser = this.uc?.loggedUser;

  }

  // Ejecuta búsqueda
  public buscar(): void {
    const generateReportBool = this.generateReportF === 'true';

    const filtros = {
      nombre: this.nombreN,
      estado: this.estadoObjectN,
      nombreWorkflow: this.nombreWorkFlowN
    } as unknown as ListarTareaFilterEntity;

    this.uc?.buscarListarTareas(
      filtros
    );
  }

  public searchListarTarea(
    listartareaName: string,
    nombreLargo: string,
    generateReport: boolean
  ): void {
    console.log(
      'Filtros recibidos:',
      listartareaName,
      nombreLargo,
      generateReport,
      this.estadoObjectN
    );

    // Tu lógica actual aquí
  }
}
