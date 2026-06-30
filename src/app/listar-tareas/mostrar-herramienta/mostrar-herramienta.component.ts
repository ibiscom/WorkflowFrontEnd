import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ibpm-mostrar-herramienta',
  standalone: true,
  imports: [MatTabsModule],
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
  throw new Error('Function not implemented.');
 } 
}


