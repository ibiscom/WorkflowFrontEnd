import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'fs-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
/**
 * Componente raíz de la aplicación.
 * Renderiza el shell principal y el RouterOutlet para las rutas hijas.
 */
export class AppComponent {
  title = 'DOCMA - IBPM';
}
