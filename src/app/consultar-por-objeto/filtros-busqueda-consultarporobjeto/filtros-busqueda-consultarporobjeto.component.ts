import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConsultarPorObjetoComponent } from '../consultarporobjeto.component';
import { ConsultarPorObjetoService } from '../consultarporobjeto.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-consultarporobjeto',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-consultarporobjeto.component.html',
  styleUrl: './filtros-busqueda-consultarporobjeto.component.scss',
})
export class FiltrosBusquedaConsultarPorObjetoComponent {
tiposAlarmaList: any;
alarma: any;
responsablesList: any;
responsable: any;
estadosTareaList: any;
estadotarea: any;
tareasList: any;
idProcesoF: any;
estadosProcesoList: any;
valorAtributoF: any;
atributosList: any;
atributo: any;
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

  @Input() public uc?: ConsultarPorObjetoComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private tareasService: ConsultarPorObjetoService) {}

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

    this.searchConsultarPorObjeto(
      this.tareasNameF,
      this.supervisorF,
      generateReportBool
    );
  }

  public searchConsultarPorObjeto(
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

