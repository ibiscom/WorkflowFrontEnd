import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ibpm-crear-dependencia',
  templateUrl: './crear-dependencia.component.html',
  styleUrl: './crear-dependencia.component.scss',
})
export class CrearDependenciaComponent {

  // =====================
  // PASOS
  // =====================
  paso = 1;

  siguiente() {

    if (this.paso === 1) {
      if (!this.nameN || !this.descriptionN) {
        alert('Completa los campos');
        return;
      }
    }

    if (this.paso === 2) {
      if (!this.tareaCabeza || !this.tareaCola) {
        alert('Selecciona las tareas');
        return;
      }
    }

    if (this.paso === 3) {
      if (!this.estadoTareaCabeza) {
        alert('Selecciona el estado');
        return;
      }
    }

    if (this.paso === 4) {
      if (!this.primitivaDependencia) {
        alert('Selecciona la primitiva');
        return;
      }
    }

    this.paso++;
  }

  anterior() {
    this.paso--;
  }

  // =====================
  // CAMPOS PASO 1
  // =====================
  nameN: string = '';
  descriptionN: string = '';

  // =====================
  // CAMPOS PASO 2
  // =====================
  tareaCabeza: string = '';
  tareaCola: string = '';

  tareasList: string[] = [
    'Tarea 1',
    'Tarea 2',
    'Tarea 3'
  ];

  // =====================
  // PASO 3
  // =====================
  estadoTareaCabeza: string = '';

  estadosList: string[] = [
    'Activo',
    'Inactivo',
    'Pendiente'
  ];

  // =====================
  // PASO 4
  // =====================
  primitivaDependencia: string = '';

  primitivasList: string[] = [
    'Secuencial',
    'Paralela',
    'Condicional'
  ];

  // =====================
  // PASO 5
  // =====================
  expresion: string = '';

  agregarTexto(valor: string) {
    this.expresion += valor;
  }

  // =====================
  // ACCIONES
  // =====================
  save() {

    if (!this.expresion) {
      alert('Ingresa la expresión');
      return;
    }

    const data = {
      nombre: this.nameN,
      descripcion: this.descriptionN,
      tareaCabeza: this.tareaCabeza,
      tareaCola: this.tareaCola,
      estado: this.estadoTareaCabeza,
      primitiva: this.primitivaDependencia,
      expresion: this.expresion
    };

    console.log('Guardar:', data);

    alert('Guardado correctamente');
  }

  delete() {
    alert('Eliminar registro');
  }

  cancel() {
    alert('Cancelar');
  }

  editMode(): boolean {
    return false; // ajusta según tu lógica
  }

}