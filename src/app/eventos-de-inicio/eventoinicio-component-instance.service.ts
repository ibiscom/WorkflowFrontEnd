import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { EventoinicioComponent } from './eventoinicio.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Evento de inicio.
 */
export class EventoinicioComponentInstanceService extends BaseComponentInstanceService<EventoinicioComponent> {}
