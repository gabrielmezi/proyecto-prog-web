import { useEffect, useState } from 'react'

import Campo from '../components/Campo'
import Mensaje from '../components/Mensaje'

export default function Login({ ingresar }) {
  const [correo, setCorreo] = useState(localStorage.getItem('correoRecordado') || '')
  const [clave, setClave] = useState('')
  const [mostrar, setMostrar] = useState(false)
  const [recordar, setRecordar] = useState(!!localStorage.getItem('correoRecordado'))
  const [intentos, setIntentos] = useState(0)
  const [bloqueo, setBloqueo] = useState(0)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const bloqueado = bloqueo !== 0
  const horaDesbloqueo = new Date(bloqueo).toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit'
  })

  useEffect(() => {
    if (!bloqueo) {
      return
    }

    const temporizador = setTimeout(() => {
      setBloqueo(0)
      setIntentos(0)
      setError('')
    }, Math.max(0, bloqueo - Date.now()))
    return () => clearTimeout(temporizador)
  }, [bloqueo])

  async function enviar(e) {
    e.preventDefault()

    if (cargando || bloqueado) {
      return
    }

    setCargando(true)
    setError('')
    await new Promise(resolve => setTimeout(resolve, 700))
    const valido = ingresar(correo.trim().toLowerCase(), clave)

    if (valido) {
      if (recordar) {
        localStorage.setItem('correoRecordado', correo.trim())
      } else {
        localStorage.removeItem('correoRecordado')
      }
      window.location.hash = '/mi-cuenta'
    } else {
      const total = intentos + 1
      setIntentos(total)
      if (total >= 5) {
        setBloqueo(Date.now() + 15 * 60 * 1000)
      } else {
        setError(`Correo o contraseña incorrectos. Te quedan ${5 - total} intentos antes del bloqueo temporal.`)
      }
    }
    setCargando(false)
  }

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div
        className="grid md:grid-cols-[minmax(0,440px)_minmax(0,320px)] gap-10 items-center w-full max-w-[800px]"
      >
        <form onSubmit={enviar} className="tarjeta">
          <h1 className="titulo">Iniciar sesión</h1>
          <p className="ayuda mb-6">Ingresa con tu correo institucional.</p>
          {error && (
            <Mensaje tipo="error">{error}</Mensaje>
          )}
          {bloqueado && (
            <Mensaje tipo="aviso">
              Cuenta bloqueada por 15 minutos tras cinco intentos fallidos. Podrás ingresar a las{' '}
              {horaDesbloqueo}{' '}
              o{' '}
              <a className="underline" href="#/recuperar">restablecer tu contraseña ahora</a>.
            </Mensaje>
          )}
          <fieldset disabled={cargando || bloqueado} className="space-y-5">
            <Campo
              nombre="correo"
              titulo="Correo institucional"
              type="email"
              autoComplete="username"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              required
            />
            <div>
              <label htmlFor="clave" className="etiqueta">Contraseña</label>
              <div className="relative">
                <input
                  id="clave"
                  className={'campo pr-20 ' + (error ? 'border-[#B4322B]' : '')}
                  type={mostrar ? 'text' : 'password'}
                  value={clave}
                  onChange={e => setClave(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrar(!mostrar)}
                  className="absolute right-3 top-2 enlace"
                >
                  {mostrar ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {error && (
                <p className="ayuda text-[#B4322B]">Verifica tus datos e inténtalo otra vez.</p>
              )}
            </div>

            <div className="flex justify-between gap-3 text-xs flex-wrap">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={recordar}
                  onChange={e => setRecordar(e.target.checked)}
                />
                Recordarme en este equipo
              </label>
              {cargando ? (
                <span>¿Olvidaste tu contraseña?</span>
              ) : (
                <a className="enlace" href="#/recuperar">¿Olvidaste tu contraseña?</a>
              )}
            </div>

            <button className="boton w-full" type="submit">
              {cargando ? 'Ingresando...' : 'Ingresar'}
            </button>
          </fieldset>

          <p className="text-center ayuda mt-5">
            ¿No tienes cuenta?{' '}
            {cargando ? 'Regístrate' : (
              <a href="#/registro" className="enlace">Regístrate</a>
            )}
          </p>
        </form>

        <aside>
          <h2 className="font-semibold mb-3">Acceso por rol</h2>
          <p className="text-sm text-[#5F6C78] leading-6">
            Usuarios de la comunidad ingresan con su correo. Técnicos y supervisores reciben una
            invitación del área de Infraestructura y definen su contraseña al aceptarla.
          </p>
          <p className="text-sm bg-[#E7EFF6] border-l-4 border-[#1F4E79] p-4 mt-4 text-[#1F4E79]">
            Tras cinco intentos fallidos la cuenta se bloquea por 15 minutos.
          </p>
          <a className="enlace inline-block mt-4" href="#/invitacion">Tengo una invitación</a>
        </aside>
      </div>

    </main>
  )
}
