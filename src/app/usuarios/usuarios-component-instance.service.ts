import { Injectable } from '@angular/core';
import { UsuariosComponent } from './usuarios.component';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio auxiliar para acceder a la instancia del componente UsuariosComponent
 * desde otros servicios/clases (por ejemplo, para mostrar mensajes).
 */
export class UsuariosComponentInstanceService extends BaseComponentInstanceService<UsuariosComponent> {}
