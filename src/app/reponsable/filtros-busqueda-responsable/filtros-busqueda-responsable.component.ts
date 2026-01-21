import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResponsableComponent } from '../responsable.component';
import { ResponsableService } from '../responsable.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-responsable',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-responsable.component.html',
  styleUrl: './filtros-busqueda-responsable.component.scss',
})
export class FiltrosBusquedaResponsableComponent {
  public responsableNameF: string = '';
  public supervisorF: string = '';

  // 🔹 Estado seleccionado
  public companyObjectN: any = null;

  // 🔹 LISTA PARA EL SELECT (SOLUCIÓN AL ERROR)
  public companiesList: any[] = [];

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: ResponsableComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private responsableService: ResponsableService) {}

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

    this.searchResponsable(
      this.responsableNameF,
      this.supervisorF,
      generateReportBool
    );
  }

  public searchResponsable(
    responsableName: string,
    supervisor: string,
    generateReport: boolean
  ): void {
    console.log(
      'Filtros recibidos:',
      responsableName,
      supervisor,
      generateReport,
      this.companyObjectN
    );

    // Tu lógica actual aquí
  }
}
