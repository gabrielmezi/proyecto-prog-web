import { Link } from 'react-router'
import { useEffect, useState } from 'react'

import Campo from '../components/Campo'
import Mensaje from '../components/Mensaje'

import { correoInstitucional, claveSegura } from '../datos/validaciones'

export default function Recuperar({ restablecer }) {
  const [paso, setPaso] = useState(1)
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [espera, setEspera] = useState(45)
  const [enviado, setEnviado] = useState(0)
  const [error, setError] = useState('')
  const [guardado, setGuardado] = useState(false)

  useEffect(() => {
    if (paso !== 2 || espera === 0) {
      return
    }
    const temporizador = setTimeout(() => setEspera(espera - 1), 1000)
    return () => clearTimeout(temporizador)
  }, [paso, espera])

  function enviar(e) {
    e.preventDefault()
    if (!correoInstitucional(correo)) {
      setError('Ingresa un correo institucional válido.')
      return
    }
    setError('')
    setEnviado(Date.now())
    setEspera(45)
    setPaso(2)
  }

  function reenviar() {
    setEspera(45)
    setEnviado(Date.now())
  }

  function volverAlCorreo() {
    setPaso(1)
    setError('')
  }

  function guardar(e) {
    e.preventDefault()
    if (Date.now() - enviado > 30 * 60 * 1000) {
      setError('El enlace venció. Solicita uno nuevo.')
      return
    }

    if (!claveSegura(clave)) {
      setError('Mínimo 8 caracteres, con una mayúscula y un número.')
      return
    }

    if (clave !== confirmar) {
      setError('Las contraseñas no coinciden.')
      return
    }
    const actualizado = restablecer(correo.trim().toLowerCase(), clave)

    if (!actualizado) {
      setError('No se pudo cambiar la contraseña. Solicita un nuevo enlace o vuelve a registrarte.')
      return
    }

    setError('')
    setGuardado(true)
  }

  return (
    <main className="flex-1 flex items-center justify-center p-6 py-12">
      <section className="tarjeta w-full max-w-[560px]">
        <div className="flex gap-3 justify-between mb-6 text-xs text-[#5F6C78]">
          {['Tu correo', 'Enlace enviado', 'Nueva contraseña'].map((nombre, i) => (
            <span key={nombre} className={paso === i + 1 ? 'text-[#1F4E79] font-semibold' : ''}>
              <span
                className={'inline-block border rounded px-2 py-1 mr-1 ' + (paso === i + 1 ? 'bg-[#1F4E79] text-white' : '')}
              >
                {i + 1}
              </span>
              {nombre}
            </span>
          ))}
        </div>
        {error && (
          <Mensaje tipo="error">{error}</Mensaje>
        )}
        {paso === 1 && (
          <form onSubmit={enviar}>
            <h1 className="titulo">Recuperar mi contraseña</h1>
            <p className="ayuda mb-6">
              Te enviaremos un enlace de restablecimiento válido por 30 minutos.
            </p>
            <Campo
              nombre="correoRecuperar"
              titulo="Correo institucional"
              type="email"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              required
              ayuda="Si la cuenta existe recibirás el enlace; por seguridad no informamos lo contrario."
            />
            <div className="flex gap-4 mt-6">
              <button className="boton">Enviar enlace</button>
              <Link to="/login" className="enlace self-center">Volver a iniciar sesión</Link>
            </div>

          </form>
        )}
        {paso === 2 && (
          <div>
            <span
              className="inline-block border border-[#1E7F4D] rounded bg-[#EAF4ED] text-[#1E7F4D] px-3 py-2 mb-4"
            >
              ✓
            </span>
            <h1 className="titulo">Revisa tu correo</h1>
            <p className="text-[#5F6C78] mt-3 mb-5">
              Si la cuenta existe, recibirás un enlace en{' '}
              {correo}. Vence en 30 minutos.
            </p>
            <button
              type="button"
              disabled={espera > 0}
              className="enlace block mb-5"
              onClick={reenviar}
            >
              Reenviar enlace
              {espera > 0 && ` (disponible en 0:${String(espera).padStart(2, '0')})`}
            </button>
            <button className="boton" onClick={() => setPaso(3)}>
              Continuar a nueva contraseña
            </button>
          </div>
        )}
        {paso === 3 && guardado && (
          <>
            <h1 className="titulo mb-4">Contraseña actualizada</h1>
            <Mensaje>Ya puedes ingresar con tu nueva contraseña.</Mensaje>
            <Link className="boton" to="/login">Iniciar sesión</Link>
          </>
        )}

        {paso === 3 && !guardado && (
          <form onSubmit={guardar} className="space-y-5">
            <h1 className="titulo">Nueva contraseña</h1>
            <Campo
              nombre="claveNueva"
              titulo="Nueva contraseña"
              type="password"
              value={clave}
              onChange={e => setClave(e.target.value)}
              ayuda="Mínimo 8 caracteres, con una mayúscula y un número."
              autoComplete="new-password"
              required
            />
            <div className="flex gap-2 items-center">
              <span
                className={'h-1 flex-1 ' + (clave.length >= 8 ? 'bg-[#1E7F4D]' : 'bg-[#D6DEE5]')}
              ></span>
              <span
                className={'h-1 flex-1 ' + (/[A-Z]/.test(clave) ? 'bg-[#1E7F4D]' : 'bg-[#D6DEE5]')}
              ></span>
              <span
                className={'h-1 flex-1 ' + (/\d/.test(clave) ? 'bg-[#1E7F4D]' : 'bg-[#D6DEE5]')}
              ></span>
              <span className="text-xs text-[#5F6C78]">
                {claveSegura(clave) ? 'Segura' : 'Incompleta'}
              </span>
            </div>

            <Campo
              nombre="confirmarNueva"
              titulo="Confirmar"
              type="password"
              value={confirmar}
              onChange={e => setConfirmar(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button className="boton w-full">Guardar contraseña</button>
            <button type="button" className="enlace" onClick={volverAlCorreo}>
              Solicitar otro enlace
            </button>
          </form>
        )}
      </section>

    </main>
  )
}
