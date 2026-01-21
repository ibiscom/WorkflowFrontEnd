import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { ObjetowComponent } from './objetow.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Grupos.
 */
export class ObjetowComponentInstanceService extends BaseComponentInstanceService<ObjetowComponent> {}
