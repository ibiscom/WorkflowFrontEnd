/**
 * Entidad que representa una alarma en el sistema.
 */
export interface AtributoAlarmaEntity {
  /** Id de la alarma */
  id: number;
  /** Nombre del atributo de la alarma */
  nombre: string;
  /** Valor del atributo de la alarma */
  valor: string;
  /** Tipo de tarea tiempo de la alarma */
  tipoTareaTiempo: string;
}        
