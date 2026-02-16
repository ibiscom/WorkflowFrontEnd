/**
 * Entidad que representa un grupo en el sistema.
 */
export interface DependenciaEntity {
  /** Nombre del workflow */
  nombreWorkflow: string;
  /** Nombre de la dependencia */
  nombre: string;
  /** Nombre de la tarea cabeza */
  nombreTareaCabeza: string;
  /** Nombre de la tarea cola */
  nombreTareaCola: string;
  /** Estado de la dependencia */
  estado: string;
  /** Primitiva asociada a la dependencia */
  primitiva: string;
  /** Expresión asociada a la dependencia */
  expresion: string;
  /** Descripción de la dependencia */
  descripcion: string;

}
