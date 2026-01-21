import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DependenciaComponent } from '../dependencia.component';
import { DependenciaService } from '../dependencia.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-dependencia',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-dependencia.component.html',
  styleUrl: './filtros-busqueda-dependencia.component.scss',
})
export class FiltrosBusquedaDependenciaComponent {
  public dependenciaNameF: string = '';
  public supervisorF: string = '';

  // 🔹 Estado seleccionado
  public companyObjectN: any = null;

  // 🔹 LISTA PARA EL SELECT (SOLUCIÓN AL ERROR)
  public companiesList: any[] = [];

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: DependenciaComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private dependenciaService: DependenciaService) {}

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

    this.searchDependencia(
      this.dependenciaNameF,
      this.supervisorF,
      generateReportBool
    );
  }

  public searchDependencia(
    dependenciaName: string,
    supervisor: string,
    generateReport: boolean
  ): void {
    console.log(
      'Filtros recibidos:',
      dependenciaName,
      supervisor,
      generateReport,
      this.companyObjectN
    );

    // Tu lógica actual aquí
  }
}
