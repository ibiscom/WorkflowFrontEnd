import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ObjetowComponent } from '../objetow.component';
import { ObjetowService } from '../objetow.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-crear-objetow',
  imports: [FormsModule],
  templateUrl: './crear-objetow.component.html',
  styleUrl: './crear-objetow.component.scss',
})
export class CrearObjetowComponent {
save() {
throw new Error('Method not implemented.');
}
  public objetowNameF: string = '';
  public supervisorF: string = '';

  // 🔹 Estado seleccionado
  public companyObjectN: any = null;

  // 🔹 LISTA PARA EL SELECT (SOLUCIÓN AL ERROR)
  public companiesList: any[] = [];

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: ObjetowComponent;
  public loggedUser: LoginEntity | undefined;
nombreObjetoWN: any;
descripcionObjetoWN: any;

  constructor(private objetowService: ObjetowService) {}

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

    this.searchTareas(
      this.objetowNameF,
      this.supervisorF,
      generateReportBool
    );
  }

  public searchTareas(
    objetowName: string,
    supervisor: string,
    generateReport: boolean
  ): void {
    console.log(
      'Filtros recibidos:',
      objetowName,
      supervisor,
      generateReport,
      this.companyObjectN
    );

    // Tu lógica actual aquí
  }
}

