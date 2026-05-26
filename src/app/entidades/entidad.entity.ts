/**
 * Entidad que representa un grupo en el sistema.
 */
export interface EntidadEntity {
  /** Nombre del usuario */
  userName: string;
   /** identificador de la entidad */
  idEntidad: 0;
   /** Nombre de la entidad */
  nombre: string;
   /** Descripcion de la entidad */
  descripcion: string;
  /** nombre del rol */
  nombreRol: string;
  /** lista de responsables */
  listaGrupos: [
    string
  ]
   
}
