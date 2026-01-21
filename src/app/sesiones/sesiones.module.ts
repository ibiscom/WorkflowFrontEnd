import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionesComponent } from './sesiones.component';
import { FormsModule } from '@angular/forms';
import { ListadoSesionesComponent } from './listado-sesiones/listado-sesiones.component';
import { RouterModule, Routes } from '@angular/router';
import { SesionesService } from './sesiones.service';
import { TiemposMaximosSesionesComponent } from './tiempos-maximos-sesiones/tiempos-maximos-sesiones.component';
import { SesionesComponentInstanceService } from './sesiones-component-instance.service';
import { FiltrosBusquedaSesionesComponent } from './filtros-busqueda-sesiones/filtros-busqueda-sesiones.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SesionesComponent,
    FiltrosBusquedaSesionesComponent,
    ListadoSesionesComponent,
    TiemposMaximosSesionesComponent,
  ],
  providers: [SesionesService, SesionesComponentInstanceService],
  exports: [
    SesionesComponent,
    FiltrosBusquedaSesionesComponent,
    ListadoSesionesComponent,
    TiemposMaximosSesionesComponent,
  ],
})
export class SesionesModule {}
