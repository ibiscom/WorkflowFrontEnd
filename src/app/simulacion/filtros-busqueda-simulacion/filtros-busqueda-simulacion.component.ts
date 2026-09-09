import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SimulacionComponent } from '../simulacion.component';
import { SimulacionService } from '../simulacion.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-simulacion',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-simulacion.component.html',
  styleUrl: './filtros-busqueda-simulacion.component.scss',
})
export class FiltrosBusquedaSimulacionComponent {
  /** Proceso seleccionado (code del workflow) */
  public procesoSeleccionadoF: string = '';

  /** Lista de procesos */
  public procesosList: { code: string; name: string }[] = [];

  /** Evento de inicio seleccionado */
  public eventoInicioSeleccionadoF: string = '';

  /** Lista de eventos de inicio del proceso seleccionado */
  public eventosInicioList: { code: string; name: string }[] = [];

  @Input() public uc?: SimulacionComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private simulacionService: SimulacionService) {}

  ngOnInit(): void {
    this.loggedUser = this.uc?.loggedUser;
    this.loadProcesos();
  }

  /** Usuario en sesión (solo lectura en pantalla) */
  public get usuarioActual(): string {
    return (
      this.loggedUser?.user_name ??
      this.uc?.loggedUser?.user_name ??
      ''
    );
  }

  private loadProcesos(): void {
    this.simulacionService.getWorkflowsName(true).subscribe({
      next: (response) => {
        this.procesosList = response.respuesta ?? [];
      },
      error: () => {
        this.procesosList = [];
      },
    });
  }

  public onProcesoChange(value: string): void {
    this.procesoSeleccionadoF = value;
    this.eventoInicioSeleccionadoF = '';
    this.loadEventosInicio(value);
  }

  public onEventoInicioChange(value: string): void {
    this.eventoInicioSeleccionadoF = value;
  }

  private loadEventosInicio(workflowName: string): void {
    if (!workflowName) {
      this.eventosInicioList = [];
      return;
    }

    this.simulacionService.getStartEventsName(workflowName, true).subscribe({
      next: (response) => {
        this.eventosInicioList = (response.respuesta ?? []).map((item: any) => ({
          code: item.code ?? item.codigo ?? item.nombreEvento ?? '',
          name: item.name ?? item.nombre ?? item.nombreLargo ?? '',
        }));
      },
      error: () => {
        this.eventosInicioList = [];
      },
    });
  }

  /** Ejecuta la simulación con los tres parámetros */
  public simular(): void {
    const workflowName = this.procesoSeleccionadoF?.trim() ?? '';
    const eventInicio = this.eventoInicioSeleccionadoF?.trim() ?? '';
    const userName = this.usuarioActual;

    if (!this.uc) {
      return;
    }

    if (!workflowName) {
      this.uc.mensaje = 'Debe seleccionar un nombre de proceso.';
      return;
    }

    if (!eventInicio) {
      this.uc.mensaje = 'Debe seleccionar un evento de inicio.';
      return;
    }

    if (!userName) {
      this.uc.mensaje = 'No se pudo obtener el usuario en sesión.';
      return;
    }

    this.uc.simularProceso(workflowName, eventInicio, userName);
  }

  /** Alias por compatibilidad con plantillas en caché */
  public search(): void {
    this.simular();
  }
}
