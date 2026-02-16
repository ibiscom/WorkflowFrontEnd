import { AtributoObjetowEntity } from "./atributo-objetow.entity";

/**
 * Entidad que representa un objeto workflow en el sistema.
 */
export interface ObjetowEntity {
  /** Nombre del workflow */
  nombreWorkflow: string;
  /** Nombre del objeto workflow */
  nombre:string;
  /** descripción del objeto workflow */
  descripcion: string;
  /** atributos del objeto workflow */
  attributes: AtributoObjetowEntity[];
}
