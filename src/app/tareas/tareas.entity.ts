/**
 * Entidad que representa un grupo en el sistema.
 */
export interface TareasEntity {
  numero: any;
  /** Nombre del grupo */
  nombre: string;
  /** Descripción del grupo */
  nombreLargo: string;
  /** Compañía asociada al grupo */
  descripcion: string;
  /** Supervisor del grupo */
  tipo: string;
}

