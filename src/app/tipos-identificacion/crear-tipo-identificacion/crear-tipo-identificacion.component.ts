import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TiposIdentificacionService } from '../tipos-identificacion.service';
import { TiposIdentificacionComponent } from '../tipos-identificacion.component';
import { TiposIdentificacionComponentInstanceService } from '../tipos-identificacion-component-instance.service';
import { MessageUtil } from '../../utils/message.util';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'fs-crear-tipo-identificacion',
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
  templateUrl: './crear-tipo-identificacion.component.html',
  styleUrl: './crear-tipo-identificacion.component.scss',
})
/**
 * Componente para crear o editar un tipo de identificación.
 */
export class CrearTipoIdentificacionComponent {
  public identTypeN: string = '';
  public identTypeNameN: string = '';
  private uc?: TiposIdentificacionComponent;
  private identTypeEdit?: string;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private tiposIdentificacionService: TiposIdentificacionService,
    private tiposIdentificacionComponentInstanceService: TiposIdentificacionComponentInstanceService,
  ) {
    this.uc = this.tiposIdentificacionComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el componente, detecta si es modo edición y precarga datos en caso afirmativo.
   */
  public ngOnInit(): void {
    if (this.uc) {
      this.uc.mensaje = '';
    }

    const id = this.route.snapshot.paramMap.get('id');
    console.log('Edit Mode On. Document Type Id:', id);
    if (id) {
      this.identTypeEdit = id;
      this.fillEditFields();
    } else {
      this.identTypeEdit = undefined;
    }
  }

  /**
   * Llena los campos del formulario cuando está en modo edición.
   */
  public fillEditFields() {
    if (this.identTypeEdit) {
      this.tiposIdentificacionService
        .getIdentificationType(this.identTypeEdit)
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.identTypeN = response.respuesta.code ?? '';
              this.identTypeNameN = response.respuesta.name ?? '';
            }
          },
          error: (e) => {
            console.error('Error al obtener el tipo de identificación', e);
            this.uc!.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_OBTENIENDO_TIPO_IDENTIFICACION,
              e,
            );
          },
        });
    }
  }

  /**
   * Determina si está en modo edición para decidir entre crear o actualizar.
   */
  public save() {
    if (!this.editMode()) {
      this.create();
    } else {
      this.edit();
    }
  }

  /**
   * Crea un nuevo tipo de identificación con los datos del formulario.
   */
  public create() {
    this.tiposIdentificacionService
      .createIdentificationType({
        name: this.identTypeNameN,
        code: this.identTypeN,
      })
      .subscribe({
        next: (response) => {
          if (this.uc) {
            this.uc.mensaje = 'Tipo de identificación creado correctamente';
          }
        },
        error: (e) => {
          console.error('Error al crear el tipo de identificación', e);
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_CREAR_TIPO_IDENTIFICACION,
              e,
            );
          }
        },
      });
  }

  /**
   * Edita el tipo de identificación existente.
   */
  public edit() {
    this.tiposIdentificacionService
      .editIdentificationType({
        name: this.identTypeNameN,
        code: this.identTypeN,
      })
      .subscribe({
        next: (response) => {
          if (this.uc) {
            this.uc.mensaje =
              'Tipo de identificación actualizado correctamente';
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_ACTUALIZAR_TIPO_IDENTIFICACION,
              e,
            );
          }
        },
      });
  }

  /**
   * Elimina el tipo de identificación actual.
   */
  public delete() {
    this.tiposIdentificacionService
      .deleteIdentificationType(this.identTypeN)
      .subscribe({
        next: (response) => {
          if (this.uc) {
            this.router.navigate(['/main-page/administrarTiposIdentificacion']);
            this.uc.ngOnInit();
            this.uc.mensaje = 'Tipo de identificación eliminado correctamente';
          }
        },
        error: (e) => {
          console.error('Error al eliminar el tipo de identificación', e);
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_ELIMINAR_TIPO_IDENTIFICACION,
              e,
            );
          }
        },
      });
  }

  /**
   * Cancela y regresa al listado de tipos de identificación.
   */
  public cancel() {
    this.router.navigate(['/main-page/administrarTiposIdentificacion']);
    this.uc!.mensaje = '';
    this.uc?.ngOnInit();
  }

  /**
   * Indica si el componente se encuentra en modo edición.
   */
  public editMode(): boolean {
    return this.identTypeEdit !== undefined && this.identTypeEdit !== '';
  }
}
