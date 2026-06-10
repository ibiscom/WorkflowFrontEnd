/**
 * Entidad que representa un tipo de documento asociado a un evento de inicio en el sistema.
 */
export interface TipoDocumentoEventoInicioEntity {
    code: string;
    name: string;
    visible?: boolean;
    obligatorio?: boolean;
    selected?:boolean;
  }