import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoAtributosAlarmasComponent } from './listado-alarmas/listado-alarmas.component';
import { AlarmaComponent } from './alarmas.component';
import { AlarmaComponentInstanceService } from './alarmas-component-instance.service';
import { AlarmasService } from './alarmas.service';
import { CrearAlarmaComponent } from './crear-alarma/crear-alarma.component';
import { CrearAtributoAlarmaComponent } from './crear-alarmas/crear-alarmas.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearAtributoAlarmaComponent,
    CrearAlarmaComponent,
    ListadoAtributosAlarmasComponent,
    AlarmaComponent,
  ],
  providers: [AlarmaComponentInstanceService, AlarmasService],
  exports: [
    CrearAtributoAlarmaComponent,
    CrearAlarmaComponent,
    ListadoAtributosAlarmasComponent,
    AlarmaComponent,
  ],
})
export class AlarmaModule {}

