import { DocumentModelEntity } from "./document-model.entity";

/**
 * Entidad que representa una tarea en el sistema.
 */
export interface TareaEntity {
    nombreWorkflow: string;
    usuario: string;
    numero: number;
    nombre: string;
    nombreLargo: string;
    estadoTarea: string;
    modeloCarpeta: string;
    descripcion: string;
    tipo: string;
    herramienta: string;
    rol: string;
    metodoAsignacion: string;
    subProceso: string;
    sincronico: string;
    responsable: string;
    diasDuracionEstimada: number;
    horasDuracionEstimada: number;
    minutosDuracionEstimada: number;
    segundosDuracionEstimada: number;
    diasAlarmaAmarilla: number;
    horasAlarmaAmarilla: number;
    minutosAlarmaAmarilla: number;
    segundosAlarmaAmarilla: number;
    editarDocProceso: boolean;
    docModels?: DocumentModelEntity[];
}

