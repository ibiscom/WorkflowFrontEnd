import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MigworkflowComponent } from '../migworkflow.component';
import { MigworkflowService } from '../migworkflow.service';
import { LoginEntity } from '../../login/login.entity';
import { MigworkflowEntity } from '../migworkflow.entity';

@Component({
  selector: 'ibpm-filtros-busqueda-migworkflow',
  imports: [FormsModule],
  templateUrl: './filtros-busqueda-migworkflow.component.html',
  styleUrl: './filtros-busqueda-migworkflow.component.scss',
})
export class FiltrosBusquedaMigworkflowComponent {
search() {
throw new Error('Method not implemented.');
}

  public userLoguinB: string = '';
  public userRolNameB: string = '';

  // 🔹 Estado seleccionado
  public migworkflowObjectN?: MigworkflowEntity = undefined;

  // Manejo del switch
  public generateReportF: string = 'false';

  @Input() public uc?: MigworkflowComponent;
  public loggedUser: LoginEntity | undefined;

  constructor(private migworkflowService: MigworkflowService) {}

  ngOnInit(): void {
    this.loggedUser = this.uc?.loggedUser;

    // 🔹 Carga inicial (puedes cambiar la lógica luego)
    this.loadMigworkflow();
  }

  // 🔹 Simulación / carga de mig-workflows
  private loadMigworkflow(): void {
      this.uc?.obtenerMigworkflows();
  }



  // Cambio del select
  public onMigworkflowChange(value: any): void {
    this.migworkflowObjectN = value;
    console.log('Migworkflow seleccionado:', this.migworkflowObjectN);
  }

  // Ejecuta búsqueda

  public searchMigworkflow(
    userLoguin: string,
    userRolName: string,
  ): void {
    console.log(
      'Filtros recibidos:',
      userLoguin,
      userRolName,
      this.migworkflowObjectN
    );

    // Tu lógica actual aquí
  }

  public importProcess() {
    this.migworkflowService.importProcess(this.migworkflowObjectN!).subscribe({
      next: (response) => {
        console.log('Proceso importado con éxito:', response);
        this.uc!.mensaje = 'Proceso importado con éxito.';
        // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito al usuario.
      },
      error: (error) => {
        console.error('Error al importar el proceso:', error);
        this.uc!.mensaje = 'Error al importar el proceso.';
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario.
      },
    });
  }
}
