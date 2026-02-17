/**
 * Entidad que representa un tipo de documento asociado a una tarea en el sistema.
 */
export interface TipoDocumentoTareaEntity {
  code: string;
  name: string;
  visible?: boolean;
  obligatorio?: boolean;
  selected?:boolean;
}

