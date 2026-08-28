import { AtributoAlarmaEntity } from './atributo-alarma.entity';

/**
 * Estado de una tarea asociada a una alarma (respuesta del backend).
 */
export interface EstadoTareaAlarmaEntity {
  code: string;
  name: string;
}