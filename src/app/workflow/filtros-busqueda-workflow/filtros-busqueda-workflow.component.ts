import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkflowComponent } from '../workflow.component';
import { WorkflowService } from '../workflow.service';
import { LoginEntity } from '../../login/login.entity';
import { Constants } from '../../utils/constants';
import { MessageUtil } from '../../utils/message.util';
import { WorkflowFilterEntity } from '../workflow-filter.entity';
import { EstadoWorkflowEntity } from '../estado-workflow.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-workflow',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-workflow.component.html',
  styleUrl: './filtros-busqueda-workflow.component.scss',
})
export class FiltrosBusquedaWorkflowComponent {
  public nombreWorkFlowB: string = '';
  public nombreLargoWorkFlowB: string = '';

  // 🔹 Estado seleccionado
  public estadoObjectN?: EstadoWorkflowEntity = undefined;

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: WorkflowComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private workflowService: WorkflowService) {}

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

    let filtros: WorkflowFilterEntity = {
      nombre: this.nombreWorkFlowB,
      nombreLargo: this.nombreLargoWorkFlowB,
      estado: this.estadoObjectN ? this.estadoObjectN.name : undefined,
    };

    this.uc?.buscarWorkflows(
      filtros
    );
  }

  public searchWorkflow(
    workflowName: string,
    nombreLargo: string,
    generateReport: boolean
  ): void {
    console.log(
      'Filtros recibidos:',
      workflowName,
      nombreLargo,
      generateReport,
      this.estadoObjectN
    );

    // Tu lógica actual aquí
  }
}
