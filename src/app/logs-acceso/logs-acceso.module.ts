import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SeleccionLogComponent } from './seleccion-log/seleccion-log.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogsAccesoComponent } from './logs-acceso.component';
import { ListadoLogsAccesoComponent } from './listado-logs-acceso/listado-logs-acceso.component';
import { LogsAccesoService } from './logs-acceso.service';
import { LogsAccesoComponentInstanceService } from './logs-acceso-component-instance.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LogsAccesoComponent,
    SeleccionLogComponent,
    ListadoLogsAccesoComponent,
  ],
  providers: [LogsAccesoService, LogsAccesoComponentInstanceService],
})
export class LogsAccesoModule {}
