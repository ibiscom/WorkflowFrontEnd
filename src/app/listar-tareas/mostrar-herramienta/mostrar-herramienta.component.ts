import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { VisualizadorHerramientaComponent } from '../visualizador-herramienta/visualizador-herramienta.component';

@Component({
  selector: 'ibpm-mostrar-herramienta',
  standalone: true,
  imports: [MatTabsModule, VisualizadorHerramientaComponent],
  templateUrl: './mostrar-herramienta.component.html',
  styleUrl: './mostrar-herramienta.component.scss',
})
export class MostrarHerramientaComponent {
  public identificadorTarea: string = '';
  public identificadorWorkflow: string = '';

  // =====================================
  // INFORMACIÓN DE LA TAREA
  // =====================================

  tarea = {
    identificadorProceso: '',
    nombreProceso: '',
    identificadorTarea: '',
    numeroTarea: '',
    nombreTarea: '',
    instanciaProceso: '',
    estadoObjeto: ''
  };

  // =====================================
  // INFORMACIÓN DEL PROCESO
  // =====================================

  proceso = {
    tipoRadicado: '',
    idProyeccion: '',
    operacion: '',
    asunto: '',
    instancia: '',
    compania: '',
    documentoRadicar: ''
  };

  // =====================================
  // DOCUMENTOS TAREA
  // =====================================

  documentosTarea = [
    {
      cargado: 'NO',
      obligatorio: 'NO',
      tipoDocumento: 'Documento ajustado'
    }
  ];

  // =====================================
  // DOCUMENTOS PROCESO
  // =====================================

  documentosProceso = [
    {
      cargado: 'SI',
      obligatorio: 'SI',
      tipoDocumento: 'Documento ajustado',
      instancia: '1',
      proceso: 'Aprobar y firmar documentos',
      tarea: 'Revisión',
      instanciaTarea: '1',
      fecha: '2026-06-25',
      version: '1'
    }
  ];

  // =====================================
  // INFORMACIÓN DE LA HERRAMIENTA
  // =====================================
  public infoHerramienta: any = {};
  public infoHerramientaCargada: boolean = false;
    

  // =====================================
  // ACCIONES
  // =====================================
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const idWfEngine = this.route.snapshot.paramMap.get('idWorkflowEngine');
    const idTareaEngine = this.route.snapshot.paramMap.get('idTareaEngine');
    console.log('Identificador de workflow recibido:', idWfEngine);
    console.log('Identificador de tarea recibido:', idTareaEngine);
    this.identificadorTarea = idTareaEngine ?? '';
    this.identificadorWorkflow = idWfEngine ?? '';
    this.consultarTarea();
  }

  anexarDocumento(doc: any): void {
    console.log('Anexar documento', doc);
  }

  verDocumento(doc: any): void {
    console.log('Ver documento', doc);
  }

 public consultarTarea() {
   //TODO: Implementar la lógica para consultar la información de la tarea y del proceso usando los identificadores recibidos.
   
   this.invocarHerramienta();
  }

  public invocarHerramienta() {
    //TODO : Implementar llamado de los servicios que traen la informacion de la herramienta para que se arme este objeto.
    //TODO: invocar metodo /rs/v1/taskList/loadTask para traer los datos que armman este JSON. completar este componente para que traiga del listar tareas el nombre del workflow para invcarlo.
    //para prueba integracion, usar el proceso de Proyectar Documento inicialmente
    this.infoHerramienta = {
      idFormulario: "24772",
      tipoFormulario: "Captura",
      numHerramienta: 15234,
      cadenaRepresentacion: "/HTM/InvocarFormulario.iface",
      objetosWorkflow: {
        tipoRadicado: "Interno",
        Clasificado: "",
        idProyeccion: "260538",
        municipio: "",
        "¿Requiere ajustes?": "NO",
        "¿Requiere trasladar?": "",
        instancia: "2254098",
        "¿Documento a radicar?": "NO",
        Firmado: "",
        compania: "6",
        departamento: ""
      }
    };
    this.infoHerramientaCargada = true;
  }

 }


