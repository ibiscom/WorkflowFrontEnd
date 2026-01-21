import { Injectable } from '@angular/core';
import { SesionesComponent } from './sesiones.component';
import { BaseComponentInstanceService } from '../utils/base-component-instance.service';

@Injectable({
  providedIn: 'root',
})
export class SesionesComponentInstanceService extends BaseComponentInstanceService<SesionesComponent> {}
