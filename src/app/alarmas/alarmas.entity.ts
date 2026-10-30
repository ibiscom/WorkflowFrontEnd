import { AtributoAlarmaEntity } from './atributo-alarma.entity';

/**
 * Workflow asociado a una alarma (respuesta del backend).
 */
export interface AlarmaWorkflowEntity {
  nombre: string;
  nombreLargo: string;
  fechaCreacion: string;
  descripcion: string;
  estado: string;
}

/**
 * Tarea asociada a una alarma (respuesta del backend).
 */
export interface AlarmaTareaEntity {
  nombreWorkflow: string;
  numero: number;
  nombre: string;
  nombreLargo: string;
  descripcion: string;
  tipo: string;
}

/**
 * Entidad que representa una alarma en el sistema.
 */
export interface AlarmaEntity {
  workflow: AlarmaWorkflowEntity;
  tarea: AlarmaTareaEntity;
  id: number;
  tipo: string;
  estadoTarea: string;
  diaAviso: number;
  horaAviso: number;
  minutosAviso: number;
  segundosAviso: number;
  diaLimite: number;
  horaLimite: number;
  minutosLimite: number;
  segundosLimite: number;
  tareaInmediata: boolean;
  estadoNoEjecucion: string;
  incluirResponsable: boolean;
  nombreAtributo: string;
  valorAtributo: string;
  atributos: AtributoAlarmaEntity[];
}
