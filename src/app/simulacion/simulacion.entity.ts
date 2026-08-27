/**
 * Entidad que representa una tarea en el sistema.
 */
export interface SimulacionEntity {
accion: any;
fechaAsignacion: any;
fechaEjecucion: any;
fechaTerminacion: any;
oportunidad: any;
numTarea: any;
seleccionado: any;
terminar: any;
instancia: any;
proceso: any;
fechaInicio: any;
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
    docModels?: SimulacionEntity[];
}

