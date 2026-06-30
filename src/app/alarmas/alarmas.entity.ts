import { AtributoAlarmaEntity } from "./atributo-alarma.entity";

/**
 * Entidad que representa una alarma en el sistema.
 */
export interface AlarmaEntity {
  /** Nombre del workflow */
  workflow: string;
  /** Nombre de la alarma */
  nombre: string;
   /** Nombre largo de la alarma */
  nombrelargo: string;
  /** Fecha creación de la alarma */
  fechaCreacion: string;
  /** Descripción de la alarma */
  descripcion: string;
  /** Estado de la alarma */
  estado: string;
  /** Nombre workflow de la alarma */
  nombreWorkflow: string;
  /** Numero de la alarma */
  numero: string;
  /** Tipo de la alarma */
  tipo: string;
  /** Id de la alarma */
  id: 0;
  /** Estado tarea de la alarma */
  estadoTarea: string;
  /** Dia aviso de la alarma */
  diaAviso: 0;
    /** Hora aviso de la alarma */
  horaAviso: 0;
   /** Minuto aviso de la alarma */
  minutosAviso: 0;
    /** Segundo aviso de la alarma */
  segundosAviso: 0;
    /** Dia limite de la alarma */
  diaLimite: 0;
    /** Hora limite de la alarma */
  horaLimite: 0;
    /** Minuto limite de la alarma */
  minutosLimite: 0;
    /** Segundo limite de la alarma */
  segundosLimite: 0;
    /** Tarea inmediata a la alarma */
  tareaInmediata: true;
    /** EstadoNoEjecucion a la alarma */
  estadoNoEjecucion: string;
    /** Incluir Responsable a la alarma */
  incluirResponsable: true;
    /** Nombre Atributo a la alarma */
  nombreAtributo: string;
  /** valor de la alarma */
  valor: string;
  /** Tipo Tarea Tiempo de la alarma */
  tipoTareaTiempo: string;
  /** Atributos de la alarma */
  atributos: AtributoAlarmaEntity[];
}

