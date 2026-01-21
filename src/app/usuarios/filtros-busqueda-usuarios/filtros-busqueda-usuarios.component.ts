import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsuariosComponent } from '../usuarios.component';
import { MatSelectModule } from '@angular/material/select';
import { AreaEntity } from '../../entities/areas/area.entity';
import { CompanyEntity } from '../../entities/companies/company.entity';
import { DocumentTypeEntity } from '../../entities/domains/document-type.entity';
import { StatusEntity } from '../../entities/domains/status.entity';
import { GroupEntity } from '../../entities/groups/group.entity';
import { LoginEntity } from '../../login/login.entity';
import { MessageUtil } from '../../utils/message.util';
import { UsuariosService } from '../usuarios.service';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'fs-filtros-busqueda-usuarios',
  imports: [
    FormsModule,
    MatButton,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatExpansionModule,
    JsonPipe,
  ],
  templateUrl: './filtros-busqueda-usuarios.component.html',
  styleUrl: './filtros-busqueda-usuarios.component.scss',
})
/**
 * Componente que agrupa los filtros de búsqueda para el listado de usuarios.
 *
 * Gestiona la carga de catálogos (áreas, grupos, tipos de documento, estados,
 * compañías) y emite la búsqueda hacia el componente de Usuarios.
 */
export class FiltrosBusquedaUsuariosComponent {
  public userNameF: string = '';
  public groupF: string = '';
  public docTypeF: string = '';
  public docNumF: string = '';
  public nameF: string = '';
  public lastNameF: string = '';
  public statusF: string = '';
  public areaF: string = '';
  public companyF: string = '';
  public generateReportF: string = '';

  // ✅ Switch generar reporte
  public generarReporte: boolean = false;

  public areasList: AreaEntity[] = [];
  public groupsList: GroupEntity[] = [];
  public documentTypesList: DocumentTypeEntity[] = [];
  public statusesList: StatusEntity[] = [];
  public companiesList: CompanyEntity[] = [];

  @Input() public uc?: UsuariosComponent;

  public loggedUser: LoginEntity | undefined;

  constructor(private usuariosService: UsuariosService) {
    this.uc = undefined;
  }

  /**
   * Inicializa el componente cargando los catálogos requeridos
   * y recuperando el usuario autenticado desde el componente padre.
   */
  ngOnInit(): void {
    this.generateReportF = 'false';
    this.loggedUser = this.uc?.loggedUser;
    this.getAreasList();
    this.getGroupsList();
    this.getDocumentTypesList();
    this.getStatusesList();
    this.getCompaniesList();
  }

  // ✅ MÉTODO DEL SWITCH

  onGenerateReportChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.generateReportF = checked ? 'true' : 'false';
  }

  /**
   * Ejecuta la búsqueda de usuarios con los filtros seleccionados.
   * Propaga la acción al componente padre para actualizar el listado.
   */
  search() {
    this.uc?.searchUsers(
      this.userNameF,
      this.groupF,
      this.docTypeF,
      this.docNumF,
      this.nameF,
      this.lastNameF,
      this.statusF,
      this.areaF,
      this.companyF,
      this.generateReportF === 'true' ? true : false,
    );
  }

  limpiarFiltros(): void {
    this.uc?.searchUsers(
      this.userNameF,
      this.groupF,
      this.docTypeF,
      this.docNumF,
      this.nameF,
      this.lastNameF,
      this.statusF,
      this.areaF,
      this.companyF,
      this.generateReportF === 'true' ? true : false,
    );
  }
  /**
   * Obtiene el listado de áreas disponibles.
   * Maneja y comunica los errores al componente padre si aplica.
   */
  public getAreasList(): void {
    try {
      this.usuariosService
        .getAreasList(this.loggedUser?.user_name ?? '')
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.areasList = response.respuesta as AreaEntity[];
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                'No se pudo encontrar las áreas',
                e,
              );
            }
          },
        });
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessage(
          'Error al obtener el listado de áreas',
          error,
        );
      }
    }
  }

  /**
   * Obtiene el listado de grupos disponibles.
   * Maneja y comunica los errores al componente padre si aplica.
   */
  public getGroupsList(): void {
    try {
      this.usuariosService
        .getGroupsList(this.loggedUser?.user_name ?? '')
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.groupsList = response.respuesta as GroupEntity[];
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                'No se pudo encontrar los grupos',
                e,
              );
            }
          },
        });
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessage(
          'Error al obtener el listado de grupos',
          error,
        );
      }
    }
  }

  /**
   * Obtiene el listado de tipos de documento.
   * Maneja y comunica los errores al componente padre si aplica.
   */
  public getDocumentTypesList(): void {
    try {
      this.usuariosService
        .getDocumentTypesList(this.loggedUser?.user_name ?? '')
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.documentTypesList =
                response.respuesta as DocumentTypeEntity[];
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                'No se pudo encontrar los tipos de documento',
                e,
              );
            }
          },
        });
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessage(
          'Error al obtener el listado de tipos de documento',
          error,
        );
      }
    }
  }

  /**
   * Obtiene el listado de estados.
   * Maneja y comunica los errores al componente padre si aplica.
   */
  public getStatusesList(): void {
    try {
      this.usuariosService
        .getStatusesList(this.loggedUser?.user_name ?? '')
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              if (this.uc) {
                this.statusesList = response.respuesta as StatusEntity[];
              }
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                'No se pudo encontrar los estados',
                e,
              );
            }
          },
        });
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessage(
          'Error al obtener el listado de estados',
          error,
        );
      }
    }
  }

  /**
   * Obtiene el listado de compañías disponibles.
   * Maneja y comunica los errores al componente padre si aplica.
   */
  public getCompaniesList(): void {
    try {
      this.usuariosService
        .getCompaniesList(this.loggedUser?.user_name ?? '')
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.companiesList = response.respuesta as CompanyEntity[];
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                'No se pudo encontrar las compañías',
                e,
              );
            }
          },
        });
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessage(
          'Error al obtener el listado de compañías',
          error,
        );
      }
    }
  }
}
