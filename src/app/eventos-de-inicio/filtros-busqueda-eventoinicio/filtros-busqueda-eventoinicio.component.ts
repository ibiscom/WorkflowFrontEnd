import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
  import { EventoInicioComponent } from '../eventoinicio.component';
  import { EventoInicioService } from '../eventoinicio.service';
import { LoginEntity } from '../../login/login.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-tareas',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-eventoinicio.component.html',
  styleUrl: './filtros-busqueda-eventoinicio.component.scss',
})
export class FiltrosBusquedaEventoInicioComponent {
  public eventoInicioNameF: string = '';
  public modeloCarpetaF: string = '';
  public descripcionF: string = '';
  public editarDocProcesoF: boolean = false;
  public idSerieF: string = '';

  // 🔹 Estado seleccionado
  public modeloCarpetaObjectN: any = null;

  // 🔹 LISTA PARA EL SELECT (SOLUCIÓN AL ERROR)
    public modelosCarpetaList: any[] = [];

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: EventoInicioComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private eventoInicioService: EventoInicioService) {}

  ngOnInit(): void {
    this.loggedUser = this.uc?.loggedUser;

    // 🔹 Carga inicial (puedes cambiar la lógica luego)
    this.loadModelosCarpeta();
  }

  // 🔹 Simulación / carga de estados
  private loadModelosCarpeta(): void {
    // Si luego viene de servicio, aquí se reemplaza
    this.modelosCarpetaList = [
      { id: 1, largeName: 'Activo' },
      { id: 2, largeName: 'Inactivo' }
    ];
  }

  // Cambio del select
  public onModeloCarpetaChange(value: any): void {
    this.modeloCarpetaObjectN = value;
    console.log('Modelo Carpeta seleccionado:', this.modeloCarpetaObjectN);
  }

  // Ejecuta búsqueda
  public search(): void {
    const generateReportBool = this.generateReportF === 'true';

    this.searchEventoInicio(
      this.eventoInicioNameF,
      this.modeloCarpetaF,
      this.descripcionF,
      this.editarDocProcesoF,
      this.idSerieF,
      this.modeloCarpetaObjectN,
      generateReportBool
    );
  }

  public searchEventoInicio(
    eventoInicioName: string,
    modeloCarpeta: string,
    descripcion: string,
    editarDocProceso: boolean,
    idSerie: string,
    modeloCarpetaObjectN: any,
    generateReport: boolean
  ): void {
    console.log(
      'Filtros recibidos:',
      eventoInicioName,        
      modeloCarpeta,
      descripcion,
      editarDocProceso,
      idSerie,
      modeloCarpetaObjectN
    );

    // Tu lógica actual aquí
  }
}

