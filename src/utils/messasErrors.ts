
export enum errorForm {
    emailFormatInvalid= 'Foremato de corroe no valido',
    requiredFile = 'Este campo es requerido',
    matchesPass = 'La contraseña debe tenet al menos 8 caracteres, minúsculas y mayúsculas, núemeros y caracteres especiales '
}

export enum errorApi {
    failCreateData = 'Error al crear nuevo registro. No fue posible conectar con el servidor',
    failEditData = 'Error al editar el registro. No fue posible conectar con el servidor',
    failDeleteData ='Error al eliminar registro. No fue posible conectar con el servidor',
    failGetData = 'Error al cargar los datos. No fue posible conectar con el servidor',
    failAuth = 'Error de autenticacion. Usuario o contraseña incorrecta'
}
