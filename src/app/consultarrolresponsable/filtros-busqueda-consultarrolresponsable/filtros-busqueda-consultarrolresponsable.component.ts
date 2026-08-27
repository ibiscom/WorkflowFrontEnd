import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConsultarRolResponsableComponent } from '../consultarrolresponsable.component';
import { ConsultarRolResponsableService } from '../consultarrolresponsable.service';
import { LoginEntity } from '../../login/login.entity';
import { ConsultarRolResponsableEntity } from '../consultarrolresponsable.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-consultarrolresponsable',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-consultarrolresponsable.component.html',
  styleUrl: './filtros-busqueda-consultarrolresponsable.component.scss',
})
export class FiltrosBusquedaConsultarRolResponsableComponent {
consultarRoles() {
throw new Error('Method not implemented.');
}
conoceCuenta: any;
responsableSeleccionado: any;
responsablesList: any;
search() {
throw new Error('Method not implemented.');
}
  public userLoguinB: string = '';
  public userRolNameB: string = '';

  // 🔹 Estado seleccionado
  public responsableObjectN?: ConsultarRolResponsableEntity = undefined;

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: ConsultarRolResponsableComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private consultarRolResponsableService: ConsultarRolResponsableService) {}

  ngOnInit(): void {
    this.loggedUser = this.uc?.loggedUser;

    // 🔹 Carga inicial (puedes cambiar la lógica luego)
    this.loadResponsables();
  }

  // 🔹 Simulación / carga de responsables
  private loadResponsables(): void {
      this.uc?.obtenerResponsables();
  }



  // Cambio del select
  public onResponsableChange(value: any): void {
    this.responsableObjectN = value;
    console.log('Responsable seleccionado:', this.responsableObjectN);
  }

  // Ejecuta búsqueda

  public searchResponsables(
    userLoguin: string,
    userRolName: string,
  ): void {
    console.log(
      'Filtros recibidos:',
      userLoguin,
      userRolName,
      this.responsableObjectN
    );

    // Tu lógica actual aquí
  }
}
