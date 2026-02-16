/**
 * Entidad que representa un modelo de documento en el sistema.
 */
export interface DocumentModelEntity {
    idSerie: string;
    nombreSerie: string;
    tipoDocumento: string;
    obligatoryTypeDocInTask: boolean;
    editableTypeDocInTask: boolean;
}

