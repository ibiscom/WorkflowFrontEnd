import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { ActividadPendientePorResponsableComponent } from './actividadpendienteporresponsable.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class ActividadPendientePorResponsableComponentInstanceService extends BaseComponentInstanceService<ActividadPendientePorResponsableComponent> {}

