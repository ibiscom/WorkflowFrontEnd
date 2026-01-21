import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReestablecerPasswordComponent } from '../reestablecer-password.component';

@Component({
  selector: 'fs-nuevo-password',
  imports: [
    FormsModule,
    MatButton,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatExpansionModule,
    MatSlideToggleModule,
  ],
  templateUrl: './nuevo-password.component.html',
  styleUrl: './nuevo-password.component.scss',
})
/**
 * Subcomponente para reestablecer contraseña. Permite asignar una contraseña única o manual.
 */
export class NuevoPasswordComponent {
  @Input() public uc?: ReestablecerPasswordComponent;
  public assignUniquePasswordN: boolean = false;
  public passwordN: string = '';

  constructor() {}

  onUniquePasswordChange(event: Event) {
  const input = event.target as HTMLInputElement;
  this.assignUniquePasswordN = input.checked;
}

  /**
   * Limpia el formulario y mensaje del componente padre.
   */
  public cancel() {
    this.assignUniquePasswordN = false;
    this.passwordN = '';
    this.uc!.mensaje = '';
  }

  /**
   * Invoca el proceso de reestablecimiento de contraseña en el componente padre.
   */
  public restore() {
    this.uc!.restorePassword(this.assignUniquePasswordN, this.passwordN);
  }
}

