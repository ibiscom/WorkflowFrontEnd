export interface EntidadesEntity {
    /**
     * Entidad que representa un grupo en el sistema.
     */
    
      /** Nombre del grupo */
      userName: string;
      idEntidad: number;
      nombre: string;
      /** Descripción del grupo */
      descripcion: string;
      /** usuario asociada al grupo */
      nombreRol: string;
      /** responsables del grupo */
      listaGrupos: string [];
    
}