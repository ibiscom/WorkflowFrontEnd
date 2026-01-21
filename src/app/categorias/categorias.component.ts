import { Component } from '@angular/core';
import { LoginEntity } from '../login/login.entity';
import { CategoryEntity } from '../entities/categories/category.entity';
import { LoginService } from '../login/login.service';
import { CategoriasService } from './categorias.service';
import { CategoriasComponentInstanceService } from './categorias-component-instance.service';
import { MessageUtil } from '../utils/message.util';
import { Constants } from '../utils/constants';
import { AccionesCategoriasComponent } from './acciones-categorias/acciones-categorias.component';

import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fs-categorias',
  imports: [
    MatCardModule,
    RouterModule,
    AccionesCategoriasComponent,
    FormsModule,
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss',
})
/**
 * Gestión y listado de categorías.
 */
export class CategoriasComponent {
  public loggedUser: LoginEntity | undefined;
  public categories: CategoryEntity[] = [];
  public mensaje: string = '';

  constructor(
    private categoriasService: CategoriasService,
    private loginService: LoginService,
    private categoriasComponentInstanceService: CategoriasComponentInstanceService,
    public router: Router,
  ) {}

  /**
   * Inicializa el componente y carga las categorías.
   */
  ngOnInit(): void {
    this.categoriasComponentInstanceService.setInstance(this);
    this.loggedUser = this.loginService.getLoggedUser();
    this.searchCategories();
  }

  /**
   * Busca categorías según nombre opcional y carga sus operaciones.
   */
  public searchCategories(categoryName?: string) {
    try {
      this.mensaje = 'Buscando categorías...';
      let userGenerator: string = this.loggedUser?.user_name ?? '';

      this.categoriasService
        .getCategories(userGenerator, categoryName ?? '')
        .subscribe({
          next: (response) => {
            this.mensaje = '';
            if (response && response.respuesta) {
              this.categories = response.respuesta as CategoryEntity[];
              this.categories.forEach((category) => {
                this.categoriasService
                  .getOperationsByCategory(
                    userGenerator ?? '',
                    category.id ?? '-1',
                  )
                  .subscribe({
                    next: (operationsResponse) => {
                      if (operationsResponse && operationsResponse.respuesta) {
                        category.operations =
                          operationsResponse.respuesta as string[];
                      } else {
                        category.operations = [];
                      }
                    },
                    error: (e: any) => {
                      category.operations = [];
                      console.error(
                        `Error al obtener las operaciones de la categoría ${category.id}.`,
                        e,
                      );
                      //this.mensaje += MessageUtil.buildErrorMessageFsResponse("No se pudieron obtener las operaciones de la categoría", e);
                    },
                  });
              });
            } else {
              this.categories = [];
            }
          },
          error: (e: any) => {
            this.mensaje += MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_CATEGORIA_BUSCAR,
              e,
            );
            this.categories = [];
          },
        });
    } catch (error: any) {
      this.mensaje += MessageUtil.buildErrorMessage(
        Constants.ERR_CATEGORIA_BUSCAR_ERROR,
        error,
      );
      this.categories = [];
    }
  }
}
