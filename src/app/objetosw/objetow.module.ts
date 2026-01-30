import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoObjetowComponent } from './listado-objetow/listado-objetow.component';
import { ObjetowComponent } from './objetow.component';
import { ObjetowComponentInstanceService } from './objetow-component-instance.service';
import { ObjetowService } from './objetow.service';
import { CrearObjetowComponent } from './crear-objetow/crear-objetow.component';
import { FiltrosBusquedaObjetowComponent } from './filtros-busqueda-objetow/filtros-busqueda-objetow.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearObjetowComponent,
    FiltrosBusquedaObjetowComponent,
    ListadoObjetowComponent,
    ObjetowComponent,
  ],
  providers: [ObjetowComponentInstanceService, ObjetowService],
  exports: [
    CrearObjetowComponent,
    FiltrosBusquedaObjetowComponent,
    ListadoObjetowComponent,
    ObjetowComponent,
  ],
})
export class ObjetowModule {}

