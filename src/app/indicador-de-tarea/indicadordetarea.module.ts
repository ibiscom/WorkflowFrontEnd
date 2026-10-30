import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoIndicadorDeTareaComponent } from './listado-indicadordetarea/listado-indicadordetarea.component';
import { IndicadorDeTareaComponent } from './indicadordetarea.component';
import { IndicadorDeTareaComponentInstanceService } from './indicadordetarea-component-instance.service';
import { IndicadorDeTareaService } from './indicadordetarea.service';
import { FiltrosBusquedaIndicadorDeTareaComponent } from './filtros-busqueda-indicadordetarea/filtros-busqueda-indicadordetarea.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaIndicadorDeTareaComponent,
    ListadoIndicadorDeTareaComponent,
    IndicadorDeTareaComponent,
  ],
  providers: [IndicadorDeTareaComponentInstanceService, IndicadorDeTareaService],
  exports: [
    FiltrosBusquedaIndicadorDeTareaComponent,
    ListadoIndicadorDeTareaComponent,
    IndicadorDeTareaComponent,
  ],
})
export class IndicadorDeTareaModule {}

