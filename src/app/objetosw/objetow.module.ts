import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListadoAtributosObjetowComponent } from './listado-atributos-objetow/listado-atributos-objetow.component';
import { ObjetowComponent } from './objetow.component';
import { ObjetowComponentInstanceService } from './objetow-component-instance.service';
import { ObjetowService } from './objetow.service';
import { CrearObjetowComponent } from './crear-objetow/crear-objetow.component';
import { CrearAtributoObjetowComponent } from './crear-atributo-objetow/crear-atributo-objetow.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrearAtributoObjetowComponent,
    CrearObjetowComponent,
    ListadoAtributosObjetowComponent,
    ObjetowComponent,
  ],
  providers: [ObjetowComponentInstanceService, ObjetowService],
  exports: [
    CrearAtributoObjetowComponent,
    CrearObjetowComponent,
    ListadoAtributosObjetowComponent,
    ObjetowComponent,
  ],
})
export class ObjetowModule {}

