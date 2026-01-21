import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoDependenciaComponent } from './listado-dependencia/listado-dependencia.component';
import { DependenciaComponent } from './dependencia.component';
import { DependenciaComponentInstanceService } from './dependencia-component-instance.service';
import { DependenciaService } from './dependencia.service';
import { CrearDependenciaComponent } from './crear-dependencias/crear-dependencia.component';
import { FiltrosBusquedaDependenciaComponent } from './filtros-busqueda-dependencias/filtros-busqueda-dependencia.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearDependenciaComponent,
    FiltrosBusquedaDependenciaComponent,
    ListadoDependenciaComponent,
    DependenciaComponent,
  ],
  providers: [DependenciaComponentInstanceService, DependenciaService],
  exports: [
    CrearDependenciaComponent,
    FiltrosBusquedaDependenciaComponent,
    ListadoDependenciaComponent,
    DependenciaComponent,
  ],
})
export class DependenciaModule {}
