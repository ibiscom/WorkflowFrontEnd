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
import { FestivoComponent } from './festivos/festivo.component';
import { EventoInicioComponent } from './eventos-de-inicio/eventoinicio.component';
import { CrearEventoInicioComponent } from './eventos-de-inicio/crear-eventoinicio/crear-eventoinicio.component';
import { ListadoEventoInicioComponent } from './eventos-de-inicio/listado-eventoinicio/listado-eventoinicio.component';
import { GrupoComponent } from './grupos/grupo.component';
import { CrearGrupoComponent } from './grupos/crear-grupo/crear-grupo.component';
import { ListadoGrupoComponent } from './grupos/listado-grupo/listado-grupo.component';
import { AlarmaComponent } from './alarmas/alarmas.component';
import { CrearAlarmaComponent } from './alarmas/crear-alarmas/crear-alarmas.component';
import { ListadoAlarmasComponent } from './alarmas/listado-alarmas/listado-alarmas.component';
import { ListarTareaComponent } from './listar-tareas/listar-tareas.component';
import { MostrarHerramientaComponent } from './listar-tareas/mostrar-herramienta/mostrar-herramienta.component';
import { ListadoListarTareaComponent } from './listar-tareas/listado-listar-tareas/listado-listar-tareas.component';
import { CrearPatronComponent } from './patrones/crear-patron/crear-patron.component';
import { PatronComponent } from './patrones/patron.component';
import { ListadoPatronComponent } from './patrones/listado-patron/listado-patron.component';
import { ListadoMigworkflowComponent } from './migworkflow/listado-migworkflow/listado-migworkflow.component';
import { MigworkflowComponent } from './migworkflow/migworkflow.component';
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of f3ba8df (Revert "Merge branch 'jbeltran' of https://github.com/ibiscom/WorkflowFrontEnd into cdiaz")
import { FinalizarprocesoComponent } from './finalizarproceso/finalizarproceso.component';
import { ListadoFinalizarprocesoComponent } from './finalizarproceso/listado-finalizarproceso/listado-finalizarproceso.component';
import { ListadoDistribuirtareaComponent } from './distribuir-tarea/listado-distribuirtarea/listado-distribuirtarea.component';
import { DistribuirtareaComponent } from './distribuir-tarea/distribuirtarea.component';
import { ConsultarRolResponsableComponent } from './consultarrolresponsable/consultarrolresponsable.component';
import { ListadoConsultarRolResponsableComponent } from './consultarrolresponsable/listado-consultarrolresponsable/listado-consultarrolresponsable.component';
import { SimulacionComponent } from './simulacion/simulacion.component';
import { ListadoSimulacionComponent } from './simulacion/listado-simulacion/listado-simulacion.component';
<<<<<<< HEAD
import { ConsultarPorTareaComponent } from './consultar-por-tarea/consultarportarea.component';
import { ListadoConsultarPorTareaComponent } from './consultar-por-tarea/listado-consultarportarea/listado-consultarportarea.component';
import { ListadoConsultarTrazabilidadComponent } from './consultar-trazabilidad/listado-consultartrazabilidad/listado-consultartrazabilidad.component';
import { ConsultarTrazabilidadComponent } from './consultar-trazabilidad/consultartrazabilidad.component';
import { ConsultarPorObjetoComponent } from './consultar-por-objeto/consultarporobjeto.component';
import { ListadoConsultarPorObjetoComponent } from './consultar-por-objeto/listado-consultarporobjeto/listado-consultarporobjeto.component';
import { ListadoConsultarPorResponsableComponent } from './consultar-por-responsable/listado-consultarporresponsable/listado-consultarportarea.component';
import { ConsultarPorResponsableComponent } from './consultar-por-responsable/consultarporresponsable.component';
import { ListadoConsultarPorFlujoComponent } from './consultar-por-flujo/listado-consultarporflujo/listado-consultarporflujo.component';
import { ConsultarPorFlujoComponent } from './consultar-por-flujo/consultarporflujo.component';
import { ListadoIndicadorDeFlujoComponent } from './indicador-de-flujo/listado-indicadordeflujo/listado-indicadordeflujo.component';
import { IndicadorDeFlujoComponent } from './indicador-de-flujo/indicadordeflujo.component';
import { ListadoIndicadorDeTareaComponent } from './indicador-de-tarea/listado-indicadordetarea/listado-indicadordetarea.component';
import { IndicadorDeTareaComponent } from './indicador-de-tarea/indicadordetarea.component';
import { ListadoActividadPendientePorResponsableComponent } from './actividades-pendientes-por-responsable/listado-actividadpendienteporresponsable/listado-actividadpendienteporresponsable.component';
import { ActividadPendientePorResponsableComponent } from './actividades-pendientes-por-responsable/actividadpendienteporresponsable.component';
import { ActividadRealizadaPorResponsableComponent } from './actividades-realizadas-por-responsable copy/actividadrealizadaporresponsable.component';
import { ListadoActividadRealizadaPorResponsableComponent } from './actividades-realizadas-por-responsable copy/listado-actividadrealizadaporresponsable/listado-actividadrealizadaporresponsable.component';
import { ActividadRealizadaPorTareaComponent } from './actividades-realizadas-por-tarea/actividadrealizadaportarea.component';
import { ListadoActividadRealizadaPorTareaComponent } from './actividades-realizadas-por-tarea/listado-actividadrealizadaportarea/listado-actividadrealizadaportarea.component';
>>>>>>> 1ac0d68672a2766965ed7bff1d4587c6b5a358e8
=======
>>>>>>> parent of f3ba8df (Revert "Merge branch 'jbeltran' of https://github.com/ibiscom/WorkflowFrontEnd into cdiaz")

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


      /* Eventos de Inicio */
      {
        path: 'eventoinicio',
        component: EventoInicioComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoEventoInicio',
            pathMatch: 'full',
          },
          {
            path: 'listadoEventoInicio',
            component: ListadoEventoInicioComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearEventoInicio',
            component: CrearEventoInicioComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarEventoInicio/:id',
            component: CrearEventoInicioComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

      /* Herramientas */
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
            path: 'editarEntidad/:id',
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
      {
        path: 'festivos',
        component: FestivoComponent,
        canActivate: [CanActivateGuard],
      },

      {
        path: 'grupos',
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
            path: 'crearGrupos',
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
        path: 'alarmas',
        component: AlarmaComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoAlarmas',
            pathMatch: 'full',
          },
          {
            path: 'listadoAlarmas',
            component: ListadoAlarmasComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearAlarma',
            component: CrearAlarmaComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarAlarma/:id',
            component: CrearAlarmaComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

      {
        path: 'listarTareas',
        component: ListarTareaComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoListarTareas',
            pathMatch: 'full',
          },
          {
            path: 'listadoListarTareas',
            component: ListadoListarTareaComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'mostrarHerramienta/:idWorkflowEngine/:idTareaEngine',
            component: MostrarHerramientaComponent,
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
        path: 'patrones',
        component: PatronComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoPatrones',
            pathMatch: 'full',
          },
          {
            path: 'listadoPatrones',
            component: ListadoPatronComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'crearPatron',
            component: CrearPatronComponent,
            canActivate: [CanActivateGuard],
          },
          {
            path: 'editarPatron/:id',
            component: CrearPatronComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
          {
        path: 'migWorkflow',
        component: MigworkflowComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoMigWorkflow',
            pathMatch: 'full',
          },
          {
            path: 'listadoMigWorkflow',
            component: ListadoMigworkflowComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of f3ba8df (Revert "Merge branch 'jbeltran' of https://github.com/ibiscom/WorkflowFrontEnd into cdiaz")

      {
        path: 'finalizarProceso',
        component: FinalizarprocesoComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoFinalizarProceso',
            pathMatch: 'full',
          },
          {
            path: 'listadoFinalizarProceso',
            component: ListadoFinalizarprocesoComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

      {
        path: 'distribuirTarea',
        component: DistribuirtareaComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoDistribuirtarea',
            pathMatch: 'full',
          },
          {
            path: 'listadoDistribuirtarea',
            component: ListadoDistribuirtareaComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
            {
        path: 'consultarroldelresponsable',
        component: ConsultarRolResponsableComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoConsultarRolResponsable',
            pathMatch: 'full',
          },
          {
            path: 'listadoConsultarRolResponsable',
            component: ListadoConsultarRolResponsableComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

                  {
        path: 'Simulación',
        component: SimulacionComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoSimulacion',
            pathMatch: 'full',
          },
          {
            path: 'listadoSimulacion',
            component: ListadoSimulacionComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },
<<<<<<< HEAD
            {
        path: 'consultarportarea',
        component: ConsultarPorTareaComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoConsultarPorTarea',
            pathMatch: 'full',
          },
          {
            path: 'listadoConsultarPorTarea',
            component: ListadoConsultarPorTareaComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

        {
        path: 'consultartrazabilidad',
        component: ConsultarTrazabilidadComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoConsultarTrazabilidad',
            pathMatch: 'full',
          },
          {
            path: 'listadoConsultarTrazabilidad',
            component: ListadoConsultarTrazabilidadComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

        {
        path: 'consultarporobjeto',
        component: ConsultarPorObjetoComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoConsultarPorObjeto',
            pathMatch: 'full',
          },
          {
            path: 'listadoConsultarPorObjeto',
            component: ListadoConsultarPorObjetoComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

              {
        path: 'consultarporresponsables',
        component: ConsultarPorResponsableComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoConsultarPorResponsables',
            pathMatch: 'full',
          },
          {
            path: 'listadoConsultarPorResponsables',
            component: ListadoConsultarPorResponsableComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

      {
        path: 'consultarporflujo',
        component: ConsultarPorFlujoComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoConsultarPorFlujo',
            pathMatch: 'full',
          },
          {
            path: 'listadoConsultarPorFlujo',
            component: ListadoConsultarPorFlujoComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

      {
        path: 'indicadordeflujo',
        component: IndicadorDeFlujoComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoIndicadorDeFlujo',
            pathMatch: 'full',
          },
          {
            path: 'listadoIndicadorDeFlujo',
            component: ListadoIndicadorDeFlujoComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

      {
        path: 'indicadordetarea',
        component: IndicadorDeTareaComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoIndicadorDeTarea',
            pathMatch: 'full',
          },
          {
            path: 'listadoIndicadorDeTarea',
            component: ListadoIndicadorDeTareaComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

      {
        path: 'actividadespendientesporresponsable',
        component: ActividadPendientePorResponsableComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoActividadPendientePorResponsable',
            pathMatch: 'full',
          },
          {
            path: 'listadoActividadPendientePorResponsable',
            component: ListadoActividadPendientePorResponsableComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

            {
        path: 'actividadesrealizadasporresponsable',
        component: ActividadRealizadaPorResponsableComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoActividadRealizadaPorResponsable',
            pathMatch: 'full',
          },
          {
            path: 'listadoActividadRealizadaPorResponsable',
            component: ListadoActividadRealizadaPorResponsableComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

              {
        path: 'actividadesrealizadasportarea',
        component: ActividadRealizadaPorTareaComponent,
        canActivate: [CanActivateGuard],
        children: [
          {
            path: '',
            redirectTo: 'listadoActividadRealizadaPorTarea',
            pathMatch: 'full',
          },
          {
            path: 'listadoActividadRealizadaPorTarea',
            component: ListadoActividadRealizadaPorTareaComponent,
            canActivate: [CanActivateGuard],
          },
        ],
      },

>>>>>>> 1ac0d68672a2766965ed7bff1d4587c6b5a358e8
=======
>>>>>>> parent of f3ba8df (Revert "Merge branch 'jbeltran' of https://github.com/ibiscom/WorkflowFrontEnd into cdiaz")
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
];


