import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaEntidadesComponent } from './filtros-busqueda-entidades/filtros-busqueda-entidades.component';
import { ListadoEntidadesComponent } from './listado-entidades/listado-entidades.component';
import { EntidadesComponent } from './entidades.component';
import { EntidadesComponentInstanceService } from './entidades-component-instance.service';
import { EntidadesService } from './entidades.service';
import { CrearEntidadesComponent } from './crear-entidades/crear-entidades.component';
import { ResponsablesRolEntity} from './ResponsablesRolEntity';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearEntidadesComponent,
    ListadoEntidadesComponent,
    EntidadesComponent,
  ],
  providers: [EntidadesComponentInstanceService, EntidadesService],
  exports: [
    CrearEntidadesComponent,
    ListadoEntidadesComponent,
    EntidadesComponent,
  
  ],
})
export class EntidadModule {}
