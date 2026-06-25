import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoAlarmasComponent } from './listado-alarmas/listado-alarmas.component';
import { AlarmaComponentInstanceService } from './alarmas-component-instance.service';
import { AlarmaService } from './alarmas.service';
import { CrearAlarmaComponent } from './crear-alarmas/crear-alarmas.component';
import { AlarmaComponent } from './alarmas.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearAlarmaComponent,
    ListadoAlarmasComponent,
    AlarmaComponent,
  ],
  providers: [AlarmaComponentInstanceService, AlarmaService],
  exports: [
    CrearAlarmaComponent,
    ListadoAlarmasComponent,
    AlarmaComponent,
  ],
})
export class AlarmaModule {}

