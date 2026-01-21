import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventoinicioComponent } from '../eventoinicio.component';
import { EventoinicioService } from '../eventoinicio.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-eventoinicio',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-eventoinicio.component.html',
  styleUrl: './filtros-busqueda-eventoinicio.component.scss',
})
export class FiltrosBusquedaEventoinicioComponent {
  public eventoinicioNameF: string = '';
  public supervisorF: string = '';

  // 🔹 Estado seleccionado
  public companyObjectN: any = null;

  // 🔹 LISTA PARA EL SELECT (SOLUCIÓN AL ERROR)
  public companiesList: any[] = [];

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: EventoinicioComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private eventoinicioService: EventoinicioService) {}

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

    this.searchEventoinicio(
      this.eventoinicioNameF,
      this.supervisorF,
      generateReportBool
    );
  }

  public searchEventoinicio(
    eventoinicioName: string,
    supervisor: string,
    generateReport: boolean
  ): void {
    console.log(
      'Filtros recibidos:',
      eventoinicioName,
      supervisor,
      generateReport,
      this.companyObjectN
    );

    // Tu lógica actual aquí
  }
}
