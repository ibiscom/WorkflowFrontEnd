export class Constants {
  //Errores Generales paginas Constructor
    public static ERR_WORKFLOW_NO_SELECCIONADO: string = 'No se ha seleccionado un workflow. Por favor, seleccione un workflow para continuar.';
  
  //Errores Workflow  
  public static ERR_WORKFLOW_CREAR: string = 
    'No se pudo crear el workflow.';
  public static ERR_WORKFLOW_EDITAR: string = 
    'No se pudo editar el workflow.';
  public static ERR_WORKFLOW_ELIMINAR: string = 
    'No se pudo eliminar el workflow.';
  public static ERR_OBTENIENDO_ESTADOS_WORKFLOW: string =
    'Error al obtener los estados de los workflows';
  public static ERR_OBTENIENDO_WORKFLOWS: string = 
    'Error al obtener los workflows';
  public static ERR_WORKFLOW_DATOS: string =
    'No se pudo obtener los datos del workflow';
  public static ERR_OBTENIENDO_TIPOS_HERR: string =
    'No se pudo obtener los tipos de herramientas'
  public static ERR_OBTENIENDO_DEPENDENCIAS: string =
    'No se pudo obtener las dependencias'; 
  public static  ERR_OBTENIENDO_ESTADO_DEPENDENCIA: string =
  'No se pudo obtener el estado de la dependencia';

  // Errores Objetos Workflow
    public static ERR_BUSCAR_OBJETOW: string = 
      'Error al buscar objeto workflow';

  // Errores Herramientas
  public static  ERR_HERRAMIENTA_CREAR: string =
    'No se pudo crear la herramienta';
  public static ERR_HERRAMIENTA_EDITAR: string =
    'No se pudo editar la herramienta';
  public static ERR_HERRAMIENTA_ELIMINAR: string =
    'No se pudo eliminar la herramienta';
  public static ERR_OBTENIENDO_HERRAMIENTAS: string =
    'Error al obtener las herramientas';
  public static ERR_OBTENIENDO_HERRAMIENTA: string =
    'Error al obtener los datos de la herramienta';
  public static MSG_HERRAMIENTA_CREACION_EXITOSA: string = 
    'Herramienta creada exitosamente.';
  public static MSG_HERRAMIENTA_EDICION_EXITOSA: string = 
    'Herramienta editada exitosamente.';
  public static MSG_HERRAMIENTA_ELIMINACION_EXITOSA: string = 
    'Herramienta eliminada exitosamente.';
  public static ERR_OBTENIENDO_TAREAS: string = 
    'Error al obtener las tareas';

    public static ERR_OBTENIENDO_RESPONSABLES: string = 
    'Error al obtener los responsables';
    public static ERR_OBTENIENDO_RESPONSABLESS: string = 'Error al obtener los responsables';


//Errores Tareas
  public static ERR_TAREA_DATOS: string =
    'No se pudo obtener los datos de la tarea';
  public static ERR_TAREA_CREAR: string =
    'No se pudo crear la tarea';
  public static ERR_TAREA_EDITAR: string =
    'No se pudo editar la tarea';
  public static ERR_TAREA_ELIMINAR: string =
    'No se pudo eliminar la tarea'
  public static ERR_TIPO_TAREA: string =
    'No se pudo obtener los tipos de tarea';
  public static ERR_TIPO_TAREA_ENCONTRAR: string =
    'No se pudo encontrar los tipos de tarea';
  public static ERR_HERRAMIENTA_TAREA: string =
    'No se pudo obtener las herramientas de tarea';
  public static ERR_HERRAMIENTA_TAREA_ENCONTRAR: string =
    'No se pudo encontrar las herramientas de tarea';
  public static ERR_ROL_TAREA: string =
    'No se pudo obtener los roles de tarea'
  public static ERR_ROL_TAREA_ENCONTRAR: string =
    'No se pudo encontrar los roles de tarea';
  public static ERR_METODO_ASIGNACION_TAREA: string = 
  'No se pudo obtener los métodos de asignación de tarea';
  public static ERR_METODO_ASIGNACION_TAREA_ENCONTRAR: string = 
  'No se pudo encontrar los métodos de asignación de tarea';
  public static ERR_SERIE_TAREA_ENCONTRAR: string = 
  'No se pudo encontrar las series de tarea';
  public static ERR_TIPO_DOCUMENTO_TAREA_ENCONTRAR: string = 
  'No se pudo encontrar los tipos de documento de tarea';
  




    

  public static ERR_LOG_AUDITORIA_DETALLE: string =
    'No se pudo obtener el detalle del log de auditoría';
  public static ERR_LOG_AUDITORIA_PROPIEDADES: string =
    'No se pudo obtener las propiedades del log de auditoría';
  public static ERR_CATEGORIA_DATOS: string =
    'No se pudo obtener los datos de la categoría';
  public static ERR_CATEGORIA_CREAR: string = 'No se pudo crear la categoría.';
  public static ERR_CATEGORIA_EDITAR: string =
    'No se pudo editar la categoría.';
  public static ERR_CATEGORIA_OPERACIONES: string =
    'No se pudo obtener las operaciones de la categoría';
  public static ERR_CATEGORIA_OPERACIONES_ENCONTRAR: string =
    'No se pudo encontrar las operaciones';
  public static ERR_CATEGORIA_OPERACIONES_RESTRINGIDAS: string =
    'No se pudo obtener las operaciones restringidas de la categoría';
  public static ERR_CATEGORIA_OPERACIONES_RESTRINGIDAS_ENCONTRAR: string =
    'No se pudo encontrar las operaciones restringidas de la categoría';
  public static ERR_CATEGORIA_ASOCIAR_OPERACION: string =
    'No se pudo asociar la operación a la categoría';
  public static ERR_CATEGORIA_ELIMINAR_OPERACION: string =
    'No se pudo eliminar la operación a la categoría';
  public static ERR_CATEGORIA_ELIMINAR: string =
    'No se pudo eliminar la categoría.';
  public static ERR_CATEGORIA_BUSCAR: string = 'No se pudo buscar categorías';
  public static ERR_CATEGORIA_BUSCAR_ERROR: string =
    'Error al buscar categorías';
  public static ERR_LOG_AUDITORIA_BUSCAR: string =
    'No se pudo buscar logs de auditoría';
  public static ERR_LOG_AUDITORIA_REPORTE_DESCARGAR: string =
    'No se pudo descargar el reporte de logs de auditoría';
  public static ERR_USUARIO_REPORTE_GENERAR: string =
    'No se pudo generar el reporte.';
  public static ERR_USUARIO_BUSCAR: string = 'No se pudo buscar usuarios';
  public static ERR_USUARIO_BUSCAR_ERROR: string = 'Error al buscar usuarios';
  public static ERR_USUARIO_TIPOS_DOCUMENTO: string =
    'No se pudo encontrar los tipos de documento';
  public static ERR_USUARIO_TIPOS_DOCUMENTO_LISTADO: string =
    'Error al obtener el listado de tipos de documento';
  public static ERR_USUARIO_ESTADOS: string =
    'No se pudo encontrar los estados';
  public static ERR_USUARIO_ESTADOS_LISTADO: string =
    'Error al obtener el listado de estados';
  public static ERR_USUARIO_AREAS: string = 'No se pudo encontrar las áreas';
  public static ERR_USUARIO_AREAS_LISTADO: string =
    'Error al obtener el listado de áreas';
  public static ERR_USUARIO_DATOS: string =
    'No se pudo obtener los datos del usuario';
  public static ERR_USUARIO_PERFIL_ENCONTRAR: string =
    'No se pudo encontrar el perfil';
  public static ERR_USUARIO_RESTRINGIR_OPERACION: string =
    'No se pudo restringir la operación al usuario';
  public static ERR_USUARIO_ASOCIAR_PERMISO: string =
    'No se pudo asociar el permiso al usuario';
  public static ERR_USUARIO_CREAR: string = 'No se pudo crear el usuario.';
  public static ERR_USUARIO_EDITAR: string = 'No se pudo editar el usuario.';
  public static ERR_USUARIO_ELIMINAR: string =
    'No se pudo eliminar el usuario.';
  public static ERR_BUSCAR_TIPOS_IDENTIFICACION: string =
    'No se pudo buscar los tipos de identificación';
  public static ERR_BUSCAR_TIPOS_IDENTIFICACION_ERROR: string =
    'Error al buscar los tipos de identificación';
  public static ERR_PERFIL_DATOS: string =
    'No se pudo obtener los datos del perfil';
  public static ERR_PERFIL_OPERACIONES: string =
    'No se pudo obtener las operaciones del perfil';
  public static ERR_PERFIL_OPERACIONES_ENCONTRAR: string =
    'No se pudo encontrar las operaciones';
  public static ERR_PERFIL_OPERACIONES_RESTRINGIDAS: string =
    'No se pudo encontrar las operaciones restringidas del perfil';
  public static ERR_PERFIL_CREAR: string = 'No se pudo crear el perfil';
  public static ERR_PERFIL_EDITAR: string = 'No se pudo editar el perfil';
  public static ERR_PERFIL_AGREGAR_OPERACION: string =
    'No se pudo agregar la operación al perfil';
  public static ERR_PERFIL_ELIMINAR_OPERACION: string =
    'No se pudo eliminar la operación del perfil';
  public static ERR_PERFIL_ELIMINAR: string = 'No se pudo eliminar el perfil';
  public static ERR_OPERACION_CARGAR: string =
    'Error al cargar las operaciones.';
  public static ERR_OPERACION_GUARDAR: string =
    'Error al guardar la operación.';
  public static ERR_GRUPO_SUPERVISORES: string =
    'No se pudo obtener la lista de supervisores';
  public static ERR_GRUPO_COMPANIAS: string =
    'No se pudo obtener la lista de compañías';
  public static ERR_GRUPO_DATOS: string =
    'No se pudo obtener los datos del grupo';
  public static ERR_GRUPO_OPERACIONES: string =
    'No se pudo obtener las operaciones del grupo';
  public static ERR_GRUPO_OPERACIONES_ENCONTRAR: string =
    'No se pudo encontrar las operaciones';
  public static ERR_GRUPO_OPERACIONES_RESTRINGIDAS: string =
    'No se pudo encontrar las operaciones restringidas del grupo';
  public static ERR_GRUPO_CREAR: string = 'No se pudo crear el grupo';
  public static ERR_GRUPO_EDITAR: string = 'No se pudo editar el grupo';
  public static ERR_GRUPO_AGREGAR_OPERACION: string =
    'No se pudo agregar la operación al grupo';
  public static ERR_GRUPO_ELIMINAR_OPERACION: string =
    'No se pudo eliminar la operación del grupo';
  public static ERR_GRUPO_ELIMINAR: string = 'No se pudo eliminar el grupo';
  public static ERR_COMPANIA_PERMISOS: string =
    'No se pudo obtener los permisos';
  public static ERR_COMPANIA_OPERACIONES: string =
    'No se pudo obtener las operaciones';
  public static ERR_COMPANIA_PAISES: string = 'No se pudo encontrar los países';
  public static ERR_COMPANIA_DEPARTAMENTOS: string =
    'No se pudo encontrar los departamentos';
  public static ERR_COMPANIA_CIUDADES: string =
    'No se pudo encontrar las ciudades';
  public static ERR_COMPANIA_TAMANOS_ROTULO: string =
    'No se pudo encontrar los tamaños de rótulo';
  public static ERR_COMPANIA_DATOS: string =
    'No se pudo obtener los datos de la compañía';
  public static ERR_COMPANIA_ASOCIAR_PERMISO: string =
    'No se pudo asociar el permiso a la compañía';
  public static ERR_COMPANIA_RESTRINGIR_OPERACION: string =
    'No se pudo restringir la operación a la compañía';
  public static ERR_COMPANIA_EDITAR: string = 'No se pudo editar la compañía.';
  public static ERR_COMPANIA_CREAR: string = 'No se pudo crear la compañía.';
  public static ERR_COMPANIA_ELIMINAR: string =
    'No se pudo eliminar la compañía';
  public static ERR_CAMBIO_ESTADO_OPERACION: string =
    'Error cambiando estado de la operación.';
  public static ERR_INFO_ALMACENAR_LOGS_OBLIGATORIA: string =
    'Los campos Hora y fecha del evento, Operación realizada y Usuario que realizó la operación son obligatorios y no se pueden desactivar.';
  public static ERR_CAMBIO_ESTADO_LOG_INFO: string =
    'Error cambiando estado del log de información.';
  public static ERR_ACTUALIZANDO_CONFIG_LOGS: string =
    'Error actualizando configuración de logs.';
  public static ERR_OBTENIENDO_TIPO_IDENTIFICACION: string =
    'Error al obtener el tipo de identificación';
  public static ERR_CREAR_TIPO_IDENTIFICACION: string =
    'Error al crear el tipo de identificación';
  public static ERR_ACTUALIZAR_TIPO_IDENTIFICACION: string =
    'Error al actualizar el tipo de identificación';
  public static ERR_ELIMINAR_TIPO_IDENTIFICACION: string =
    'Error al eliminar el tipo de identificación';
  public static ERR_OBTENIENDO_COMPANIAS: string = 'Error al obtener compañías';
  public static ERR_BUSCAR_PERFILES: string = 'Error al buscar perfiles';
  public static ERR_BUSCAR_GRUPOS: string = 'Error al buscar grupos';
  public static ERR_LOGGEDOUT: string =
    'El usuario no esta autenticado en el sistema. La sesion fue cerrada por el usuario o por un administrador';
  public static ERR_NOUSERGROUPS_FOUND: string =
    'El usuario no tiene grupos asignados';
  public static ERR_BUSCAR_DATOS_CORPORATIVOS: string =
    'Error al buscar datos corporativos';
  public static ERR_SINC_ACTIVE_DIRECTORY: string =
    'Error al iniciar la sincronización.';
  public static ERR_USUARIO_DESACTIVAR_MASIVO: string =
    'Error al desactivar los usuarios';



  public static VAL_GENERATE_LOGS: string = 'genera Logs';
  public static VAL_DONT_GENERATE_LOGS: string = 'no genera Logs';
  public static VAL_LOG_HORA_FECHA_EVENTO: string = 'Hora y fecha del evento';
  public static VAL_LOG_OPERACION_REALIZADA: string = 'Operación realizada';
  public static VAL_LOG_USUARIO_REALIZA_OPERACION: string =
    'Usuario que realiza la operación';

  public static LBL_LOG_INFO_TIME: string = 'Hora y fecha del evento';
  public static LBL_LOG_INFO_OPERATION: string = 'Operación realizada';
  public static LBL_LOG_INFO_USER: string = 'Usuario que realiza la operación';
  public static LBL_LOG_INFO_DESCRIPTION: string =
    'Descripcion del evento ocurrido';
  public static LBL_LOG_INFO_IP: string = 'IP donde se hizo la operación';
  public static LBL_LOG_INFO_TYPE: string = 'Tipo de evento registrado';
  public static LBL_LOG_KEY_TIME: string = 'Time';
  public static LBL_LOG_KEY_DATE: string = 'Date';
  public static LBL_LOG_KEY_OPERATION: string = 'Operation';
  public static LBL_LOG_KEY_USER: string = 'User';
  public static LBL_LOG_KEY_DESCRIPTION: string = 'Description';
  public static LBL_LOG_KEY_IP: string = 'IP';
  public static LBL_LOG_KEY_TYPE: string = 'Type';

  public static EXCEL_MIME_TYPE: string =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  
    
}
