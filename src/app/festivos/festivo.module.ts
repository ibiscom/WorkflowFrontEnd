import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaFestivoComponent } from './filtros-busqueda-festivo/filtros-busqueda-festivo.component';
import { ListadoFestivoComponent } from './listado-festivo/listado-festivo.component';
import { FestivoComponent } from './festivo.component';
import { FestivoComponentInstanceService } from './festivo-component-instance.service';
import { FestivoService } from './festivo.service';
import { CrearFestivoComponent } from './crear-festivo/crear-festivo.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearFestivoComponent,
    FiltrosBusquedaFestivoComponent,
    ListadoFestivoComponent,
    FestivoComponent,
  ],
  providers: [FestivoComponentInstanceService, FestivoService],
  exports: [
    CrearFestivoComponent,
    FiltrosBusquedaFestivoComponent,
    ListadoFestivoComponent,
    FestivoComponent,
  ],
})
export class FestivoModule {}
