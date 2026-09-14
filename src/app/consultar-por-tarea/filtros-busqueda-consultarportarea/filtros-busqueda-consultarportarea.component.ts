import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConsultarPorTareaComponent } from '../consultarportarea.component';
import { ConsultarPorTareaService } from '../consultarportarea.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-consultarportarea',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-consultarportarea.component.html',
  styleUrl: './filtros-busqueda-consultarportarea.component.scss',
})
export class FiltrosBusquedaConsultarPorTareaComponent {
onEventoInicioChange($event: any) {
throw new Error('Method not implemented.');
}
  public tareasNameF: string = '';
  public supervisorF: string = '';
  public fechaInicial: string = '';
fechaFinal: string = '';

  // 🔹 Estado seleccionado
  public companyObjectN: any = null;

  // 🔹 LISTA PARA EL SELECT (SOLUCIÓN AL ERROR)
  public companiesList: any[] = [];

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: ConsultarPorTareaComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private tareasService: ConsultarPorTareaService) {}

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

    this.searchConsultarPorTarea(
      this.tareasNameF,
      this.supervisorF,
      generateReportBool
    );
  }

  public searchConsultarPorTarea(
    tareasName: string,
    supervisor: string,
    generateReport: boolean
  ): void {
    console.log(
      'Filtros recibidos:',
      tareasName,
      supervisor,
      generateReport,
      this.companyObjectN
    );

    // Tu lógica actual aquí

    
  }
}

