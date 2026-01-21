import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginService } from '../login/login.service';
import { LoginEntity } from '../login/login.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTypeEntity } from '../entities/domains/document-type.entity';
import { MessageUtil } from '../utils/message.util';
import { UsuariosComponentInstanceService } from '../usuarios/usuarios-component-instance.service';
import { StatusEntity } from '../entities/domains/status.entity';
import { AreaEntity } from '../entities/areas/area.entity';
import { CompanyEntity } from '../entities/companies/company.entity';
import { GroupEntity } from '../entities/groups/group.entity';
import { ProfileEntity } from '../entities/profiles/profile.entity';
import { OperationEntity } from '../entities/operations/operation.entity';
import { CreateUserEntity } from '../entities/users/create-user.entity';
import { firstValueFrom } from 'rxjs';
import { CityEntity } from '../entities/domains/geography/city.entity';
import { CountryEntity } from '../entities/domains/geography/country.entity';
import { StateEntity } from '../entities/domains/geography/state.entity';
import { GeografiaService } from '../comunes/geografia.service';
import { Constants } from '../utils/constants';

@Component({
  selector: 'fs-actualizar-datos',
  imports: [FormsModule],
  templateUrl: './actualizar-datos.component.html',
  styleUrls: ['./actualizar-datos.component.scss'],
})
/**
 * Componente para actualizar datos de usuario.
 *
 * Gestiona el formulario de datos del usuario, en modo edicion
 */
export class ActualizarDatosComponent {
  public userIdEdit: string | undefined;
  public userNameN: string | undefined;
  public docTypeN: string | undefined;
  public docNumberN: string | undefined;
  public nameN: string | undefined;
  public secondNameN: string | undefined;
  public firstLastNameN: string | undefined;
  public secondLastNameN: string | undefined;
  public emailN: string | undefined;
  public passwordN: string | undefined;
  public passwordConfirmationN: string | undefined;
  public descriptionN: string | undefined;
  public countryN: string | undefined;
  public stateN: string | undefined;
  public cityN: string | undefined;
  public phoneN: string | undefined;
  public addressN: string | undefined;
  public officeN: string | undefined;
  public titleN: string | undefined;
  public companyN: string | undefined;
  public areaN: string | undefined;
  public estadoN: string | undefined;
  private loggedUser: LoginEntity | undefined;
  public documentTypesList: DocumentTypeEntity[] = [];
  public statusesList: StatusEntity[] = [];
  public areasList: AreaEntity[] = [];
  public companiesList: CompanyEntity[] = [];
  public restrictedGroupsList: GroupEntity[] = [];
  public groupsList: string[] = [];
  public profilesList: ProfileEntity[] = [];
  public operationsList: OperationEntity[] = [];
  public restrictedOperationsList: OperationEntity[] = [];
  public countriesList: CountryEntity[] = [] as CountryEntity[];
  public statesList: StateEntity[] = [] as StateEntity[];
  public citiesList: CityEntity[] = [] as CityEntity[];
  public selectedOperation: any;
  public countryObjectN?: CountryEntity;
  public stateObjectN?: StateEntity;
  public cityObjectN?: CityEntity;
  public mensaje: string = '';

  public constructor(
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private usuariosComponentInstanceService: UsuariosComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
    private geografiaService: GeografiaService,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.userIdEdit = this.loggedUser?.user_name;
  }

  /**
   * Inicializa el componente.
   * - Si encuentra parámetro 'id' en ruta, entra en modo edición y carga datos del usuario.
   * - En ambos casos, carga catálogos necesarios (documentos, estados, áreas, compañías y geográficos).
   */
  public async ngOnInit(): Promise<void> {
    const id = this.userIdEdit;
    console.log('Edit Mode On. User Id:', id);
    if (id) {
      this.userIdEdit = id;
      await this.fillEditFields();
    } else {
      this.userIdEdit = undefined;
    }
    this.getDocumentTypesList();
    this.getStatusesList();
    this.getAreasList();
    this.getCompaniesList();
    await this.getCountriesList();
    await this.getStatesList();
    await this.getCitiesList();
  }

  /**
   * Llena los campos del formulario con la información del usuario a editar.
   * Muestra mensajes de error en caso de falla.
   */
  public async fillEditFields(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.usuariosService.getUser(
          this.loggedUser?.user_name ?? '',
          this.userIdEdit ?? '',
        ),
      );

      if (response?.respuesta) {
        const user = response.respuesta as CreateUserEntity;

        this.userNameN = user.name ?? '';
        this.docTypeN = user.documentType ?? '';
        this.docNumberN = user.documentNumber ?? '';
        this.nameN = user.firstName ?? '';
        this.secondNameN = user.secondName ?? '';
        this.firstLastNameN = user.lastName ?? '';
        this.secondLastNameN = user.secondLastName ?? '';
        this.emailN = user.email ?? '';
        this.passwordN = '';
        this.passwordConfirmationN = '';
        this.descriptionN = user.description ?? '';
        this.countryN = user.country ?? '';
        this.stateN = user.department ?? '';
        this.cityN = user.city ?? '';
        this.phoneN = user.phone ?? '';
        this.addressN = user.address ?? '';
        this.officeN = user.office ?? '';
        this.titleN = user.title ?? '';
        this.companyN = user.company ?? '';
        this.areaN = user.area ?? '';
        this.estadoN = user.status ?? '';
      }
    } catch (e) {
      this.mensaje = MessageUtil.buildErrorMessageFsResponse(
        Constants.ERR_USUARIO_DATOS,
        e,
      );
    }
  }

  /**
   * Indica si el componente se encuentra en modo edición.
   */
  public editMode(): boolean {
    return this.userIdEdit !== undefined && this.userIdEdit !== '';
  }

  /**
   * Edita el usuario existente con los valores del formulario.
   * Muestra mensajes y retorna al listado tras editar.
   */
  public save(): void {
    this.usuariosService
      .editUser({
        userName: this.loggedUser?.user_name,
        name: this.userNameN ?? '',
        documentType: this.docTypeN ?? '',
        documentNumber: this.docNumberN ?? '',
        firstName: this.nameN ?? '',
        secondName: this.secondNameN ?? '',
        firstLastName: this.firstLastNameN ?? '',
        secondLastName: this.secondLastNameN ?? '',
        email: this.emailN ?? '',
        password: this.passwordN ?? '',
        passwordConfirmation: this.passwordConfirmationN ?? '',
        description: this.descriptionN ?? '',
        country: this.countryN ?? '',
        state: this.stateN ?? '',
        city: this.cityN ?? '',
        phone: this.phoneN ?? '',
        address: this.addressN ?? '',
        office: this.officeN ?? '',
        title: this.titleN ?? '',
        company: this.companyN ?? '',
        area: this.areaN ?? '',
        status: this.estadoN ?? '',
        operation: '',
        profile: '',
        ideGroup: '',
      } as CreateUserEntity)
      .subscribe({
        next: (response) => {
          if (response && response.respuesta) {
            this.mensaje = 'Usuario editado correctamente.';
            this.userIdEdit = this.userNameN;
            // refrescar datos
            void this.ngOnInit();
          } else {
            this.mensaje = Constants.ERR_USUARIO_EDITAR;
          }
        },
        error: (e) => {
          this.mensaje = MessageUtil.buildErrorMessageFsResponse(
            Constants.ERR_USUARIO_EDITAR,
            e,
          );
        },
      });
  }

  /**
   * Cancela la operación actual
   */
  public cancel(): void {
    void this.ngOnInit();
  }

  /**
   * Obtiene el listado de tipos de documento para el formulario.
   */
  public getDocumentTypesList(): void {
    try {
      this.documentTypesList = [];
      this.usuariosService
        .getDocumentTypesList(this.loggedUser?.user_name ?? '')
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.documentTypesList =
                response.respuesta as DocumentTypeEntity[];
            }
          },
          error: (e: any) => {
            this.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_USUARIO_TIPOS_DOCUMENTO,
              e,
            );
          },
        });
    } catch (error: any) {
      this.mensaje = MessageUtil.buildErrorMessage(
        Constants.ERR_USUARIO_TIPOS_DOCUMENTO_LISTADO,
        error,
      );
    }
  }

  /**
   * Obtiene el listado de estados del usuario.
   */
  public getStatusesList(): void {
    try {
      this.statusesList = [];
      this.usuariosService
        .getStatusesList(this.loggedUser?.user_name ?? '')
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.statusesList = response.respuesta as StatusEntity[];
            }
          },
          error: (e: any) => {
            this.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_USUARIO_ESTADOS,
              e,
            );
          },
        });
    } catch (error: any) {
      this.mensaje = MessageUtil.buildErrorMessage(
        Constants.ERR_USUARIO_ESTADOS_LISTADO,
        error,
      );
    }
  }

  /**
   * Obtiene el listado de áreas disponibles.
   */
  public getAreasList(): void {
    try {
      this.areasList = [];
      this.usuariosService
        .getAreasList(this.loggedUser?.user_name ?? '')
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.areasList = response.respuesta as AreaEntity[];
            }
          },
          error: (e: any) => {
            this.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_USUARIO_AREAS,
              e,
            );
          },
        });
    } catch (error: any) {
      this.mensaje = MessageUtil.buildErrorMessage(
        Constants.ERR_USUARIO_AREAS_LISTADO,
        error,
      );
    }
  }

  /**
   * Obtiene el listado de compañías disponibles.
   */
  public getCompaniesList(): void {
    try {
      this.companiesList = [];
      this.usuariosService
        .getCompaniesList(this.loggedUser?.user_name ?? '')
        .subscribe({
          next: (response) => {
            if (response && response.respuesta) {
              this.companiesList = response.respuesta as CompanyEntity[];
            }
          },
          error: (e: any) => {
            this.mensaje = MessageUtil.buildErrorMessageFsResponse(
              Constants.ERR_USUARIO_TIPOS_DOCUMENTO,
              e,
            );
          },
        });
    } catch (error: any) {
      this.mensaje = MessageUtil.buildErrorMessage(
        Constants.ERR_USUARIO_TIPOS_DOCUMENTO_LISTADO,
        error,
      );
    }
  }

  private async getCountriesList(): Promise<void> {
    try {
      this.countriesList = [];
      const response = await firstValueFrom(
        this.geografiaService.getCountriesList(),
      );
      if (response?.respuesta) {
        this.countriesList = response.respuesta;
        if (this.countryN) {
          this.countryObjectN = this.countriesList.find(
            (country) => country.name === this.countryN,
          );
        }
      }
    } catch (e: any) {
      this.mensaje = MessageUtil.buildErrorMessageFsResponse(
        'No se pudo encontrar los países',
        e,
      );
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
          }
        }
      }
    } catch (e: any) {
      this.mensaje = MessageUtil.buildErrorMessageFsResponse(
        'No se pudo encontrar los departamentos',
        e,
      );
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
          }
        }
      }
    } catch (e: any) {
      this.mensaje = MessageUtil.buildErrorMessageFsResponse(
        'No se pudo encontrar las ciudades',
        e,
      );
    }
  }

  /**
   * Maneja el cambio de país y recarga los departamentos correspondientes.
   * Acepta tanto eventos nativos (change) como objetos (ngValue / custom).
   */
  public async onCountryChangeEvent($event: any): Promise<void> {
    try {
      const val = $event?.value ?? $event?.target?.value ?? $event;
      if (val && typeof val === 'object') {
        // cuando usas [ngValue]="country" el valor es el objeto
        this.countryObjectN = val as CountryEntity;
        this.countryN = (val as CountryEntity).name;
      } else {
        // cuando el <option> tiene string como value
        this.countryN = String(val ?? '');
        this.countryObjectN = this.countriesList.find(
          (c) => c.name === this.countryN,
        );
      }
      await this.getStatesList();
    } catch (e: any) {
      this.mensaje = MessageUtil.buildErrorMessageFsResponse(
        'Error al cambiar el país',
        e,
      );
    }
  }

  /**
   * Maneja el cambio de departamento y recarga las ciudades correspondientes.
   * Acepta tanto eventos nativos (change) como objetos (ngValue / custom).
   */
  public async onStateChangeEvent($event: any): Promise<void> {
    try {
      const val = $event?.value ?? $event?.target?.value ?? $event;
      if (val && typeof val === 'object') {
        this.stateObjectN = val as StateEntity;
        this.stateN = (val as StateEntity).name;
      } else {
        this.stateN = String(val ?? '');
        this.stateObjectN = this.statesList.find((s) => s.name === this.stateN);
      }
      await this.getCitiesList();
    } catch (e: any) {
      this.mensaje = MessageUtil.buildErrorMessageFsResponse(
        'Error al cambiar el departamento',
        e,
      );
    }
  }

  /**
   * Maneja el cambio de ciudad seleccionada.
   * Acepta tanto eventos nativos (change) como objetos (ngValue / custom).
   */
  public onCityChangeEvent($event: any): void {
    try {
      const val = $event?.value ?? $event?.target?.value ?? $event;
      if (val && typeof val === 'object') {
        this.cityObjectN = val as CityEntity;
        this.cityN = (val as CityEntity).name;
      } else {
        this.cityN = String(val ?? '');
        this.cityObjectN = this.citiesList.find((c) => c.name === this.cityN);
      }
    } catch (e: any) {
      this.mensaje = MessageUtil.buildErrorMessageFsResponse(
        'Error al cambiar la ciudad',
        e,
      );
    }
  }

  /**
   * Compara países para selects.
   */
  public compareCountries(a?: CountryEntity, b?: CountryEntity): boolean {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a?.ide === b?.ide && a?.name === b?.name;
  }

  /**
   * Compara ciudades para selects.
   */
  public compareCities(a?: CityEntity, b?: CityEntity): boolean {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a?.code === b?.code && a?.name === b?.name;
  }

  /**
   * Compara departamentos para selects.
   */
  public compareStates(a?: StateEntity, b?: StateEntity): boolean {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a?.ide === b?.ide && a?.name === b?.name;
  }

  /**
   * Elimina elementos duplicados de un arreglo manteniendo el orden.
   */
  public removeDuplicates<T>(arr: T[]): T[] {
    return [...new Set(arr)];
  }
}
