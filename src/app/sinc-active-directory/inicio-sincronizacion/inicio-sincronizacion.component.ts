import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SincActiveDirectoryComponent } from '../sinc-active-directory.component';

@Component({
  selector: 'fs-inicio-sincronizacion',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSlideToggleModule,
  ],
  templateUrl: './inicio-sincronizacion.component.html',
  styleUrls: ['./inicio-sincronizacion.component.scss'],
})
export class InicioSincronizacionComponent {
  @Input() public uc?: SincActiveDirectoryComponent;

  public importAllUsersS: boolean = false;
  public groupS: string = '';

  constructor() {}

  /** Cambia el estado del switch */
  public onImportAllUsersChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.importAllUsersS = input.checked;
  }

  /** Invoca la sincronización en el componente padre */
  public synchronize() {
    if (this.uc) {
      this.uc.synchronize(this.importAllUsersS, this.groupS);
    }
  }
}
