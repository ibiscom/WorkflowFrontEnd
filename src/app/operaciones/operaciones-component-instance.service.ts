import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { OperacionesComponent } from './operaciones.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio auxiliar para acceder a la instancia de OperacionesComponent
 * desde otros servicios o utilidades.
 */
export class OperacionesComponentInstanceService extends BaseComponentInstanceService<OperacionesComponent> {}
