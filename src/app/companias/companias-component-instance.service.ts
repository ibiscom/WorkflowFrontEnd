import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { CompaniasComponent } from './companias.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio auxiliar para exponer la instancia de CompaniasComponent
 * y permitir su utilización desde otros servicios (mensajes/estado).
 */
export class CompaniasComponentInstanceService extends BaseComponentInstanceService<CompaniasComponent> {}
