import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GrupoComponent } from '../grupo.component';
import { GrupoService } from '../grupo.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-grupo',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-grupo.component.html',
  styleUrl: './filtros-busqueda-grupo.component.scss',
})
export class FiltrosBusquedaGrupoComponent {
  public grupoNameF: string = '';
  public supervisorF: string = '';

  // 🔹 Estado seleccionado
  public companyObjectN: any = null;

  // 🔹 LISTA PARA EL SELECT (SOLUCIÓN AL ERROR)
  public companiesList: any[] = [];

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: GrupoComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private grupoService: GrupoService) {}

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

    this.searchGrupo(
      this.grupoNameF,
      this.supervisorF,
      generateReportBool
    );
  }

  public searchGrupo(
    grupoName: string,
    supervisor: string,
    generateReport: boolean
  ): void {
    console.log(
      'Filtros recibidos:',
      grupoName,
      supervisor,
      generateReport,
      this.companyObjectN
    );

    // Tu lógica actual aquí
  }
}

