/**
 * Fila mostrada en la tabla (datos que envía el backend).
 */
export interface SimulacionEntity {
  instancia?: string | number;
  numTarea?: string | number;
  nombre?: string;
  fechaAsignacion?: string;
  fechaEjecucion?: string;
  fechaTerminacion?: string;
  estadoTarea?: string;
  responsable?: string;
  oportunidad?: string;
  accion?: string;
}

/** Respuesta de initSimulateWorkflow */
export interface InitSimulateRespuesta {
  exitoso?: boolean;
  mensaje?: string;
  instancia?: string;
}

/** Body de POST /workflowEngine/getSimulateWorkflow */
export interface GetSimulateWorkflowRequest {
  idInstancia?: string;
  nombreW?: string;
  nombreLargo?: string;
  fechaCreacion?: string;
  fechaTerminacion?: string;
  estadoW?: string;
  porcentaje?: string;
  observaciones?: string;
  codigosInstanciasHijasString?: string;
  codigoInstanciaPadreString?: string;
  esSimulacion?: string;
  fechaI?: string;
  fechaF?: string;
  usuario?: string;
  seleccionado?: boolean;
}

/** Ítem que retorna getSimulateWorkflow */
export interface GetSimulateWorkflowItem {
  idInstancia?: string;
  nombreW?: string;
  nombreLargo?: string;
  fechaCreacion?: string;
  fechaTerminacion?: string;
  estadoW?: string;
  porcentaje?: string;
  observaciones?: string;
  codigosInstanciasHijasString?: string;
  codigoInstanciaPadreString?: string;
  esSimulacion?: string;
  fechaI?: string;
  fechaF?: string;
  usuario?: string;
  seleccionado?: boolean;
  numTarea?: string | number;
  numero?: string | number;
  nombre?: string;
  nombreTarea?: string;
  fechaAsignacion?: string;
  fechaEjecucion?: string;
  estadoTarea?: string;
  responsable?: string;
  oportunidad?: string;
  accion?: string;
}

/**
 * Solo adapta nombres de campos del backend a las columnas de la tabla.
 * No inventa ni simula datos.
 */
export function mapSimulateWorkflowAFilas(
  data: GetSimulateWorkflowItem | GetSimulateWorkflowItem[] | null | undefined
): SimulacionEntity[] {
  if (!data) {
    return [];
  }

  const items = Array.isArray(data) ? data : [data];
  return items.map((item) => ({
    instancia: item.idInstancia,
    numTarea: item.numTarea ?? item.numero,
    nombre: item.nombre ?? item.nombreTarea ?? item.nombreLargo ?? item.nombreW,
    fechaAsignacion: item.fechaAsignacion ?? item.fechaCreacion ?? item.fechaI,
    fechaEjecucion: item.fechaEjecucion,
    fechaTerminacion: item.fechaTerminacion ?? item.fechaF,
    estadoTarea: item.estadoTarea ?? item.estadoW,
    responsable: item.responsable ?? item.usuario,
    oportunidad: item.oportunidad ?? item.porcentaje,
    accion: item.accion,
  }));
}
