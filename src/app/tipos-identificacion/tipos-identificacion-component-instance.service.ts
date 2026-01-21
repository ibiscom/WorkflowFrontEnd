import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { TiposIdentificacionComponent } from './tipos-identificacion.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que expone la instancia del componente padre de Tipos de Identificación.
 * Facilita la comunicación con sus subcomponentes.
 */
export class TiposIdentificacionComponentInstanceService extends BaseComponentInstanceService<TiposIdentificacionComponent> {}
