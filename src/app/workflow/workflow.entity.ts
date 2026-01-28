/**
 * Entidad que representa una definición de un workflow en el sistema.
 */
export interface WorkflowEntity {
  /** Nombre del workflow */
  nombre: string;
  /** Nombre largo del workflow */
  nombreLargo: string;
  /** Breve descripción del workflow */
  descripcion: string;
  /** Estado del workflow */
  estado: string;
  /** Fecha de creación del workflow */
  fechaCreacion?: Date;
}

