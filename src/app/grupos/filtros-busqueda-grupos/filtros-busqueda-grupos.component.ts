import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GruposComponent } from '../grupos.component';
import { GruposService } from '../grupos.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'fs-filtros-busqueda-grupos',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-grupos.component.html',
  styleUrl: './filtros-busqueda-grupos.component.scss',
})
export class FiltrosBusquedaGruposComponent {
  public groupNameF: string = '';
  public supervisorF: string = '';

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: GruposComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private gruposService: GruposService) {}

  ngOnInit(): void {
    this.loggedUser = this.uc?.loggedUser;
  }

  // Cambio del switch
  public onGenerateReportChange(event: any): void {
    this.generateReportF = event.target.checked ? 'true' : 'false';
  }

  // Ejecuta búsqueda
  public search(): void {
    const generateReportBool = this.generateReportF === 'true';
  }
public searchGroups(
  groupName: string,
  supervisor: string,
  generateReport: boolean
): void {

  console.log("Filtros recibidos:", groupName, supervisor, generateReport);

  // Tu lógica actual aquí
}


}
