import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DatosCorporativosService } from '../datos-corporativos.service';
import { LoginService } from '../../login/login.service';
import { DatosCorporativosComponentInstanceService } from '../datos-corporativos-component-instance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginEntity } from '../../login/login.entity';
import { DatosCorporativosComponent } from '../datos-corporativos.component';
import { CorporateDataEntity } from '../../entities/corporate-data/corporate-data.entity';
import { FileUtil } from '../../utils/file.util';
import { MessageUtil } from '../../utils/message.util';

@Component({
  selector: 'app-datos-generales',
  imports: [
    FormsModule,
    MatButton,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.scss',
})
/**
 * Componente para la creación/edición de los datos corporativos generales.
 * Permite cargar imágenes (encabezado y fondo) y guardar la configuración.
 */
export class DatosGeneralesComponent {
  public loggedUser?: LoginEntity;
  public uc?: DatosCorporativosComponent;
  public identifierE: any;
  public headerImagePathE: any;
  public headerImageBase64?: string;
  public wallpaperPathE?: string;
  public wallpaperImageBase64?: string;
  public corporateDataIdEdit?: string;

  constructor(
    private datosCorporativosService: DatosCorporativosService,
    private loginService: LoginService,
    public datosCorporativosComponentInstanceService: DatosCorporativosComponentInstanceService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.datosCorporativosComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el componente. Si recibe un id por ruta, activa el modo edición y carga la información.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log('Edit Mode On. Corporate data ID:', id);
      this.corporateDataIdEdit = id;
      this.fillEditFields();
    }
  }

  /**
   * Llena los campos cuando el componente está en modo edición consultando por el identificador.
   */
  private fillEditFields() {
    if (this.corporateDataIdEdit) {
      this.datosCorporativosService
        .getCorporateDataById(this.corporateDataIdEdit)
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.identifierE = response.respuesta.identifier;
              this.headerImagePathE = response.respuesta.headerName;
              this.wallpaperPathE = response.respuesta.wallpaperName;
            }
          },
          error: (error) => {
            console.error('Error al obtener los datos generales:', error);
            this.uc!.mensaje = MessageUtil.buildErrorMessageFsResponse(
              'Error al obtener los datos generales.',
              error,
            );
          },
        });
    }
  }

  /**
   * Maneja el evento de selección de archivo para la imagen de encabezado.
   * Convierte el archivo a Base64 para su posterior envío.
   */
  public async onHeaderImagePathFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.headerImagePathE = file.name;
      this.headerImageBase64 = await FileUtil.convertToBase64File(file);
    }
  }

  /**
   * Maneja el evento de selección de archivo para la imagen de fondo.
   * Convierte el archivo a Base64 para su posterior envío.
   */
  public async onWallpaperPathFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.wallpaperPathE = file.name;
      this.wallpaperImageBase64 = await FileUtil.convertToBase64File(file);
    }
  }

  /**
   * Cancela la edición y regresa al listado de datos corporativos.
   */
  public cancel() {
    this.router.navigate(['main-page/datosCorporativos']);
  }

  /**
   * Guarda la configuración de datos corporativos en el servidor.
   */
  public save() {
    var corporateData: CorporateDataEntity = {
      identifier: this.identifierE,
      headerName: this.headerImagePathE,
      headerImage: this.headerImageBase64,
      wallpaperName: this.wallpaperPathE,
      wallpaperImage: this.wallpaperImageBase64,
    };

    this.datosCorporativosService.saveCorporateData(corporateData).subscribe({
      next: () => {
        this.uc!.mensaje = 'Datos generales guardados exitosamente.';
        this.router.navigate(['main-page/datosCorporativos']);
      },
      error: (error) => {
        console.error('Error al guardar los datos generales:', error);
      },
    });
  }
}
