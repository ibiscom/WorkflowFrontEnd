import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HerramientaComponent } from '../herramienta.component';
import { HerramientaService } from '../herramienta.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-herramienta',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-herramienta.component.html',
  styleUrl: './filtros-busqueda-herramienta.component.scss',
})
export class FiltrosBusquedaHerramientaComponent {
  public herramientaNameF: string = '';
  public supervisorF: string = '';

  // 🔹 Estado seleccionado
  public companyObjectN: any = null;

  // 🔹 LISTA PARA EL SELECT (SOLUCIÓN AL ERROR)
  public companiesList: any[] = [];

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: HerramientaComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private herramientaService: HerramientaService) {}

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

    this.searchHerramienta(
      this.herramientaNameF,
      this.supervisorF,
      generateReportBool
    );
  }

  public searchHerramienta(
    herramientaName: string,
    supervisor: string,
    generateReport: boolean
  ): void {
    console.log(
      'Filtros recibidos:',
      herramientaName,
      supervisor,
      generateReport,
      this.companyObjectN
    );

    // Tu lógica actual aquí
  }
}

