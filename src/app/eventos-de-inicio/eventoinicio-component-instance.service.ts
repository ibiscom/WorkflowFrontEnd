import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { EventoInicioComponent } from './eventoinicio.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class EventoInicioComponentInstanceService extends BaseComponentInstanceService<EventoInicioComponent> {}

