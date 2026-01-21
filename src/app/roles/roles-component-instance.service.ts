import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { RolesComponent } from './roles.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Roles.
 */
export class RolesComponentInstanceService extends BaseComponentInstanceService<RolesComponent> {}
