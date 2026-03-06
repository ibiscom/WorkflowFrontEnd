/**
 * Entidad que representa un grupo en el sistema.
 */
export interface RolesEntity {
  /** Nombre del grupo */
  nombre: string;
  /** Descripción del grupo */
  descripcion: string;
  /** usuario asociada al grupo */
  user: string;
  /** responsables del grupo */
  responsables: string [];
}
