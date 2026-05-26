import { Component } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FestivoComponent } from '../festivo.component';
import { LoginEntity } from '../../login/login.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { FestivoComponentInstanceService } from '../festivo-component-instance.service';
import { FestivoService } from '../festivo.service';
import { FestivoEntity } from '../festivo.entity';
import { UserEntity } from '../../entities/users/user.entity';
import { MessageUtil } from '../../utils/message.util';
import { Constants } from '../../utils/constants';
import { firstValueFrom } from 'rxjs';
import { GroupEntity } from '../../entities/groups/group.entity';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CompaniasService } from '../../companias/companias.service';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { UserSearchFilterEntity } from '../../entities/users/user-search-filter.entity';

@Component({
  selector: 'ibpm-crear-festivo',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './crear-festivo.component.html',
  styleUrl: './crear-festivo.component.scss',
})
/**
 * Componente para la creación y edición de grupos.
 * Permite seleccionar compañía, supervisor y administrar permisos/restricciones.
 */
export class CrearFestivoComponent {
  public uc?: FestivoComponent;
  public loggedUser?: LoginEntity;
  public nameN: string = '';
  public descriptionN: string = '';
  public festivoN: string = '';
  public festivoObjectN?: FestivoEntity;
  public supervisorN: string = '';
  public operationE: string = '';
  public operationsList: string[] = [];
  public restrictedOperationsList: string[] = [];
  public festivoList: FestivoEntity[] = [];
  public supervisorsList: UserEntity[] = [];
  public festivoIdEdit?: string;
  public supervisorObjectN?: UserEntity;

  public constructor(
    private festivoService: FestivoService,
    private companiasService: CompaniasService,
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private festivoComponentInstanceService: FestivoComponentInstanceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loggedUser = this.loginService.getLoggedUser();
    this.uc = this.festivoComponentInstanceService.getInstance();
  }

  /**
   * Inicializa el formulario, carga listas y detecta modo de edición.
   */
  public async ngOnInit(): Promise<void> {
    if (this.uc) {
      this.uc.mensaje = '';
    }
   console.log('Entre a crear festivo');
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Edit Mode On. Group Id:', id);
    if (id) {
      this.festivoIdEdit = id;
      
    } else {
      this.festivoIdEdit = undefined;
    }
  }



  /**
   * Indica si está en modo edición.
   */
  public editMode(): boolean {
    return this.festivoIdEdit !== undefined && this.festivoIdEdit !== '';
  }

  /**
   * Maneja el cambio de compañía seleccionada.
   */
  public onFestivoChange(event: MatSelectChange<FestivoEntity>) {
    this.festivoObjectN = event.value;
    this.festivoN = event.value?.nombre ?? '';
  }

  /**
   * Guarda los cambios, creando o editando el grupo según corresponda.
   */
  public save() {
    if (!this.editMode()) {
  /*    this.create();  */
    } else {
 /*     this.edit();  */
    }
  }

  
  /**
   * Compara compañías en el selector.
   */
  public compareCompanies(c1: FestivoEntity, c2: FestivoEntity): boolean {
    return c1.nombre === c2.nombre;
  }

  /**
   * Compara supervisores en el selector.
   */
  public compareSupervisors(s1: UserEntity, s2: UserEntity): boolean {
    return s1.name === s2.name;
  }

  /**
   * Maneja el cambio de supervisor seleccionado.
   */
  public onSupervisorChange(event: MatSelectChange<UserEntity>) {
    this.supervisorObjectN = event.value;
    this.supervisorN = event.value?.name ?? '';
  }



}