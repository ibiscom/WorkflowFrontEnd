import { Routes } from '@angular/router';
import { SesionesComponent } from './sesiones/sesiones.component';
import { LoginService } from './login/login.service';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { ListadoUsuariosComponent } from './usuarios/listado-usuarios/listado-usuarios.component';
import { ListadoSesionesComponent } from './sesiones/listado-sesiones/listado-sesiones.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { ListadoOperacionesComponent } from './operaciones/listado-operaciones/listado-operaciones.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ListadoCategoriasComponent } from './categorias/listado-categorias/listado-categorias.component';
import { CrearCategoriaComponent } from './categorias/crear-categoria/crear-categoria.component';
import { CompaniasComponent } from './companias/companias.component';
import { ListadoCompaniasComponent } from './companias/listado-companias/listado-companias.component';
import { CrearCompaniaComponent } from './companias/crear-compania/crear-compania.component';
import { CrearGrupoComponent } from './grupos/crear-grupo/crear-grupo.component';
import { GrupoComponent } from './grupos/grupo.component';
import { ListadoGrupoComponent } from './grupos/listado-grupo/listado-grupo.component';
import { CrearPerfilComponent } from './perfiles/crear-perfil/crear-perfil.component';
import { ListadoPerfilesComponent } from './perfiles/listado-perfiles/listado-perfiles.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { LogsComponent } from './logs/logs.component';
import { CrearTipoIdentificacionComponent } from './tipos-identificacion/crear-tipo-identificacion/crear-tipo-identificacion.component';
import { ListadoTiposIdentificacionComponent } from './tipos-identificacion/listado-tipos-identificacion/listado-tipos-identificacion.component';
import { TiposIdentificacionComponent } from './tipos-identificacion/tipos-identificacion.component';
import { LogAuditoriaComponent } from './log-auditoria/log-auditoria.component';
import { ListadoDetalleLogAuditoriaComponent } from './log-auditoria/listado-detalle-log-auditoria/listado-detalle-log-auditoria.component';
import { ListadoLogAuditoriaComponent } from './log-auditoria/listado-log-auditoria/listado-log-auditoria.component';
import { DatosCorporativosComponent } from './datos-corporativos/datos-corporativos.component';
import { ListadoDatosCorporativosComponent } from './datos-corporativos/listado-datos-corporativos/listado-datos-corporativos.component';
import { DatosGeneralesComponent } from './datos-corporativos/datos-generales/datos-generales.component';
import { ReestablecerPasswordComponent } from './reestablecer-password/reestablecer-password.component';
import { LogsAccesoComponent } from './logs-acceso/logs-acceso.component';
import { ListadoLogsAccesoComponent } from './logs-acceso/listado-logs-acceso/listado-logs-acceso.component';
import { RegistroAreaComponent } from './areas/registro-area/registro-area.component';
import { ListadoAreasComponent } from './areas/listado-areas/listado-areas.component';
import { AreasComponent } from './areas/areas.component';
import { SincActiveDirectoryComponent } from './sinc-active-directory/sinc-active-directory.component';
import { VerLogSincronizacionComponent } from './sinc-active-directory/ver-log-sincronizacion/ver-log-sincronizacion.component';
import { ActualizarDatosComponent } from './actualizar-datos/actualizar-datos.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { ListadoWorkflowComponent } from './workflow/listado-workflow/listado-workflow.component';
import { CrearWorkflowComponent } from './workflow/crear-workflow/crear-workflow.component';
import { TareasComponent } from './tareas/tareas.component';
import { ListadoTareasComponent } from './tareas/listado-tareas/listado-tareas.component';
import { CrearTareasComponent } from './tareas/crear-tareas/crear-tareas.component';
import { ObjetowComponent } from './objetosw/objetow.component';
import { ListadoAtributosObjetowComponent } from './objetosw/listado-atributos-objetow/listado-atributos-objetow.component';
import { CrearAtributoObjetowComponent } from './objetosw/crear-atributo-objetow/crear-atributo-objetow.component';
import { HerramientaComponent } from './herramientas/herramienta.component';
import { ListadoHerramientaComponent } from './herramientas/listado-herramienta/listado-herramienta.component';
import { CrearHerramientaComponent } from './herramientas/crear-herramienta/crear-herramienta.component';
import { DependenciaComponent } from './dependencias/dependencia.component';
import { ListadoDependenciaComponent } from './dependencias/listado-dependencia/listado-dependencia.component';
import { CrearDependenciaComponent } from './dependencias/crear-dependencias/crear-dependencia.component';
import { RolesComponent } from './roles/roles.component';
import { ListadoRolesComponent } from './roles/listado-roles/listado-roles.component';
import { CrearRolesComponent } from './roles/crear-roles/crear-roles.component';
import { ResponsableComponent } from './reponsable/responsable.component';
import { ListadoResponsableComponent } from './reponsable/listado-responsable/listado-responsable.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { CrearEntidadesComponent } from './entidades/crear-entidades/crear-entidades.component';
import { ListadoEntidadesComponent } from './entidades/listado-entidades/listado-entidades.component';



export const CanActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(LoginService).canActivate();
};

export const routes: Routes = [
  {
    path: 'main-page',
    component: MainPageComponent,
    canActivate: [CanActivateGuard],
    children: [
      {
        path: 'administrarOperaciones',
        component: OperacionesComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoOperaciones',
            pathMatch: 'full',
          },
          {
            path: 'listadoOperaciones',
            component: ListadoOperacionesComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
      {
        path: 'administrarSesiones',
        component: SesionesComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoSesiones',
            pathMatch: 'full',
          },
          {
            path: 'listadoSesiones',
            component: ListadoSesionesComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
      {
        path: 'administrarUsuarios',
        component: UsuariosComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoUsuarios',
            pathMatch: 'full',
          },
          {
            path: 'listadoUsuarios',
            component: ListadoUsuariosComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearUsuario',
            component: CrearUsuarioComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarUsuario/:id',
            component: CrearUsuarioComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
      {
        path: 'administrarCategorias',
        component: CategoriasComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoCategorias',
            pathMatch: 'full',
          },
          {
            path: 'listadoCategorias',
            component: ListadoCategoriasComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearCategoria',
            component: CrearCategoriaComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarCategoria/:id',
            component: CrearCategoriaComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
      {
        path: 'administrarCompanias',
        component: CompaniasComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoCompanias',
            pathMatch: 'full',
          },
          {
            path: 'listadoCompanias',
            component: ListadoCompaniasComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearCompania',
            component: CrearCompaniaComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarCompania/:id',
            component: CrearCompaniaComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
      {
        path: 'administrarGrupos',
        component: GrupoComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoGrupos',
            pathMatch: 'full',
          },
          {
            path: 'listadoGrupos',
            component: ListadoGrupoComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearGrupo',
            component: CrearGrupoComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarGrupo/:id',
            component: CrearGrupoComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
      {
        path: 'administrarPerfiles',
        component: PerfilesComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoPerfiles',
            pathMatch: 'full',
          },
          {
            path: 'listadoPerfiles',
            component: ListadoPerfilesComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearPerfil',
            component: CrearPerfilComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarPerfil/:id',
            component: CrearPerfilComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
      {
        path: 'administrarLogs',
        component: LogsComponent,
        canActivate: [CanActivateGuard],
      },
      {
        path: 'administrarTiposIdentificacion',
        component: TiposIdentificacionComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoTiposIdentificacion',
            pathMatch: 'full',
          },
          {
            path: 'listadoTiposIdentificacion',
            component: ListadoTiposIdentificacionComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearTipoIdentificacion',
            component: CrearTipoIdentificacionComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarTipoIdentificacion/:id',
            component: CrearTipoIdentificacionComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
      {
        path: 'verLogAuditoria',
        component: LogAuditoriaComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoLogsAuditoria',
            pathMatch: 'full',
          },
          {
            path: 'listadoLogsAuditoria',
            component: ListadoLogAuditoriaComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'verDetalleLogAuditoria/:id',
            component: ListadoDetalleLogAuditoriaComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
      {
        path: 'datosCorporativos',
        component: DatosCorporativosComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoDatosCorporativos',
            pathMatch: 'full',
          },
          {
            path: 'listadoDatosCorporativos',
            component: ListadoDatosCorporativosComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'datosGenerales/:id',
            component: DatosGeneralesComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
      {
        path: 'reestablecerPassword',
        component: ReestablecerPasswordComponent,
        canActivate: [CanActivateGuard],
      },
      {
        path: 'verLogsDeAcceso',
        component: LogsAccesoComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoLogsDeAcceso',
            pathMatch: 'full',
          },
          {
            path: 'listadoLogsDeAcceso',
            component: ListadoLogsAccesoComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
      {
        path: 'registroArea',
        component: AreasComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoAreas',
            pathMatch: 'full',
          },
          {
            path: 'listadoAreas',
            component: ListadoAreasComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
      {
        path: 'sincronizarActiveDirectory',
        component: SincActiveDirectoryComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'verLogSincronizacion',
            pathMatch: 'full',
          },
          {
            path: 'verLogSincronizacion',
            component: VerLogSincronizacionComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
      {
        path: 'actualizarDatos',
        component: ActualizarDatosComponent,
        canActivate: [CanActivateGuard],
      },

      {
        path: 'workflow',
        component: WorkflowComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoWorkflow',
            pathMatch: 'full',
          },
          {
            path: 'listadoWorkflow',
            component: ListadoWorkflowComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearWorkflow',
            component: CrearWorkflowComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarWorkflow/:id',
            component: CrearWorkflowComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

      {
        path: 'tareas',
        component: TareasComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoTareas',
            pathMatch: 'full',
          },
          {
            path: 'listadoTareas',
            component: ListadoTareasComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearTarea',
            component: CrearTareasComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarTarea/:id',
            component: CrearTareasComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },


      {
        path: 'herramientas',
        component: HerramientaComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoHerramientas',
            pathMatch: 'full',
          },
          {
            path: 'listadoHerramientas',
            component: ListadoHerramientaComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearHerramienta',
            component: CrearHerramientaComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarHerramienta/:id',
            component: CrearHerramientaComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
/* DEpendencias */
      {
        path: 'dependencias',
        component: DependenciaComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoDependencias',
            pathMatch: 'full',
          },
          {
            path: 'listadoDependencias',
            component: ListadoDependenciaComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearDependencia',
            component: CrearDependenciaComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarDependencia/:id',
            component: CrearDependenciaComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoRoles',
            pathMatch: 'full',
          },
          {
            path: 'listadoRoles',
            component: ListadoRolesComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearRoles',
            component: CrearRolesComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarRoles/:id',
            component: CrearRolesComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

{
        path: 'entidades',
        component: EntidadesComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoEntidades',
            pathMatch: 'full',
          },
          {
            path: 'listadoEntidades',
            component: ListadoEntidadesComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearEntidades',
            component: CrearEntidadesComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarEntidad/:nombre',
            component: CrearEntidadesComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
      
      {
        path: 'objetosWorkflow',
        component: ObjetowComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoAtributosObjetoWorkflow',
            pathMatch: 'full',
          },
          {
            path: 'listadoAtributosObjetoWorkflow',
            component: ListadoAtributosObjetowComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearAtributoObjetoWorkflow',
            component: CrearAtributoObjetowComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarAtributoObjetoWorkflow/:id',
            component: CrearAtributoObjetowComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },


        {
        path: 'responsable',
        component: ResponsableComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoResponsables',
            pathMatch: 'full',
          },
          {
            path: 'listadoResponsables',
            component: ListadoResponsableComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
];
