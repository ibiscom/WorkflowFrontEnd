import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { ActividadRealizadaPorResponsableComponent } from './actividadrealizadaporresponsable.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class ActividadRealizadaPorResponsableComponentInstanceService extends BaseComponentInstanceService<ActividadRealizadaPorResponsableComponent> {}

