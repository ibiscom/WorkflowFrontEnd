import { Component, Input } from '@angular/core';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LogAuditoriaComponent } from '../log-auditoria.component';
import { environment } from '../../../environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { EntityLogFilterEntity } from '../../entities/entities/entity-log-filter.entity';
import { LogAuditoriaService } from '../log-auditoria.service';
import { LoginService } from '../../login/login.service';
import { LoginEntity } from '../../login/login.entity';
import { MessageUtil } from '../../utils/message.util';

@Component({
  selector: 'fs-filtros-busqueda-log-auditoria',
  templateUrl: './filtros-busqueda-log-auditoria.component.html',
  styleUrls: ['./filtros-busqueda-log-auditoria.component.scss'],
  imports: [
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule,
    LogAuditoriaComponent
],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: environment.dateLocale },
  ],
})
/**
 * Componente de filtros de búsqueda para el log de auditoría.
 * Permite filtrar por rango de fechas, usuario, IP, operación y acción.
 */
export class FiltrosBusquedaLogAuditoriaComponent {
  @Input() public uc?: LogAuditoriaComponent;
  public startDateF: string = '';
  public endDateF: string = '';
  public userF: string = '';
  public usersList: string[] = [];
  public ipF: string = '';
  public operationF: string = '';
  public operationsList: string[] = [];
  public actionF: string = '';
  public actionsList: string[] = [];
  public loggedUser?: LoginEntity;

  constructor(
    private loginService: LoginService,
    private logAuditoriaService: LogAuditoriaService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
  }

  /**
   * Inicializa el componente cargando listas auxiliares (usuarios, operaciones, acciones).
   */
  ngOnInit(): void {
    this.loadUserAccounts();
    this.loadOperations();
    this.loadActions();
  }

  /**
   * Carga la lista de operaciones disponibles para filtrar.
   */
  private loadOperations() {
    this.operationsList = [];
    this.logAuditoriaService.getTypesLogEntity().subscribe({
      next: (response) => {
        this.operationsList = response.respuesta;
        if (this.uc) {
          this.uc.mensaje = '';
        }
      },
      error: (error) => {
        if (this.uc) {
          this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
            'No se pudo cargar los tipos de entidad',
            error,
          );
        }
      },
    });
  }

  /**
   * Carga las acciones de acuerdo a la operación seleccionada.
   */
  public loadActions(event?: Event) {
  if (event) {
    const select = event.target as HTMLSelectElement;
    this.operationF = select.value;
  }
  if (this.operationF && this.operationF !== '') {
    this.actionsList = [];
    this.logAuditoriaService.getLogActions(this.operationF).subscribe({
      next: (response) => {
        this.actionsList = response.respuesta;
      },
      error: (error) => {
        console.error('Error cargando acciones', error);
      },
    });
  }
  }

  /**
   * Carga la lista de cuentas de usuario disponibles para filtrar.
   */
  private loadUserAccounts() {
    this.usersList = [];
    this.logAuditoriaService
      .getUsers(this.loggedUser?.user_name ?? '')
      .subscribe({
        next: (response) => {
          this.usersList = response.respuesta;
          if (this.uc) {
            this.uc.mensaje = '';
          }
        },
        error: (error) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              'No se pudo cargar las cuentas de usuario',
              error,
            );
          }
        },
      });
  }

  /**
   * Ejecuta la búsqueda según los filtros seleccionados.
   */
  public search() {
    let filter: EntityLogFilterEntity = {
      userName: this.loggedUser?.user_name || '',
      startDate: this.startDateF,
      finishDate: this.endDateF,
      user: this.userF,
      ip: this.ipF,
      entityType: this.operationF,
      change: this.actionF,
    };
    this.uc?.searchEntityLogs(filter);
  }
  public showDownloadButton(): boolean {
    return (
      this.startDateF !== '' ||
      this.endDateF !== '' ||
      this.userF !== '' ||
      this.ipF !== '' ||
      this.operationF !== '' ||
      this.actionF !== ''
    );
  }

  /**
   * Descarga el reporte de logs según los filtros seleccionados.
   */
  public download() {
    let filter: EntityLogFilterEntity = {
      userName: this.loggedUser?.user_name || '',
      startDate: this.startDateF,
      finishDate: this.endDateF,
      user: this.userF,
      ip: this.ipF,
      entityType: this.operationF,
      change: this.actionF,
    };
    this.uc?.downloadEntityLogs(filter);
  }
}
