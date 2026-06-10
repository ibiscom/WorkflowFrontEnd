import { DocumentModelEntity } from "./document-model.entity";

/**
 * Entidad que representa un evento de inicio en el sistema.
 */
export interface EventoInicioEntity {
    nombreWorkflow: string;
    usuario: string;
    nombreEvento: string;
    nombreLargo: string;
    modeloCarpeta: string;
    descripcion: string;
    herramienta: string;
    usuarioIniciaTarea: boolean;
    docModels?: DocumentModelEntity[];
}