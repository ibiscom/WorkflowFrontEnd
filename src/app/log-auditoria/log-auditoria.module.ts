import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogAuditoriaComponent } from './log-auditoria.component';
import { FiltrosBusquedaLogAuditoriaComponent } from './filtros-busqueda-log-auditoria/filtros-busqueda-log-auditoria.component';
import { ListadoDetalleLogAuditoriaComponent } from './listado-detalle-log-auditoria/listado-detalle-log-auditoria.component';
import { ListadoLogAuditoriaComponent } from './listado-log-auditoria/listado-log-auditoria.component';
import { SeccionVerDetalleLaComponent } from './seccion-ver-detalle-la/seccion-ver-detalle-la.component';
import { LogAuditoriaService } from './log-auditoria.service';
import { LogAuditoriaComponentInstanceService } from './log-auditoria-component-instance.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LogAuditoriaComponent,
    FiltrosBusquedaLogAuditoriaComponent,
    ListadoDetalleLogAuditoriaComponent,
    ListadoLogAuditoriaComponent,
    SeccionVerDetalleLaComponent,
  ],
  providers: [LogAuditoriaService, LogAuditoriaComponentInstanceService],
  exports: [
    LogAuditoriaComponent,
    FiltrosBusquedaLogAuditoriaComponent,
    ListadoDetalleLogAuditoriaComponent,
    ListadoLogAuditoriaComponent,
    SeccionVerDetalleLaComponent,
  ],
})
export class LogAuditoriaModule {}
