import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CategoriasService } from '../categorias.service';
import { LoginService } from '../../login/login.service';
import { CategoriasComponentInstanceService } from '../categorias-component-instance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginEntity } from '../../login/login.entity';
import { CategoriasComponent } from '../categorias.component';
import { CategoryEntity } from '../../entities/categories/category.entity';
import { OperationEntity } from '../../entities/operations/operation.entity';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { MessageUtil } from '../../utils/message.util';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'fs-crear-categoria',
  imports: [
    FormsModule,
    MatButton,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.scss',
})
/**
 * Formulario para crear o editar una categoría y gestionar sus operaciones asociadas.
 */
export class CrearCategoriaComponent {
  public nameN: string = '';
  public descriptionN: string = '';
  public categoryIdEdit: string | undefined;
  public loggedUser: LoginEntity | undefined;
  public uc?: CategoriasComponent;
  public restrictedOperationsList: string[] = [];
  public operationsList: string[] = [];
  public operationE: string = '';

  public constructor(
    private categoriasService: CategoriasService,
    private loginService: LoginService,
    private categoriasComponentInstanceService: CategoriasComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.categoriasComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el formulario en modo creación o edición según el parámetro de ruta.
   */
  public async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Edit Mode On. Category Id:', id);
    if (id) {
      this.categoryIdEdit = id;
      await this.fillEditFields();
      this.getOperationsList();
      this.getRestrictedOperationsList();
    } else {
      this.categoryIdEdit = undefined;
    }
  }
  /**
   * Carga los datos de la categoría a editar y rellena los campos del formulario.
   */
  public async fillEditFields(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.categoriasService.getCategory(
          this.loggedUser?.user_name ?? '',
          this.categoryIdEdit ?? '',
        ),
      );
      if (response?.respuesta) {
        const category = response.respuesta as CategoryEntity;
        this.nameN = category.name ?? '';
        this.descriptionN = category.description ?? '';
      }
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_CATEGORIA_DATOS,
          e,
        );
      }
    }
  }

  /**
   * Guarda la categoría: invoca crear o editar según el modo actual.
   */
  public save() {
    if (!this.editMode()) {
      this.create();
    } else {
      this.edit();
    }
  }

  /**
   * Indica si el formulario está en modo edición.
   */
  public editMode(): boolean {
    return this.categoryIdEdit !== undefined && this.categoryIdEdit !== '';
  }

  /**
   * Crea una nueva categoría en el backend.
   */
  public create() {
    this.categoriasService
      .createCategory({
        userName: this.loggedUser?.user_name ?? '',
        name: this.nameN,
        description: this.descriptionN,
        ip: this.loggedUser?.user_ip ?? '',
      } as CategoryEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = 'Categoría creada correctamente.';
              this.categoryIdEdit =
                this.categoryIdEdit ?? response.respuesta.id;
              this.router.navigate([
                `/main-page/administrarCategorias/${this.categoryIdEdit}`,
              ]);
              this.ngOnInit();
            }
            // Navegar a la lista de usuarios o realizar otra acción
          } else {
            if (this.uc) {
              this.uc.mensaje = Constants.ERR_CATEGORIA_CREAR;
            }
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_CATEGORIA_CREAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Edita una categoría existente en el backend.
   */
  public edit() {
    this.categoriasService
      .editCategory({
        userName: this.loggedUser?.user_name ?? '',
        name: this.nameN,
        description: this.descriptionN,
        ip: this.loggedUser?.user_ip ?? '',
        id: this.categoryIdEdit ?? '',
      } as CategoryEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = 'Categoría editada correctamente.';
              this.categoryIdEdit =
                this.categoryIdEdit ?? response.respuesta.id;
              this.ngOnInit();
            }
            // Navegar a la lista de usuarios o realizar otra acción
            this.router.navigate([
              `/main-page/administrarCategorias/editarCategoria/${this.categoryIdEdit}`,
            ]);
          } else {
            if (this.uc) {
              this.uc.mensaje = Constants.ERR_CATEGORIA_EDITAR;
            }
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_CATEGORIA_EDITAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Carga las operaciones actualmente asociadas a la categoría.
   */
  public getOperationsList() {
    if (!this.editMode()) {
      this.operationsList = [];
      return;
    }

    this.operationsList = [];

    try {
      this.categoriasService
        .getOperationsByCategory(
          this.loggedUser?.user_name ?? '',
          this.categoryIdEdit ?? '',
        )
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              const ops = response.respuesta as string[];
              this.operationsList.push(...ops);
            }
          },
          error: (e) => {
            if (this.uc) {
              if (!e.error.mensaje.contains('no tiene operaciones asociadas')) {
                this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                  Constants.ERR_CATEGORIA_OPERACIONES,
                  e,
                );
              }
            }
          },
        });
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje =
          error.status === 400
            ? ''
            : MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_CATEGORIA_OPERACIONES_ENCONTRAR,
                error,
              );
      }
    }
  }

  /**
   * Carga las operaciones restringidas (no asociadas) de la categoría.
   */
  public getRestrictedOperationsList() {
    if (!this.editMode()) {
      this.restrictedOperationsList = [];
      return;
    }

    this.restrictedOperationsList = [];

    try {
      this.categoriasService
        .getRestrictedOperationsByCategory(
          this.loggedUser?.user_name ?? '',
          this.categoryIdEdit ?? '',
        )
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              const ops = response.respuesta as string[];
              this.restrictedOperationsList.push(...ops);
            }
          },
          error: (e) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_CATEGORIA_OPERACIONES_RESTRINGIDAS,
                e,
              );
            }
          },
        });
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje =
          error.status === 400
            ? ''
            : MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_CATEGORIA_OPERACIONES_RESTRINGIDAS_ENCONTRAR,
                error,
              );
      }
    }
  }

  /**
   * Asocia una operación seleccionada a la categoría.
   */
  public addOperationToCategory(event: MatSelectChange) {
    try {
      this.categoriasService
        .addOperationToCategory(
          this.loggedUser?.user_name ?? '',
          this.categoryIdEdit ?? '',
          event.value,
        )
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.ngOnInit();
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_CATEGORIA_ASOCIAR_OPERACION,
                e,
              );
            }
          },
        });
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_CATEGORIA_ASOCIAR_OPERACION,
          e,
        );
      }
    }
  }

  /**
   * Elimina la asociación de una operación con la categoría.
   */
  public remove(operationName: string) {
    try {
      this.categoriasService
        .removeOperationOfCategory(
          this.loggedUser?.user_name ?? '',
          this.categoryIdEdit ?? '',
          operationName,
        )
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.ngOnInit();
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_CATEGORIA_ELIMINAR_OPERACION,
                e,
              );
            }
          },
        });
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_CATEGORIA_ELIMINAR_OPERACION,
          e,
        );
      }
    }
  }

  /**
   * Elimina definitivamente la categoría.
   */
  public delete() {
    this.categoriasService
      .deleteCategory(
        this.loggedUser?.user_name ?? '',
        this.categoryIdEdit ?? '',
      )
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = 'Categoría eliminada correctamente.';
            }
            this.router.navigate(['/main-page/administrarCategorias']);
          } else {
            if (this.uc) {
              this.uc.mensaje = Constants.ERR_CATEGORIA_ELIMINAR;
            }
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_CATEGORIA_ELIMINAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Cancela la edición/creación y vuelve al listado de categorías.
   */
  public cancel() {
    this.router.navigate(['/main-page/administrarCategorias']);
  }
}
