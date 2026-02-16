/**
 * Entidad que representa un atributo de objeto workflow en el sistema.
 */
export interface AtributoObjetowEntity {
  /** Nombre del workflow */
  nombreWorkflow: string;
  /** Nombre del objeto workflow */
  nombre: string;
  /** valor del objeto workflow */
  valor: string;
  /** Descripción del objeto workflow */
  descripcion: string;
  /** Identificador de negocio del objeto workflow */
  identificadorNegocio: string;
  /** Identificador de etiqueta del objeto workflow */
  labelId: string;
}

