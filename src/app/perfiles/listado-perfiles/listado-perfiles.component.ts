import { Component, Input } from '@angular/core';
import { PerfilesComponent } from '../perfiles.component';
import { ProfileEntity } from '../../entities/profiles/profile.entity';
import { FiltrosBusquedaPerfilesComponent } from '../filtros-busqueda-perfil/filtros-busqueda-perfiles.component';
import { MatTableModule } from '@angular/material/table';
import { PerfilesComponentInstanceService } from '../perfiles-component-instance.service';

@Component({
  selector: 'fs-listado-perfiles',
  imports: [MatTableModule, FiltrosBusquedaPerfilesComponent],
  templateUrl: './listado-perfiles.component.html',
  styleUrl: './listado-perfiles.component.scss',
})
/**
 * Componente encargado de mostrar el listado de perfiles con su tabla.
 * Ofrece navegación hacia la edición de un perfil.
 */
export class ListadoPerfilesComponent {
  public currentPage: number = 1;
  public numberOfPages: number = 1;
  public displayedColumns: string[] = ['Nombre', 'Descripción'];

  constructor(public parent: PerfilesComponent) {}

  /**
   * Navega a la pantalla de edición del perfil seleccionado.
   * @param profile Perfil a editar.
   */
  public goToEditarPerfil(profile: ProfileEntity) {
    this.parent.router.navigate([
      `/main-page/administrarPerfiles/editarPerfil/${profile.name}`,
    ]);
  }
}
