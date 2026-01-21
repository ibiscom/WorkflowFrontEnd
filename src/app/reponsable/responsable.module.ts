import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaResponsableComponent } from './filtros-busqueda-responsable/filtros-busqueda-responsable.component';
import { ListadoResponsableComponent } from './listado-responsable/listado-responsable.component';
import { ResponsableComponent } from './responsable.component';
import { ResponsableComponentInstanceService } from './responsable-component-instance.service';
import { ResponsableService } from './responsable.service';
import { CrearResponsableComponent } from './crear-responsable/crear-responsable.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearResponsableComponent,
    FiltrosBusquedaResponsableComponent,
    ListadoResponsableComponent,
    ResponsableComponent,
  ],
  providers: [ResponsableComponentInstanceService, ResponsableService],
  exports: [
    CrearResponsableComponent,
    FiltrosBusquedaResponsableComponent,
    ListadoResponsableComponent,
    ResponsableComponent,
  ],
})
export class ResponsableModule {}
