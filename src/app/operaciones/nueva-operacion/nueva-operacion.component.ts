import { Component, Input } from '@angular/core';
import { OperacionesComponent } from '../operaciones.component';

import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { LoginService } from '../../login/login.service';
import { MatRadioModule } from '@angular/material/radio';
import { OperationEntity } from '../../entities/operations/operation.entity';

@Component({
  selector: 'fs-nueva-operacion',
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
    MatRadioModule,
  ],
  templateUrl: './nueva-operacion.component.html',
  styleUrl: './nueva-operacion.component.scss',
})
/**
 * Componente de formulario para crear una nueva operación.
 * Recoge los datos, los envía al componente padre para persistencia
 * y permite limpiar el formulario.
 */
export class NuevaOperacionComponent {
  @Input() public sc?: OperacionesComponent;
  protected userGeneratorF: string = '';
  protected ipF: string = '';
  public nameN: string = '';
  public descriptionN: string = '';
  public applicationN: string = '';
  public urlN: string = '';
  public visibleN: string = 'Yes';
  public typeN: string = 'GENERAL';

  public constructor(private loginService: LoginService) {}

  /**
   * Inicializa valores del generador (usuario e IP) desde el servicio de login.
   */
  ngOnInit() {
    this.userGeneratorF = this.loginService.getLoggedUser()?.user_name ?? '';
    this.ipF = this.loginService.getLoggedUser()?.user_ip ?? '';
  }

  /**
   * Construye la entidad de operación y delega el guardado al componente padre.
   */
  public save() {
    this.sc?.saveOperation({
      userName: this.loginService.getLoggedUser()?.user_name ?? '',
      ip: this.loginService.getLoggedUser()?.user_ip ?? '',
      name: this.nameN,
      description: this.descriptionN,
      aplication: this.applicationN,
      relativeUrl: this.urlN,
      isVisible: this.visibleN,
      type: this.typeN,
      generateLog: 'genera Logs',
    } as OperationEntity);
  }

  /**
   * Limpia el formulario restaurando valores por defecto.
   */
  public cancel() {
    this.nameN = '';
    this.descriptionN = '';
    this.applicationN = '';
    this.urlN = '';
    this.visibleN = 'Yes';
    this.typeN = 'GENERAL';
  }
}
