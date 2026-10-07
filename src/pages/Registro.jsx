import { useState } from 'react'

import Campo from '../components/Campo'
import Mensaje from '../components/Mensaje'

import { correoInstitucional, claveSegura } from '../datos/validaciones'

export default function Registro({ registrar, existeCorreo }) {
  const [datos, setDatos] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    clave: '',
    confirmar: '',
    carrera: 'Ingeniería de Sistemas',
    vinculo: 'Alumna',
    terminos: false
  })

  const [errores, setErrores] = useState({})
  const [creado, setCreado] = useState(false)

  function cambiar(e) {
    const { name, value, type, checked } = e.target
    setDatos({
      ...datos,
      [name]: type === 'checkbox' ? checked : value
    })
    setErrores({
      ...errores,
      [name]: ''
    })
  }

  function validarCampo(nombre) {
    const nuevos = validar()
    setErrores({ ...errores, [nombre]: nuevos[nombre] })
  }

  function validar() {
    const nuevos = {}

    if (!datos.nombres.trim()) {
      nuevos.nombres = 'Ingresa tus nombres.'
    }

    if (!datos.apellidos.trim()) {
      nuevos.apellidos = 'Ingresa tus apellidos.'
    }

    if (!correoInstitucional(datos.correo)) {
      nuevos.correo = 'Usa tu correo institucional.'
    } else if (existeCorreo(datos.correo)) {
      nuevos.correo = 'Este correo ya tiene una cuenta.'
    }

    if (!/^\d{9}$/.test(datos.telefono.replace(/\s/g, ''))) {
      nuevos.telefono = 'Ingresa un teléfono de 9 dígitos.'
    }

    if (!claveSegura(datos.clave)) {
      nuevos.clave = 'Mínimo 8 caracteres, con una mayúscula y un número.'
    }

    if (!datos.confirmar || datos.clave !== datos.confirmar) {
      nuevos.confirmar = 'Las contraseñas no coinciden.'
    }

    if (!datos.terminos) {
      nuevos.terminos = 'Acepta los términos para continuar.'
    }

    return nuevos
  }

  function enviar(e) {
    e.preventDefault()

    const nuevos = validar()
    setErrores(nuevos)

    if (Object.keys(nuevos).length > 0) {
      return
    }

    const registrado = registrar({ ...datos, rol: 'Usuario' })
    if (registrado) setCreado(true)
  }

  if (creado) {
    return (
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="tarjeta max-w-[500px]">
          <h1 className="titulo mb-4">Tu cuenta está lista</h1>
          <Mensaje>Cuenta creada correctamente. Ya puedes iniciar sesión.</Mensaje>
          <a href="#/login" className="boton">Iniciar sesión</a>
        </div>

      </main>
    )
  }

  return (
    <main
      className="flex-1 max-w-[1100px] w-full mx-auto px-6 py-8 grid md:grid-cols-[2.3fr_1fr] gap-6 items-start"
    >
      <form onSubmit={enviar} noValidate className="tarjeta">
        <h1 className="titulo">Crear mi cuenta</h1>
        <p className="ayuda mb-6">Solo para miembros de la comunidad con correo institucional.</p>
        <div className="grid sm:grid-cols-2 gap-5">
          <Campo
            nombre="nombres"
            titulo="Nombres"
            value={datos.nombres}
            onChange={cambiar}
            error={errores.nombres}
            autoComplete="given-name"
          />

          <Campo
            nombre="apellidos"
            titulo="Apellidos"
            value={datos.apellidos}
            onChange={cambiar}
            error={errores.apellidos}
            autoComplete="family-name"
          />

          <Campo
            nombre="correo"
            titulo="Correo institucional"
            type="email"
            value={datos.correo}
            onChange={cambiar}
            onBlur={() => validarCampo('correo')}
            error={errores.correo}
            ayuda={correoInstitucional(datos.correo) && !existeCorreo(datos.correo) ? 'Correo válido y disponible.' : ''}
            autoComplete="email"
          />

          <Campo
            nombre="telefono"
            titulo="Teléfono"
            type="tel"
            value={datos.telefono}
            onChange={cambiar}
            error={errores.telefono}
            ayuda="Para coordinar el acceso al ambiente."
            autoComplete="tel"
          />

          <Campo
            nombre="clave"
            titulo="Contraseña"
            type="password"
            value={datos.clave}
            onChange={cambiar}
            onBlur={() => validarCampo('clave')}
            error={errores.clave}
            ayuda="Mínimo 8 caracteres, con una mayúscula y un número."
            autoComplete="new-password"
          />

          <Campo
            nombre="confirmar"
            titulo="Confirmar contraseña"
            type="password"
            value={datos.confirmar}
            onChange={cambiar}
            onBlur={() => validarCampo('confirmar')}
            error={errores.confirmar}
            autoComplete="new-password"
          />
          <div>
            <label htmlFor="carrera" className="etiqueta">Unidad o carrera</label>
            <select
              id="carrera"
              name="carrera"
              className="campo"
              value={datos.carrera}
              onChange={cambiar}
            >
              <option>Ingeniería de Sistemas</option>
              <option>Administración</option>
              <option>Comunicación</option>
              <option>Derecho</option>
              <option>Infraestructura y Servicios</option>
            </select>
          </div>

          <div>
            <label htmlFor="vinculo" className="etiqueta">Vínculo con la universidad</label>
            <select
              id="vinculo"
              name="vinculo"
              className="campo"
              value={datos.vinculo}
              onChange={cambiar}
            >
              <option>Alumna</option>
              <option>Alumno</option>
              <option>Docente</option>
              <option>Personal administrativo</option>
            </select>
          </div>

        </div>
        <label className="flex gap-2 items-center text-sm mt-5">
          <input
            name="terminos"
            type="checkbox"
            checked={datos.terminos}
            onChange={cambiar}
          />
          Acepto los términos del servicio y la política de privacidad.
        </label>
        {errores.terminos && (
          <p className="ayuda text-[#B4322B]">{errores.terminos}</p>
        )}
        <div className="flex gap-2 mt-5">
          <button className="boton">Crear cuenta</button>
          <a href="#/" className="boton-secundario">Cancelar</a>
        </div>

      </form>
      <aside className="tarjeta">
        <h2 className="font-semibold mb-3">Antes de registrarte</h2>
        <p className="text-sm text-[#5F6C78] leading-6">
          Si eres técnico o supervisor no uses este formulario: el área de Infraestructura te envía
          una invitación con tus datos precargados.
        </p>
        <p className="text-sm text-[#5F6C78] leading-6 border-t border-[#D6DEE5] mt-4 pt-4">
          Tu cuenta queda activa al completar el registro. Luego puedes iniciar sesión con tus datos.
        </p>
      </aside>
    </main>
  )
}
