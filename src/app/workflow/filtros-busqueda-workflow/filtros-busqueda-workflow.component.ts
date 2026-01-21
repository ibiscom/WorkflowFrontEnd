import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkflowComponent } from '../workflow.component';
import { WorkflowService } from '../workflow.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-workflow',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-workflow.component.html',
  styleUrl: './filtros-busqueda-workflow.component.scss',
})
export class FiltrosBusquedaWorkflowComponent {
  public workflowNameF: string = '';
  public supervisorF: string = '';

  // 🔹 Estado seleccionado
  public companyObjectN: any = null;

  // 🔹 LISTA PARA EL SELECT (SOLUCIÓN AL ERROR)
  public companiesList: any[] = [];

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: WorkflowComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private workflowService: WorkflowService) {}

  ngOnInit(): void {
    this.loggedUser = this.uc?.loggedUser;

    // 🔹 Carga inicial (puedes cambiar la lógica luego)
    this.loadCompanies();
  }

  // 🔹 Simulación / carga de estados
  private loadCompanies(): void {
    // Si luego viene de servicio, aquí se reemplaza
    this.companiesList = [
      { id: 1, largeName: 'Activo' },
      { id: 2, largeName: 'Inactivo' }
    ];
  }

  // Cambio del select
  public onCompanyChange(value: any): void {
    this.companyObjectN = value;
    console.log('Estado seleccionado:', this.companyObjectN);
  }

  // Ejecuta búsqueda
  public search(): void {
    const generateReportBool = this.generateReportF === 'true';

    this.searchWorkflow(
      this.workflowNameF,
      this.supervisorF,
      generateReportBool
    );
  }

  public searchWorkflow(
    workflowName: string,
    supervisor: string,
    generateReport: boolean
  ): void {
    console.log(
      'Filtros recibidos:',
      workflowName,
      supervisor,
      generateReport,
      this.companyObjectN
    );

    // Tu lógica actual aquí
  }
}
