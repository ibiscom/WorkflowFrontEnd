import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { ListarTareaComponent } from './listar-tareas.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de ListarTareas.
 */
export class ListarTareaComponentInstanceService extends BaseComponentInstanceService<ListarTareaComponent> {}
