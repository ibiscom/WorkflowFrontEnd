import { Component } from '@angular/core';
import { SincActiveDirectoryComponent } from '../sinc-active-directory.component';
import { InicioSincronizacionComponent } from '../inicio-sincronizacion/inicio-sincronizacion.component';

@Component({
  selector: 'app-ver-log-sincronizacion',
  imports: [InicioSincronizacionComponent],
  templateUrl: './ver-log-sincronizacion.component.html',
  styleUrl: './ver-log-sincronizacion.component.scss',
})
/**
 * Presenta el log generado por la sincronización con Active Directory.
 */
export class VerLogSincronizacionComponent {
  constructor(public parent: SincActiveDirectoryComponent) {}

  /**
   * Limpia el log al inicializar la vista.
   */
  ngOnInit(): void {
    this.parent.activeDirectoryLog = '';
  }
}
