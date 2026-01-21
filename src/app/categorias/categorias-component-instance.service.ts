import { Injectable } from '@angular/core';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';
import { CategoriasComponent } from './categorias.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio auxiliar para acceder a la instancia de CategoriasComponent
 * desde otros servicios o utilidades.
 */
export class CategoriasComponentInstanceService extends BaseComponentInstanceService<CategoriasComponent> {}
