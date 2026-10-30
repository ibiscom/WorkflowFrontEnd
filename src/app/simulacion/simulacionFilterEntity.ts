/**
 * Filtros / parámetros para consultar tareas de una simulación.
 */
export interface SimulacionFilterEntity {
  nombreWorkflow?: string;
  instancia?: string;
  usuario?: string;
  nombre?: string;
  estado?: string;
}
