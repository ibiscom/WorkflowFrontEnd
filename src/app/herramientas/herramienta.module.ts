import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaHerramientaComponent } from './filtros-busqueda-herramienta/filtros-busqueda-herramienta.component';
import { ListadoHerramientaComponent } from './listado-herramienta/listado-herramienta.component';
import { HerramientaComponent } from './herramienta.component';
import { HerramientaComponentInstanceService } from './herramienta-component-instance.service';
import { HerramientaService } from './herramienta.service';
import { CrearHerramientaComponent } from './crear-herramienta/crear-herramienta.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearHerramientaComponent,
    FiltrosBusquedaHerramientaComponent,
    ListadoHerramientaComponent,
    HerramientaComponent,
  ],
  providers: [HerramientaComponentInstanceService, HerramientaService],
  exports: [
    CrearHerramientaComponent,
    FiltrosBusquedaHerramientaComponent,
    ListadoHerramientaComponent,
    HerramientaComponent,
  ],
})
export class HerramientaModule {}
