import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResponsableComponent } from '../responsable.component';
import { ResponsableService } from '../responsable.service';
import { LoginEntity } from '../../login/login.entity';
import { ResponsableEntity } from '../responsable.entity';
import { ResponsablesFilterEntity } from '../reponsable-filter.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-responsable',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-responsable.component.html',
  styleUrl: './filtros-busqueda-responsable.component.scss',
})
export class FiltrosBusquedaResponsableComponent {
search() {
throw new Error('Method not implemented.');
}
  public userLoguinB: string = '';
  public userRolNameB: string = '';

  // 🔹 Estado seleccionado
  public responsableObjectN?: ResponsableEntity = undefined;

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: ResponsableComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private responsableService: ResponsableService) {}

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
