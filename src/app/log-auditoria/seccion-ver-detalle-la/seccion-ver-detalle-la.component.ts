import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LogAuditoriaComponent } from '../log-auditoria.component';
import { ListadoDetalleLogAuditoriaComponent } from '../listado-detalle-log-auditoria/listado-detalle-log-auditoria.component';
import { LoginService } from '../../login/login.service';
import { LogAuditoriaService } from '../log-auditoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fs-seccion-ver-detalle-la',
  imports: [
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule,
  ],
  templateUrl: './seccion-ver-detalle-la.component.html',
  styleUrl: './seccion-ver-detalle-la.component.scss',
})
/**
 * Sección de visualización del detalle del log seleccionado.
 */
export class SeccionVerDetalleLaComponent {
  public dateV: string = '';
  public userNameV: string = '';
  public ipV: string = '';
  public changeV: string = '';
  public typeV: string = '';
  public nameV: string = '';
  @Input() public uc?: ListadoDetalleLogAuditoriaComponent;

  constructor(public router: Router) {}

  /**
   * Inicializa el componente cargando los datos del log desde el componente padre.
   */
  async ngOnInit(): Promise<void> {
    if (this.uc) {
      if (!this.uc.entityLog) {
        await this.uc.ngOnInit();
      }
      this.dateV = this.uc.entityLog?.changeDate || '';
      this.userNameV = this.uc.entityLog?.userName || '';
      this.ipV = this.uc.entityLog?.ip || '';
      this.changeV = this.uc.entityLog?.change || '';
      this.typeV = this.uc.entityLog?.entityType || '';
      this.nameV = this.uc.entityLog?.entityName || '';
    }
  }

  /**
   * Regresa al listado principal de logs.
   */
  public back() {
    this.router.navigate(['/main-page/verLogAuditoria']);
  }
}
