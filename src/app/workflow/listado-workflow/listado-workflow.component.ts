import { Component } from '@angular/core';
import { WorkflowComponent } from '../workflow.component';
import { FiltrosBusquedaWorkflowComponent } from '../filtros-busqueda-workflow/filtros-busqueda-workflow.component';
import { MatTableModule } from '@angular/material/table';
import { WorkflowEntity } from '../workflow.entity';

@Component({
  selector: 'ibpm-listado-workflow',
  imports: [MatTableModule, FiltrosBusquedaWorkflowComponent],
  templateUrl: './listado-workflow.component.html',
  styleUrl: './listado-workflow.component.scss',
})
/**
 * Listado de grupos con navegación a la edición y utilidades de presentación.
 */
export class ListadoWorkflowComponent {
  // 🔹 Variables de paginación
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  public displayedColumns: string[] = [
    'Nombre',
    'Descripción',
    'Supervisor',
    'Compania',
  ];

  constructor(public parent: WorkflowComponent) {}

  /**
   * Navega a la pantalla de edición del grupo seleccionado.
   */
  public goToEditarWorkflow(workflow: WorkflowEntity) {
    this.parent.router.navigate([
      `/main-page/administrarWorkflow/editarEWorkflow/${workflow.nombre}`,
    ]);
  }

  /**
   * Obtiene el nombre legible de la compañía a partir del identificador.
   */
  public getCompanyName(companyId: any) {
    const company = this.parent.companias.find((c) => c.name === companyId);
    return company ? company.largeName : '';
  }

  // 🔹 Ir a página anterior
  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.parent.searchWorkflows(); // ajusta si tu método se llama diferente
    }
  }

  // 🔹 Ir a página siguiente
  public nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.parent.searchWorkflows(); // ajusta si tu método se llama diferente
    }
  }
}
