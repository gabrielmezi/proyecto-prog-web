import { useState } from 'react'

import Campo from '../components/Campo'
import Mensaje from '../components/Mensaje'

import { claveSegura } from '../datos/validaciones'

export default function MiCuenta({ usuario, guardarUsuario, cambiarClave }) {
  const [datos, setDatos] = useState({
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    telefono: usuario.telefono,
    carrera: usuario.carrera,
    ambiente: usuario.ambiente
  })
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  const [claves, setClaves] = useState({
    actual: '',
    nueva: '',
    confirmar: ''
  })
  const [mensajeClave, setMensajeClave] = useState('')
  const [errorClave, setErrorClave] = useState('')

  function cambiar(e) {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
    setMensaje('')
    setError('')
  }

  function descartar() {
    setDatos({
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      telefono: usuario.telefono,
      carrera: usuario.carrera,
      ambiente: usuario.ambiente
    })
    setError('')
    setMensaje('')
  }

  function cambiarContrasena(e) {
    setClaves({ ...claves, [e.target.name]: e.target.value })
  }

  function guardar(e) {
    e.preventDefault()
    if (!datos.nombres.trim() || !datos.apellidos.trim()) {
      setError('Completa tus nombres y apellidos.')
      return
    }

    if (!/^\d{9}$/.test(datos.telefono.replace(/\s/g, ''))) {
      setError('Ingresa un teléfono de 9 dígitos.')
      return
    }
    guardarUsuario(datos)
    setError('')
    setMensaje('Tus datos se guardaron correctamente.')
  }

  function actualizar(e) {
    e.preventDefault()
    setMensajeClave('')
    if (!claveSegura(claves.nueva)) {
      setErrorClave('La nueva contraseña necesita 8 caracteres, una mayúscula y un número.')
      return
    }

    if (claves.nueva !== claves.confirmar) {
      setErrorClave('Las contraseñas no coinciden.')
      return
    }

    if (!cambiarClave(claves.actual, claves.nueva)) {
      setErrorClave('La contraseña actual es incorrecta.')
      return
    }
    setErrorClave('')
    setClaves({
      actual: '',
      nueva: '',
      confirmar: ''
    })
    setMensajeClave('Contraseña actualizada correctamente.')
  }

  return (
    <main className="flex-1 p-5 lg:p-8">
      <h1 className="titulo">Mi cuenta</h1>
      <p className="ayuda mb-6">
        Tus datos se usan para contactarte durante la atención de un ticket.
      </p>
      <Mensaje>
        Hola, {usuario.nombres}. Tu cuenta está activa.
      </Mensaje>
      <div className="grid xl:grid-cols-[1fr_280px] gap-5 items-start">
        <section className="tarjeta">
          <form onSubmit={guardar}>
            <h2 className="font-semibold text-lg mb-5">Datos personales</h2>
            {mensaje && (
              <Mensaje>{mensaje}</Mensaje>
            )}
            {error && (
              <Mensaje tipo="error">{error}</Mensaje>
            )}
            <div className="grid md:grid-cols-2 gap-5">
              <Campo
                nombre="nombres"
                titulo="Nombres"
                value={datos.nombres}
                onChange={cambiar}
                required
              />

              <Campo
                nombre="apellidos"
                titulo="Apellidos"
                value={datos.apellidos}
                onChange={cambiar}
                required
              />

              <Campo
                nombre="correo"
                titulo="Correo institucional"
                value={usuario.correo}
                disabled
                ayuda="No editable."
              />

              <Campo
                nombre="telefono"
                titulo="Teléfono"
                type="tel"
                value={datos.telefono}
                onChange={cambiar}
                required
              />
              <div>
                <label htmlFor="carreraCuenta" className="etiqueta">Unidad o carrera</label>
                <select
                  id="carreraCuenta"
                  name="carrera"
                  value={datos.carrera}
                  onChange={cambiar}
                  className="campo"
                >
                  <option>Ingeniería de Sistemas</option>
                  <option>Administración</option>
                  <option>Comunicación</option>
                  <option>Derecho</option>
                  <option>Infraestructura y Servicios</option>
                </select>
              </div>

              <div>
                <label htmlFor="ambiente" className="etiqueta">Ambiente habitual</label>
                <select
                  id="ambiente"
                  name="ambiente"
                  value={datos.ambiente}
                  onChange={cambiar}
                  className="campo"
                >
                  <option value="">Selecciona un ambiente</option>
                  <option>A-201</option>
                  <option>A-305</option>
                  <option>H-210</option>
                  <option>Q-101</option>
                  <option>Biblioteca piso 2</option>
                </select>
              </div>

            </div>
            <div className="flex gap-4 mt-5">
              <button className="boton">Guardar cambios</button>
              <button type="button" className="enlace" onClick={descartar}>Descartar</button>
            </div>

          </form>
          <form onSubmit={actualizar} className="mt-6 pt-5 border-t border-[#D6DEE5]">
            <h2 className="font-semibold text-lg mb-5">Cambiar contraseña</h2>
            {mensajeClave && (
              <Mensaje>{mensajeClave}</Mensaje>
            )}
            {errorClave && (
              <Mensaje tipo="error">{errorClave}</Mensaje>
            )}
            <div className="grid lg:grid-cols-3 gap-3">
              <Campo
                nombre="actual"
                titulo="Actual"
                type="password"
                value={claves.actual}
                onChange={cambiarContrasena}
                autoComplete="current-password"
                required
              />
              <Campo
                nombre="nueva"
                titulo="Nueva"
                type="password"
                value={claves.nueva}
                onChange={cambiarContrasena}
                autoComplete="new-password"
                required
              />
              <Campo
                nombre="confirmar"
                titulo="Confirmar"
                type="password"
                value={claves.confirmar}
                onChange={cambiarContrasena}
                autoComplete="new-password"
                required
              />
            </div>

            <button className="boton mt-5">Actualizar contraseña</button>
          </form>

        </section>
        <aside className="space-y-4">
          <div className="tarjeta p-4">
            <div className="flex gap-3 items-center mb-4">
              <span className="bg-[#1F4E79] text-white rounded p-3 font-semibold">
                {usuario.nombres[0]}
                {usuario.apellidos[0]}
              </span>
              <div>
                <strong className="text-sm">{usuario.nombres} {usuario.apellidos}</strong>
                <p className="ayuda">{usuario.rol} · {usuario.vinculo}</p>
              </div>

            </div>
            <p className="flex justify-between ayuda border-b pb-2">
              Tickets reportados{' '}
              <strong className="text-[#141C24]">0</strong>
            </p>
            <p className="flex justify-between ayuda border-b py-2">
              Abiertos ahora{' '}
              <strong className="text-[#141C24]">0</strong>
            </p>
            <p className="flex justify-between ayuda pt-2">
              Cuenta creada{' '}
              <span className="text-[#141C24]">{usuario.creada}</span>
            </p>
          </div>

          <div
            className="border border-[#B7791F] bg-[#FFF5DF] rounded-[4px] p-4 text-[#B7791F] text-xs"
          >
            <h2 className="font-semibold mb-2">Encuestas</h2>
            <p className="leading-5">
              No tienes encuestas pendientes.
            </p>
          </div>

        </aside>
      </div>

    </main>
  )
}
