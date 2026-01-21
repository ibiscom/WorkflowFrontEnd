import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { PerfilesComponent } from './perfiles.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio auxiliar para exponer la instancia de PerfilesComponent
 * y permitir su uso desde otros servicios (por ejemplo, mensajes/estado).
 */
export class PerfilesComponentInstanceService extends BaseComponentInstanceService<PerfilesComponent> {}
