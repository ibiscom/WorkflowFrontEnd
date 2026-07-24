/**
 * Entidad que representa un atributo de una alarma.
 */
export interface AtributoAlarmaEntity {
  id: number;
  nombre: string;
  valor: string;
  tipoTareaTiempo: string;
  /** Uso en UI del formulario (no viene del backend). */
  tipo?: string;
}
