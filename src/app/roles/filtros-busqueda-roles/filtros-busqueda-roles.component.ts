import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RolesComponent } from '../roles.component';
import { RolesService } from '../roles.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-roles',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-roles.component.html',
  styleUrl: './filtros-busqueda-roles.component.scss',
})
export class FiltrosBusquedaRolesComponent {
  public rolesNameF: string = '';
  public supervisorF: string = '';

  // 🔹 Estado seleccionado
  public companyObjectN: any = null;

  // 🔹 LISTA PARA EL SELECT (SOLUCIÓN AL ERROR)
  public companiesList: any[] = [];

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: RolesComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private rolesService: RolesService) {}

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

    this.searchRoles(
      this.rolesNameF,
      this.supervisorF,
      generateReportBool
    );
  }

  public searchRoles(
    rolesName: string,
    supervisor: string,
    generateReport: boolean
  ): void {
    console.log(
      'Filtros recibidos:',
      rolesName,
      supervisor,
      generateReport,
      this.companyObjectN
    );

    // Tu lógica actual aquí
  }
}
