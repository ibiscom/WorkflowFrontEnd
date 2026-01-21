import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { TareasComponent } from './tareas.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class TareasComponentInstanceService extends BaseComponentInstanceService<TareasComponent> {}
