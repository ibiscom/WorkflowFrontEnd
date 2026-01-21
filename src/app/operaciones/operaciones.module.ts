import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoOperacionesComponent } from './listado-operaciones/listado-operaciones.component';
import { OperacionesComponent } from './operaciones.component';
import { NuevaOperacionComponent } from './nueva-operacion/nueva-operacion.component';
import { OperacionesService } from './operaciones.service';
import { OperacionesComponentInstanceService } from './operaciones-component-instance.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    OperacionesComponent,
    ListadoOperacionesComponent,
    NuevaOperacionComponent,
  ],
  providers: [OperacionesService, OperacionesComponentInstanceService],
  exports: [
    OperacionesComponent,
    ListadoOperacionesComponent,
    NuevaOperacionComponent,
  ],
})
export class OperacionesModule {}
