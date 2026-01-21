import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatosGeneralesComponent } from './datos-generales/datos-generales.component';
import { DatosCorporativosComponent } from './datos-corporativos.component';
import { ListadoDatosCorporativosComponent } from './listado-datos-corporativos/listado-datos-corporativos.component';
import { DatosCorporativosService } from './datos-corporativos.service';
import { DatosCorporativosComponentInstanceService } from './datos-corporativos-component-instance.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DatosCorporativosComponent,
    DatosGeneralesComponent,
    ListadoDatosCorporativosComponent,
  ],
  providers: [
    DatosCorporativosService,
    DatosCorporativosComponentInstanceService,
  ],
  exports: [
    DatosCorporativosComponent,
    DatosGeneralesComponent,
    ListadoDatosCorporativosComponent,
  ],
})
export class DatosCorporativosModule {}
