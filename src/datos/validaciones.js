export function correoInstitucional(correo) {
  return /^[^\s@]+@(aloe\.)?ulima\.edu\.pe$/i.test(correo.trim())
}

export function claveSegura(clave) {
  const tieneMayuscula = /[A-Z]/.test(clave)
  const tieneNumero = /\d/.test(clave)

  return clave.length >= 8 && tieneMayuscula && tieneNumero
}
