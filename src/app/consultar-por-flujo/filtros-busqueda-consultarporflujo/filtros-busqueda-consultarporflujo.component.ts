import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConsultarPorFlujoComponent } from '../consultarporflujo.component';
import { ConsultarPorFlujoService } from '../consultarporflujo.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-consultarporflujo',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-consultarporflujo.component.html',
  styleUrl: './filtros-busqueda-consultarporflujo.component.scss',
})
export class FiltrosBusquedaConsultarPorFlujoComponent {
tiposAlarmaList: any;
alarma: any;
responsablesList: any;
responsable: any;
estadosTareaList: any;
estadotarea: any;
tareasList: any;
idProcesoF: any;
estadosProcesoList: any;
onAlarmaChange($event: any) {
throw new Error('Method not implemented.');
}
onResponsableChange($event: any) {
throw new Error('Method not implemented.');
}
onEstadoTareaChange($event: any) {
throw new Error('Method not implemented.');
}
onEstadoProcesoChange($event: any) {
throw new Error('Method not implemented.');
}
estadoproceso: any;
onTareaNameChange($event: any) {
throw new Error('Method not implemented.');
}
onEstadoChange($event: any) {
throw new Error('Method not implemented.');
}
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

  @Input() public uc?: ConsultarPorFlujoComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private tareasService: ConsultarPorFlujoService) {}

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

    this.searchConsultarPorFlujo(
      this.tareasNameF,
      this.supervisorF,
      generateReportBool
    );
  }

  public searchConsultarPorFlujo(
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

