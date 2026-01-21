import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { AuthorizationStateEntity } from '../../entities/authorization-states/authorization-state.entity';
import { LogsAccesoComponent } from '../logs-acceso.component';
import { LogsAccesoService } from '../logs-acceso.service';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';
import { MessageUtil } from '../../utils/message.util';
import { LoginEntity } from '../../login/login.entity';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { environment } from '../../../environments/environment';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'fs-seleccion-log',
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
    MatDatepickerModule,
    MatTimepickerModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: environment.dateLocale },
  ],
  templateUrl: './seleccion-log.component.html',
  styleUrl: './seleccion-log.component.scss',
})
/**
 * Componente de filtros para la búsqueda de logs de acceso.
 * Permite seleccionar archivo, fechas, acción, usuario, IP y autorización.
 */
export class SeleccionLogComponent {
  @Input() public uc?: LogsAccesoComponent;

  /** Listas */
  public availableLogsList: string[] = [];
  public actionsList: string[] = [];
  public userAccountsList: string[] = [];
  public authorizationActionsList: AuthorizationStateEntity[] = [];
  public loggedUser?: LoginEntity;

  /** Filtros */
  public selectedLogF: string = '';

  public fechaDesdeF: string = '';
  public fechaHastaF: string = '';

  // <-- LAS QUE TE DABA ERROR — AQUÍ ESTÁN
  public horaDesdeF: string = '';
  public horaHastaF: string = '';

  public actionNameF: string = '';
  public userAccountF: string = '';
  public authorizationActionF?: AuthorizationStateEntity;

  public ipAddressF: string = '';

  constructor(
    private logsAccesoService: LogsAccesoService,
    private loginService: LoginService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.loggedUser = this.loginService.getLoggedUser();
    if (!this.loggedUser) {
      this.router.navigate(['/login']);
      return;
    }
    this.getAvailableLogs();
    this.getActionsList();
    this.getUserAccountsList();
    this.getAuthorizationActionsList();
  }

  /** Une fecha + hora y llama a loadAccessLogs */
  public search() {
    const fechaDesde = this.mergeDateTime(this.fechaDesdeF, this.horaDesdeF);
    const fechaHasta = this.mergeDateTime(this.fechaHastaF, this.horaHastaF);

    this.uc!.loadAccessLogs(
      this.userAccountF,
      this.actionNameF,
      this.authorizationActionF,
      this.ipAddressF,
      fechaDesde,
      fechaHasta,
      this.selectedLogF,
    );
  }

  private mergeDateTime(fecha: string, hora: string): string | undefined {
    if (!fecha) return undefined;
    const iso = hora ? `${fecha}T${hora}:00` : `${fecha}T00:00:00`;
    return this.formatSelectedDate(iso);
  }

  private formatSelectedDate(isoDate: string): string | undefined {
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return undefined;

    const two = (n: number) => n.toString().padStart(2, '0');

    const dd = two(d.getDate());
    const mm = two(d.getMonth() + 1);
    const yyyy = d.getFullYear();

    const hours = d.getHours();
    const h12 = hours % 12 === 0 ? 12 : hours % 12;
    const hh = two(h12);
    const mmn = two(d.getMinutes());
    const ss = two(d.getSeconds());
    const ampm = hours < 12 ? 'a.m.' : 'p.m.';

    return `${dd}/${mm}/${yyyy} ${hh}:${mmn}:${ss} ${ampm}`;
  }

  // --- Métodos de carga originales (los dejo sin cambios) ---
  private getActionsList() { /* ... */ }
  private getUserAccountsList() { /* ... */ }
  private getAuthorizationActionsList() { /* ... */ }
  private getAvailableLogs() { /* ... */ }
}
