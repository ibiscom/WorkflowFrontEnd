import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DistribuirtareaComponent } from '../distribuirtarea.component';
import { DistribuirtareaService } from '../distribuirtarea.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-distribuirtarea',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-distribuirtarea.component.html',
  styleUrl: './filtros-busqueda-distribuirtarea.component.scss',
})
export class FiltrosBusquedaDistribuirtareaComponent {
idNegocio: any;
getListaResponsables($event: any) {
throw new Error('Method not implemented.');
}
  public tareasNameF: string = '';
  public supervisorF: string = '';

  // 🔹 Estado seleccionado
  public companyObjectN: any = null;

  // 🔹 LISTA PARA EL SELECT (SOLUCIÓN AL ERROR)
  public companiesList: any[] = [];

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: DistribuirtareaComponent;
  public loggedUser: LoginEntity | undefined;
responsableSeleccionado: any;
responsables: any;
cuentaUsuario: any;
instancia: any;
estado: any;

  constructor(private tareasService: DistribuirtareaService) {}

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

    this.searchFinalizarproceso(
      this.tareasNameF,
      this.supervisorF,
      generateReportBool
    );
  }

  public searchFinalizarproceso(
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

