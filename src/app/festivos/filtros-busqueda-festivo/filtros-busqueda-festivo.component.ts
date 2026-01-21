import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FestivoComponent } from '../festivo.component';
import { FestivoService } from '../festivo.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-festivo',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-festivo.component.html',
  styleUrl: './filtros-busqueda-festivo.component.scss',
})
export class FiltrosBusquedaFestivoComponent {
  public festivoNameF: string = '';
  public supervisorF: string = '';

  // 🔹 Estado seleccionado
  public companyObjectN: any = null;

  // 🔹 LISTA PARA EL SELECT (SOLUCIÓN AL ERROR)
  public companiesList: any[] = [];

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: FestivoComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private festivoService: FestivoService) {}

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

    this.searchFestivo(
      this.festivoNameF,
      this.supervisorF,
      generateReportBool
    );
  }

  public searchFestivo(
    festivoName: string,
    supervisor: string,
    generateReport: boolean
  ): void {
    console.log(
      'Filtros recibidos:',
      festivoName,
      supervisor,
      generateReport,
      this.companyObjectN
    );

    // Tu lógica actual aquí
  }
}
