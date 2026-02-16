import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DependenciaComponent } from '../dependencia.component';
import { DependenciaService } from '../dependencia.service';
import { LoginEntity } from '../../login/login.entity';
import { WorkflowFilterEntity } from '../../workflow/workflow-filter.entity';
import { DependenciaFilterEntity } from '../dependencia-filter.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-dependencia',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-dependencia.component.html',
  styleUrl: './filtros-busqueda-dependencia.component.scss',
})
export class FiltrosBusquedaDependenciaComponent {
  nombreWorkflowB: string= '';
  nombreB: string= '';
  nombreTareaCabezaB: string= '';
  nombreTareaColaB: string= '';
  estadoB: string= '';
  primitivaB: string= '';
  expresionB: string= '';
  descripcionB: string= '';
  
  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: DependenciaComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private dependenciaService: DependenciaService) {}

  ngOnInit(): void {
    this.loggedUser = this.uc?.loggedUser;

    // 🔹 Carga inicial (puedes cambiar la lógica luego)
    
  }

  // 🔹 Simulación / carga de estados
  
  // Cambio del select

  // Ejecuta búsqueda
    public buscar(): void {
      const generateReportBool = this.generateReportF === 'true';
  
      let filtros: DependenciaFilterEntity = {
  nombreWorkflow: this.nombreWorkflowB,
  nombre: this.nombreB,
  nombreTareaCabeza: this.nombreTareaCabezaB,
  nombreTareaCola: this.nombreTareaColaB,
  estado: this.estadoB,
  primitiva: this.primitivaB,
  expresion: this.expresionB,
  descripcion: this.descripcionB
      };
  
      this.uc?.buscarDependencias(
        filtros
      );
    }
  
    public searchDependencia(
      nombreworkflow: string,
      nombre: string,
          ): void {
      console.log(
        'Filtros recibidos:',
        nombreworkflow,
        nombre
        
      );
  
      // Tu lógica actual aquí
    }
  }
