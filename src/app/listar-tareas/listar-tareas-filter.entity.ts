export interface ListarTareaFilterEntity {
/** id del workflow */
  idInstanciaWorkflow: string;
  /** Nombre del workflow */
  nombreWorkflow: string;
  /** Número */
  numero: string;
  /** Nombre  */
  nombre: string;
  /** Fecha de creación del listartarea */
  estado: Date;
  /** Id instancia workflow padre del listartarea */
  idInstanciaWorkflowPadre: string;
  /** Nombre workflowpadre */
  nombreWorkflowPadre: string;
  /** fecha asignación */
  fechaAsignacion: Date;
  /** nombre largo tarea */
  nombreLargoTarea: string;
  /** nombre largo proceso */
  nombreLargoProceso: string;
  /** nombre largo proceso padre */
  nombreLargoProcesoPadre: string;
  /** responsable*/
  responsable: string;
  /** valor negocio */
  valorNegocio: string;
  /** valor negocio 2 */
  valorNegocio2: string;
  /** valor negocio 3 */
  valorNegocio3: string;
  /** valor negocio 4 */
  valorNegocio4: string;
  /** días vencimiento */
  diasVencimiento: string;
  /** imagenes semaforo */
  imagenesSemaforo: string[];
    /** fecha desde */
  fechaDesde: string[];
    /** fecha hasta */
  fechaHasta: string[];
}


