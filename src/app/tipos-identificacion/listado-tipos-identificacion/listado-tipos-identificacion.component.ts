import { Component } from '@angular/core';
import { TiposIdentificacionComponent } from '../tipos-identificacion.component';
import { DocumentTypeEntity } from '../../entities/domains/document-type.entity';

@Component({
  selector: 'fs-listado-tipos-identificacion',
  templateUrl: './listado-tipos-identificacion.component.html',
  styleUrl: './listado-tipos-identificacion.component.scss',
})
/**
 * Componente encargado de mostrar el listado de tipos de identificación con su tabla.
 * Ofrece navegación hacia la edición de un tipo de identificación.
 */
export class ListadoTiposIdentificacionComponent {
  public currentPage: number = 1;
  public numberOfPages: number = 1;

  constructor(public parent: TiposIdentificacionComponent) {}

  /**
   * Navega a la pantalla de edición del tipo de identificación seleccionado.
   * @param tipoIdentificacion Tipo de identificación a editar.
   */
  public goToEditarTipoIdentificacion(tipoIdentificacion: DocumentTypeEntity) {
    this.parent.router.navigate([
      `/main-page/administrarTiposIdentificacion/editarTipoIdentificacion/${tipoIdentificacion.code}`,
    ]);
  }

  /**
   * Página anterior del paginador
   */
  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      // Si futuramente implementas paginación real
      // this.parent.loadPage(this.currentPage);
    }
  }

  /**
   * Página siguiente del paginador
   */
  public nextPage() {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      // this.parent.loadPage(this.currentPage);
    }
  }
}
