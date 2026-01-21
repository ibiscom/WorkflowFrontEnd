import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { DatosCorporativosComponent } from './datos-corporativos.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que mantiene la instancia del componente padre de Datos Corporativos
 * para facilitar la comunicación con subcomponentes.
 */
export class DatosCorporativosComponentInstanceService extends BaseComponentInstanceService<DatosCorporativosComponent> {}
