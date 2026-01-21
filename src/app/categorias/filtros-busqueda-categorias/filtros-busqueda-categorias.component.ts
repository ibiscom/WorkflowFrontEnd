import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriasComponent } from '../categorias.component';
import { CategoriasService } from '../categorias.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'fs-filtros-busqueda-categorias',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-categorias.component.html',
  styleUrl: './filtros-busqueda-categorias.component.scss',
})
export class FiltrosBusquedaCategoriasComponent {
  /** Campo de filtro */
  public nameF: string = '';

  /** Componente padre */
  @Input() public uc?: CategoriasComponent;

  /** Usuario autenticado */
  public loggedUser: LoginEntity | undefined;

  constructor(private categoriasService: CategoriasService) {}

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
    this.uc?.searchCategories(this.nameF);
  }

  /**
   * Limpia los filtros y vuelve a buscar sin criterios.
   */
  public limpiarFiltros(): void {
    this.nameF = '';
    this.uc?.searchCategories('');
  }
}
