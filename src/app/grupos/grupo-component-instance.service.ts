import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { GrupoComponent } from './grupo.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class GrupoComponentInstanceService extends BaseComponentInstanceService<GrupoComponent> {}

