/**
 * Entidad que representa una herramienta en el sistema.
 */
export interface PatronEntity {

  /** Nombre del workflow */
  nombreWorkflow: string;
  /** Nombre de la herramienta */
  nombre: string;
  /** Descripción de la herramienta */
  tipo: string;
  /** Compañía asociada a la herramienta */
  descripcion: string;
  /** Supervisor de la herramienta */
  cadenaRepresentacion: string;
 /** Atributos de la herramienta */
  attributes: string[];

}

