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
  templateUrl: './filtros-busqueda-listartarea.component.html',
  styleUrl: './filtros-busqueda-listartarea.component.scss',
})
export class FiltrosBusquedaListarTareaComponent {
  public nombreWorkFlowB: string = '';
  public nombreLargoWorkFlowB: string = '';

  // 🔹 Estado seleccionado
  public estadoObjectN?: EstadoListarTareaEntity = undefined;

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: ListarTareaComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private listartareaService: ListarTareaService) {}

  ngOnInit(): void {
    this.loggedUser = this.uc?.loggedUser;

    // 🔹 Carga inicial (puedes cambiar la lógica luego)
    this.loadEstados();
  }

  // 🔹 Simulación / carga de estados
  private loadEstados(): void {
      this.uc?.obtenerEstados();
  }



  // Cambio del select
  public onEstadoChange(value: any): void {
    this.estadoObjectN = value;
    console.log('Estado seleccionado:', this.estadoObjectN);
  }

  // Ejecuta búsqueda
  public buscar(): void {
    const generateReportBool = this.generateReportF === 'true';

    let filtros: ListarTareaFilterEntity = {
      nombre: this.nombreWorkFlowB,
      nombreLargo: this.nombreLargoWorkFlowB,
      estado: this.estadoObjectN ? this.estadoObjectN.name : undefined,
    };

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
