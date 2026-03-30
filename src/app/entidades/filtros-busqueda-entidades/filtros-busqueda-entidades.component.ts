import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EntidadesComponent } from '../entidades.component';
import { EntidadesService } from '../entidades.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-entidades',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-entidades.component.html',
  styleUrl: './filtros-busqueda-entidades.component.scss',
})
export class FiltrosBusquedaEntidadesComponent {
  public entidadNameF: string = '';
  public supervisorF: string = '';

  // 🔹 Estado seleccionado
  public companyObjectN: any = null;

  // 🔹 LISTA PARA EL SELECT (SOLUCIÓN AL ERROR)
  public companiesList: any[] = [];

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: EntidadesComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private entidadesService: EntidadesService) {}

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

    this.searchEntidad(
      this.entidadNameF,
      this.supervisorF,
      generateReportBool
    );
  }

  public searchEntidad(
    entidadName: string,
    supervisor: string,
    generateReport: boolean
  ): void {
    console.log(
      'Filtros recibidos:',
      entidadName,
      supervisor,
      generateReport,
      this.companyObjectN
    );

    // Tu lógica actual aquí
  }
}
