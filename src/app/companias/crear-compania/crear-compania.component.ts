import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CompanyEntity } from '../../entities/companies/company.entity';
import { CompaniasService } from '../companias.service';
import { CompaniasComponentInstanceService } from '../companias-component-instance.service';
import { CompaniasComponent } from '../companias.component';
import { MessageUtil } from '../../utils/message.util';
import { Constants } from '../../utils/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { LoginEntity } from '../../login/login.entity';
import { CountryEntity } from '../../entities/domains/geography/country.entity';
import { firstValueFrom } from 'rxjs';
import { StateEntity } from '../../entities/domains/geography/state.entity';
import { CityEntity } from '../../entities/domains/geography/city.entity';
import { LabelSizeEntity } from '../../entities/domains/label/label-size.entity';
import { GeografiaService } from '../../comunes/geografia.service';
import { FileUtil } from '../../utils/file.util';

@Component({
  selector: 'fs-crear-compania',
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
  templateUrl: './crear-compania.component.html',
  styleUrl: './crear-compania.component.scss',
})
/**
 * Formulario para crear o editar compañías y gestionar permisos/restricciones.
 */
export class CrearCompaniaComponent {
  public loggedUser: LoginEntity | undefined;
  public uc?: CompaniasComponent;
  public nameN: string = '';
  public siglaN: string = '';
  public nitN: string = '';
  public businessNameN: string = '';
  public representativeN: string = '';
  public contactN: string = '';
  public emailN: string = '';
  public stateN: string = '';
  public codeCountryN: string = '';
  public countryN: string = '';
  public cityN: string = '';
  public phoneN: string = '';
  public smtpAddressN: string = '';
  public smtpConnectionPortN: string = '';
  public smtpUseTLSN: string = '';
  public smtpUserN: string = '';
  public smtpPasswordN: string = '';
  public senderNameN: string = '';
  public labelSizeN: string = '';
  public dbConnectionUrlN: string = '';
  public dbUserN: string = '';
  public dbPasswordN: string = '';
  public addressN: string = '';
  public largeNameN: string = '';
  public countriesList: CountryEntity[] = [] as CountryEntity[];
  public statesList: StateEntity[] = [] as StateEntity[];
  public citiesList: CityEntity[] = [] as CityEntity[];
  public restrictedOperationsList: string[] = [] as string[];
  public operationsList: string[] = [] as string[];
  public labelSizesList: LabelSizeEntity[] = [] as LabelSizeEntity[];

  public countryObjectN?: CountryEntity;
  public stateObjectN?: StateEntity;
  public cityObjectN?: CityEntity;
  public labelSizeObjectN?: LabelSizeEntity;

  public companyIdEdit?: string;
  public headerBase64E: string | undefined;
  public pageFooterBase64E?: string;
  public companyIconBase64E?: string;
  public mainImageBase64E?: string;
  public identifierE: string | undefined;
  public headerNamePathE: string = '';
  public pageFooterPathE: string = '';
  public companyIconPathE: string = '';
  public mainImagePathE: string = '';
  public operationE: any;

  constructor(
    private companiasService: CompaniasService,
    private loginService: LoginService,
    public companiasComponentInstanceService: CompaniasComponentInstanceService,
    public router: Router,
    public route: ActivatedRoute,
    private geografiaService: GeografiaService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.companiasComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el formulario y carga catálogos/operaciones (modo edición si aplica).
   */
  public async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log('Edit Mode On. Company ID:', id);
      this.companyIdEdit = id;
      this.fillEditFields();
      this.getPermissions();
      this.getRestrictedOperations();
    } else {
      console.log('Create Mode On.');
      this.companyIdEdit = undefined;
    }
    await this.getCountriesList();
    await this.getStatesList();
    await this.getCitiesList();
    this.getLabelSizesList();
  }

  private getPermissions() {
    this.companiasService
      .getPermissions(
        this.loggedUser?.user_name ?? '',
        this.companyIdEdit ?? '',
      )
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.operationsList = response.respuesta;
            if (this.uc) {
              this.uc.mensaje = '';
            }
          }
        },
        error: (e: any) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_COMPANIA_PERMISOS,
              e,
            );
          }
        },
      });
  }

  private getRestrictedOperations() {
    this.companiasService
      .getRestrictedOperations(
        this.loggedUser?.user_name ?? '',
        this.companyIdEdit ?? '',
      )
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.restrictedOperationsList = response.respuesta;
            if (this.uc) {
              this.uc.mensaje = '';
            }
          }
        },
        error: (e: any) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_COMPANIA_OPERACIONES,
              e,
            );
          }
        },
      });
  }

  private async getCountriesList(): Promise<void> {
    try {
      this.countriesList = [];
      const response = await firstValueFrom(
        this.geografiaService.getCountriesList(),
      );
      if (response?.respuesta) {
        this.countriesList = response.respuesta;
        if (this.codeCountryN && this.countryN) {
          this.countryObjectN = this.countriesList.find(
            (country) =>
              country.code === this.codeCountryN &&
              country.name === this.countryN,
          );
        } else {
          this.countryObjectN = undefined;
        }
      }
      if (this.uc) {
        this.uc.mensaje = '';
      }
    } catch (e: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_COMPANIA_PAISES,
          e,
        );
      }
    }
  }
  private async getStatesList(): Promise<void> {
    try {
      this.statesList = [];
      if (this.countryObjectN) {
        const response = await firstValueFrom(
          this.geografiaService.getStatesOfCountryList(
            this.countryObjectN?.ide ?? '',
          ),
        );
        if (response?.respuesta) {
          this.statesList = response.respuesta as StateEntity[];
          if (this.stateN) {
            this.stateObjectN = this.statesList.find(
              (state) => state.name === this.stateN,
            );
          } else {
            this.stateObjectN = undefined;
          }
        }
      }
    } catch (e: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_COMPANIA_DEPARTAMENTOS,
          e,
        );
      }
    }
  }
  private async getCitiesList(): Promise<void> {
    try {
      this.citiesList = [];
      if (this.stateObjectN) {
        const response = await firstValueFrom(
          this.geografiaService.getCitiesOfStateList(
            this.stateObjectN?.code ?? '',
          ),
        );
        if (response?.respuesta) {
          this.citiesList = response.respuesta;
          if (this.cityN) {
            this.cityObjectN = this.citiesList.find(
              (city) => city.name === this.cityN,
            );
          } else {
            this.cityObjectN = undefined;
          }
        }
      }
    } catch (e: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_COMPANIA_CIUDADES,
          e,
        );
      }
    }
  }

  private getLabelSizesList() {
    try {
      this.labelSizesList = [];
      this.companiasService.getLabelSizesList().subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.labelSizesList = response.respuesta;

            if (this.labelSizeN && this.labelSizeN !== '') {
              this.labelSizeObjectN = this.labelSizesList.find(
                (labelSize) => labelSize.name === this.labelSizeN,
              );
            } else {
              this.labelSizeObjectN = undefined;
            }
          }
        },
        error: (e: any) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_COMPANIA_TAMANOS_ROTULO,
              e,
            );
          }
        },
      });
    } catch (error: any) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessage(
          'Error al obtener los tamaños de rótulo',
          error,
        );
      }
    }
  }

  private async fillEditFields(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.companiasService.getCompany(
          this.loggedUser?.user_name ?? '',
          this.companyIdEdit ?? '',
        ),
      );

      if (response?.respuesta) {
        const company = response.respuesta as CompanyEntity;

        this.identifierE = company.name ?? '';
        this.largeNameN = company.largeName ?? '';
        this.siglaN = company.sigla ?? '';
        this.nitN = company.nit ?? '';
        this.businessNameN = company.business ?? '';
        this.representativeN = company.representative ?? '';
        this.contactN = company.contact ?? '';
        this.emailN = company.email ?? '';
        this.codeCountryN = company.codeCountry ?? '';
        this.countryN = company.country ?? '';
        this.stateN = company.departament ?? '';
        this.cityN = company.city ?? '';
        this.phoneN = company.phone ?? '';
        this.smtpAddressN = company.dirServidorSMTP ?? '';
        this.smtpConnectionPortN = company.puerto ?? '';
        this.smtpUseTLSN = company.usaTLS ?? '';
        this.smtpUserN = company.cuentaServidorSMTP ?? '';
        this.smtpPasswordN = company.clave ?? '';
        this.senderNameN = company.nombreRemitente ?? '';
        this.labelSizeN = company.tamRotulo ?? '';
        this.dbConnectionUrlN = company.rutaBD ?? '';
        this.dbUserN = company.userBD ?? '';
        this.dbPasswordN = company.claveBD ?? '';
        this.countryN = company.country ?? '';
        this.codeCountryN = company.codeCountry ?? '';
        this.addressN = company.address ?? '';
      }
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_COMPANIA_DATOS,
          e,
        );
      }
    }
  }

  /**
   * Maneja el cambio de país y recarga los departamentos.
   */
  public async onCountryChangeEvent(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const selectedCountry = this.countryObjectN;

  if (selectedCountry) {
    this.countryN = selectedCountry.name ?? '';
    this.codeCountryN = selectedCountry.code ?? '';
    this.countryObjectN = selectedCountry;
    await this.getStatesList();
  }
}

  /**
   * Maneja el cambio de departamento y recarga las ciudades.
   */
 public async onStateChangeEvent(event: Event) {

  if (this.stateObjectN && this.stateObjectN.name) {
    this.stateN = this.stateObjectN.name;
  } else {
    this.stateN = '';
  }

  await this.getCitiesList();
}
  /**
   * Maneja el cambio de ciudad.
   */
  public async onCityChangeEvent(event: Event) {

  // this.cityObjectN ya está actualizado gracias al [(ngModel)]
  if (this.cityObjectN && this.cityObjectN.name) {
    this.cityN = this.cityObjectN.name;
  } else {
    this.cityN = '';
  }

}

  /**
   * Carga la imagen principal como base64.
   */
  public async onMainImagePathFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.mainImagePathE = file.name;
      this.mainImageBase64E = await FileUtil.convertToBase64File(file);
      //inputElement.value = ''; // Restablece el input
    }
  }

  /**
   * Carga el ícono de compañía como base64.
   */
  public async onCompanyIconPathFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.companyIconPathE = file.name;
      this.companyIconBase64E = await FileUtil.convertToBase64File(file);
      //inputElement.value = ''; // Restablece el input
    }
  }

  /**
   * Carga el encabezado del reporte como base64.
   */
  public async onHeaderNamePathFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.headerNamePathE = file.name;
      this.headerBase64E = await FileUtil.convertToBase64File(file);
      //inputElement.value = ''; // Restablece el input
    }
  }

  /**
   * Carga el pie de página del reporte como base64.
   */
  public async onPageFooterPathFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.pageFooterPathE = file.name;
      this.pageFooterBase64E = await FileUtil.convertToBase64File(file);
      //inputElement.value = ''; // Restablece el input
    }
  }

  /**
   * Selecciona el tamaño de rótulo.
   */
  public onLabelSizeChangeEvent(event: Event) {

  // Como usas [(ngModel)], el objeto ya está actualizado
  if (this.labelSizeObjectN) {
    this.labelSizeN = this.labelSizeObjectN.name ?? '';
  } else {
    this.labelSizeN = '';
  }

}

  /**
   * Indica si el formulario está en modo edición.
   */
  public editMode(): boolean {
    return this.companyIdEdit !== undefined && this.companyIdEdit !== '';
  }

  /**
   * Asocia un permiso a la compañía.
   */
  public addPermissionToCompany(event: Event) {
  try {

    if (!this.operationE) {
      return; // No hace nada si no hay operación seleccionada
    }

    const selectedOperation = this.operationE;

    this.companiasService
      .addPermissionToCompany(
        this.loggedUser?.user_name ?? '',
        this.companyIdEdit ?? '',
        selectedOperation
      )
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.ngOnInit();

            // Limpia el select después de agregar
            this.operationE = '';
          }
        },
        error: (e: any) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_COMPANIA_ASOCIAR_PERMISO,
              e,
            );
          }
        },
      });

  } catch (e) {
    if (this.uc) {
      this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
        Constants.ERR_COMPANIA_ASOCIAR_PERMISO,
        e,
      );
    }
  }
}

  /**
   * Agrega una restricción de operación a la compañía.
   */
  public restrict(operation?: string | undefined) {
    try {
      this.companiasService
        .addRestrictionToCompany(
          this.loggedUser?.user_name ?? '',
          this.companyIdEdit ?? '',
          operation ?? '',
        )
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.ngOnInit();
            }
          },
          error: (e: any) => {
            if (this.uc) {
              this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
                Constants.ERR_COMPANIA_RESTRINGIR_OPERACION,
                e,
              );
            }
          },
        });
    } catch (e) {
      if (this.uc) {
        this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
          Constants.ERR_COMPANIA_ASOCIAR_PERMISO,
          e,
        );
      }
    }
  }

  /**
   * Guarda la compañía: crea o edita según el modo actual.
   */
  public save() {
    if (!this.editMode()) {
      this.create();
    } else {
      this.edit();
    }
  }
  private edit() {
    let baseCompany: CompanyEntity = {
      name: this.identifierE,
      largeName: this.largeNameN,
      sigla: this.siglaN,
      nit: this.nitN,
      business: this.businessNameN,
      representative: this.representativeN,
      contact: this.contactN,
      email: this.emailN,
      departament: this.stateN,
      city: this.cityN,
      phone: this.phoneN,
      dirServidorSMTP: this.smtpAddressN,
      puerto: this.smtpConnectionPortN,
      usaTLS: this.smtpUseTLSN,
      cuentaServidorSMTP: this.smtpUserN,
      clave: this.smtpPasswordN,
      nombreRemitente: this.senderNameN,
      tamRotulo: this.labelSizeN,
      rutaBD: this.dbConnectionUrlN,
      userBD: this.dbUserN,
      claveBD: this.dbPasswordN,
      country: this.countryN,
      codeCountry: this.codeCountryN,
      address: this.addressN,
      userName: this.loggedUser?.user_name,
    } as CompanyEntity;

    if (this.headerNamePathE && this.headerNamePathE !== '') {
      baseCompany.headerName = FileUtil.getLastPathPart(
        this.headerNamePathE ?? '',
      );
      baseCompany.headerImage = this.headerBase64E;
    }
    if (this.pageFooterPathE && this.pageFooterPathE !== '') {
      baseCompany.footerName = FileUtil.getLastPathPart(
        this.pageFooterPathE ?? '',
      );
      baseCompany.footerImage = this.pageFooterBase64E;
    }
    if (this.companyIconPathE && this.companyIconPathE !== '') {
      baseCompany.iconName = FileUtil.getLastPathPart(
        this.companyIconPathE ?? '',
      );
      baseCompany.iconImage = this.companyIconBase64E;
    }
    if (this.mainImagePathE && this.mainImagePathE !== '') {
      baseCompany.principalName = FileUtil.getLastPathPart(
        this.mainImagePathE ?? '',
      );
      baseCompany.principalImage = this.mainImageBase64E;
    }

    this.companiasService.editCompany(baseCompany).subscribe({
      next: async (response) => {
        if (response && response.respuesta) {
          if (this.uc) {
            this.uc.mensaje = 'Compañía editada correctamente.';
            this.companyIdEdit = this.nameN;
            await this.ngOnInit();
          }
          this.router.navigate([
            `/main-page/administrarCompanias/crearCompania/${this.companyIdEdit}`,
          ]);
        } else {
          if (this.uc) {
            this.uc.mensaje = 'No se pudo editar la compañía.';
          }
        }
      },
      error: (e) => {
        if (this.uc) {
          this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_COMPANIA_EDITAR,
            e,
          );
        }
      },
    });
  }
  private create() {
    let baseCompany: CompanyEntity = {
      largeName: this.largeNameN,
      sigla: this.siglaN,
      nit: this.nitN,
      business: this.businessNameN,
      representative: this.representativeN,
      contact: this.contactN,
      email: this.emailN,
      country: this.countryN,
      codeCountry: this.codeCountryN,
      departament: this.stateN,
      city: this.cityN,
      phone: this.phoneN,
      address: this.addressN,
      dirServidorSMTP: this.smtpAddressN,
      puerto: this.smtpConnectionPortN,
      usaTLS: this.smtpUseTLSN,
      cuentaServidorSMTP: this.smtpUserN,
      clave: this.smtpPasswordN,
      nombreRemitente: this.senderNameN,
      tamRotulo: this.labelSizeN,
      rutaBD: this.dbConnectionUrlN,
      userBD: this.dbUserN,
      claveBD: this.dbPasswordN,
      userName: this.loggedUser?.user_name,
    };

    this.companiasService.createCompany(baseCompany).subscribe({
      next: async (response) => {
        if (response && response.respuesta) {
          if (this.uc) {
            this.uc.mensaje = 'Compañía creada correctamente.';
            this.companyIdEdit = this.nameN;
            await this.ngOnInit();
          }
          this.router.navigate([
            `/main-page/administrarCompanias/crearCompania/${this.companyIdEdit}`,
          ]);
        } else {
          if (this.uc) {
            this.uc.mensaje = 'No se pudo crear la compañía.';
          }
        }
      },
      error: (e) => {
        if (this.uc) {
          this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_COMPANIA_CREAR,
            e,
          );
        }
      },
    });
  }

  /**
   * Elimina definitivamente la compañía actual.
   */
  public delete() {
    this.companiasService
      .deleteCompany(this.loggedUser?.user_name ?? '', this.companyIdEdit ?? '')
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            if (this.uc) {
              this.uc.mensaje = 'Compañía eliminada correctamente.';
            }
            this.router.navigate(['/main-page/administrarCompanias']);
          } else {
            if (this.uc) {
              this.uc.mensaje = 'No se pudo eliminar la compañía.';
            }
          }
        },
        error: (e) => {
          if (this.uc) {
            this.uc.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_COMPANIA_ELIMINAR,
              e,
            );
          }
        },
      });
  }

  /**
   * Cancela y navega al listado de compañías.
   */
  public cancel() {
    this.router.navigate([`/main-page/administrarCompanias`]);
  }

  /**
   * Compara países para selección por referencia.
   */
  public compareCountries(a: CountryEntity, b: CountryEntity): boolean {
    return a && b ? a.ide === b.ide && a.name === b.name : a === b;
  }

  /**
   * Compara ciudades para selección por referencia.
   */
  public compareCities(a: CityEntity, b: CityEntity): boolean {
    return a && b ? a.code === b.code && a.name === b.name : a === b;
  }

  /**
   * Compara departamentos para selección por referencia.
   */
  public compareStates(a: StateEntity, b: StateEntity): boolean {
    return a && b ? a.ide === b.ide && a.name === b.name : a === b;
  }
}
