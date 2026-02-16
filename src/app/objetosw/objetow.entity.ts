/**
 * Entidad que representa un grupo en el sistema.
 */
export interface ObjetowEntity {
  name: string;
 /** Nombre del workflow */
  nombreWorkflow: string;
  /** Nombre de la dependencia */
  nombre: string;
  /** Nombre de la tarea cabeza */
  valor: string;
  /** Descripción de la dependencia */
  descripcion: string;
  /** Identificador de negocio de la dependencia */
  identificadorNegocio: string;
  /** Primitiva asociada a la dependencia */
  labelId: string;
}

