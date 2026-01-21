import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { DependenciaComponent } from './dependencia.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Dependencias.
 */
export class DependenciaComponentInstanceService extends BaseComponentInstanceService<DependenciaComponent> {}
