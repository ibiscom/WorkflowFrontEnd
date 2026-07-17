import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FiltrosBusquedaResponsableComponent } from './filtros-busqueda-responsable/filtros-busqueda-responsable.component';
import { ListadoResponsableComponent } from './listado-responsable/listado-responsable.component';
import { ResponsableComponent } from './responsable.component';
import { ResponsableComponentInstanceService } from './responsable-component-instance.service';
import { ResponsableService } from './responsable.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FiltrosBusquedaResponsableComponent,
    ListadoResponsableComponent,
    ResponsableComponent,
  ],
  providers: [ResponsableComponentInstanceService, ResponsableService],
  exports: [
    FiltrosBusquedaResponsableComponent,
    ListadoResponsableComponent,
    ResponsableComponent,
  ],
})
export class ResponsableModule {}
