import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccionesTiposIdentificacionComponent } from './acciones-tipos-identificacion/acciones-tipos-identificacion.component';
import { CrearTipoIdentificacionComponent } from './crear-tipo-identificacion/crear-tipo-identificacion.component';
import { ListadoTiposIdentificacionComponent } from './listado-tipos-identificacion/listado-tipos-identificacion.component';
import { TiposIdentificacionComponentInstanceService } from './tipos-identificacion-component-instance.service';
import { TiposIdentificacionComponent } from './tipos-identificacion.component';
import { TiposIdentificacionService } from './tipos-identificacion.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TiposIdentificacionComponent,
    ListadoTiposIdentificacionComponent,
    CrearTipoIdentificacionComponent,
    AccionesTiposIdentificacionComponent,
  ],
  providers: [
    TiposIdentificacionService,
    TiposIdentificacionComponentInstanceService,
  ],
  exports: [
    TiposIdentificacionComponent,
    ListadoTiposIdentificacionComponent,
    CrearTipoIdentificacionComponent,
    AccionesTiposIdentificacionComponent,
  ],
})
export class TiposIdentificacionModule {}
