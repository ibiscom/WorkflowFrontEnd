/**
 * Entidad que representa un grupo en el sistema.
 */
export interface ObjetowEntity {
  name: any;
  /** Nombre del grupo */
  nombre: string;
  /** Descripción del grupo */
  descripcion: string;
  /** Compañía asociada al grupo */
  compania: string;
  /** Supervisor del grupo */
  supervisor: string;
}
