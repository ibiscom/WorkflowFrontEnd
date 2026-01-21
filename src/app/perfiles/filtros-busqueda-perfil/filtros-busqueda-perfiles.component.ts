import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerfilesComponent } from '../perfiles.component';
import { PerfilesService } from '../perfiles.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'fs-filtros-busqueda-perfiles',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-perfiles.component.html',
  styleUrl: './filtros-busqueda-perfiles.component.scss',
})
export class FiltrosBusquedaPerfilesComponent {
  /** Campo de filtro */
  public profileNameF: string = '';

  /** Componente padre */
  @Input() public uc?: PerfilesComponent;

  /** Usuario autenticado */
  public loggedUser: LoginEntity | undefined;

  constructor(private perfilesService: PerfilesService) {}

  /**
   * Vincula el usuario logueado en el padre.
   */
  ngOnInit(): void {
    this.loggedUser = this.uc?.loggedUser;
  }

  /**
   * Llama al método del padre que hace la búsqueda.
   */
  public search(): void {
    this.uc?.searchProfiles(this.profileNameF);
  }

  /**
   * Limpia los filtros y vuelve a buscar sin criterios.
   */
  public limpiarFiltros(): void {
    this.profileNameF = '';
    this.uc?.searchProfiles('');
  }
}
