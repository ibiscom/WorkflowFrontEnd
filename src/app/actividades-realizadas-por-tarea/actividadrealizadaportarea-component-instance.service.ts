import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { ActividadRealizadaPorTareaComponent } from './actividadrealizadaportarea.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class ActividadRealizadaPorTareaComponentInstanceService extends BaseComponentInstanceService<ActividadRealizadaPorTareaComponent> {}

