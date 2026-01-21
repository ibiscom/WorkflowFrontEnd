import { NgModule } from '@angular/core';
import { CompaniasComponent } from './companias.component';
import { CompaniasComponentInstanceService } from './companias-component-instance.service';
import { ListadoCompaniasComponent } from './listado-companias/listado-companias.component';
import { AccionesCompaniasComponent } from './acciones-companias/acciones-companias.component';
import { CrearCompaniaComponent } from './crear-compania/crear-compania.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CompaniasComponent,
    ListadoCompaniasComponent,
    AccionesCompaniasComponent,
    CrearCompaniaComponent,
  ],
  providers: [
    CompaniasComponentInstanceService,
    CompaniasComponentInstanceService,
  ],
  exports: [
    CompaniasComponent,
    ListadoCompaniasComponent,
    AccionesCompaniasComponent,
    CrearCompaniaComponent,
  ],
})
export class CompaniasModule {}
