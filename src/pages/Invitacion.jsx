import { useState } from 'react'

import Campo from '../components/Campo'
import Mensaje from '../components/Mensaje'

import { claveSegura } from '../datos/validaciones'

export default function Invitacion({ registrar }) {
  const supervisor = window.location.hash.includes('rol=supervisor')
  const rol = supervisor ? 'Supervisor' : 'Técnico'

  const [telefono, setTelefono] = useState('951 220 874')
  const [clave, setClave] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [especialidades, setEspecialidades] = useState(['Audiovisuales', 'Redes y conectividad'])
  const [error, setError] = useState('')
  const [resultado, setResultado] = useState('')

  const categorias = [
    'Audiovisuales',
    'Redes y conectividad',
    'Climatización',
    'Eléctrico',
    'Mobiliario',
    'Limpieza',
    'Accesos y cerraduras'
  ]

  function elegir(categoria) {
    if (especialidades.includes(categoria)) {
      setEspecialidades(especialidades.filter(item => item !== categoria))
    } else if (especialidades.length < 3) {
      setEspecialidades([...especialidades, categoria])
      setError('')
    } else {
      setError('Puedes elegir hasta tres categorías.')
    }
  }

  function rechazar() {
    setError('')
    setResultado('Invitación rechazada.')
  }

  function activar(e) {
    e.preventDefault()
    if (!claveSegura(clave)) {
      setError('La contraseña necesita 8 caracteres, una mayúscula y un número.')
      return
    }

    if (clave !== confirmar) {
      setError('Las contraseñas no coinciden.')
      return
    }

    if (!/^\d{9}$/.test(telefono.replace(/\s/g, ''))) {
      setError('Ingresa un teléfono de 9 dígitos.')
      return
    }

    if (!supervisor && !especialidades.length) {
      setError('Elige al menos una especialidad.')
      return
    }
    const registrado = registrar({
      nombres: 'Julio César',
      apellidos: 'Paredes Soto',
      correo: 'jparedes@ulima.edu.pe',
      telefono,
      clave,
      rol,
      especialidades,
      carrera: 'Infraestructura y Servicios',
      vinculo: 'Personal administrativo'
    })

    if (!registrado) {
      setError('Este correo ya tiene una cuenta. Inicia sesión para continuar.')
      return
    }

    setError('')
    setResultado('Cuenta activada. Ya puedes iniciar sesión.')
  }

  return (
    <main className="flex-1 px-6 py-8">
      <form onSubmit={activar} className="tarjeta max-w-[700px] mx-auto">
        <p
          className="inline-block text-xs text-[#D2601A] border border-[#D2601A] bg-orange-50 px-2 py-1 rounded-[4px] mb-3"
        >
          INVITACIÓN VÁLIDA HASTA EL 12/09/2026
        </p>
        <h1 className="titulo">Activa tu cuenta de {rol.toLowerCase()}</h1>
        <p className="ayuda mb-6">
          Lucía Mendoza Ríos te invitó a la Mesa de Ayuda. Revisa tus datos, define tu contraseña
          {!supervisor && ' y elige tu especialidad'}.
        </p>
        {error && (
          <Mensaje tipo="error">{error}</Mensaje>
        )}
        {resultado ? (
          <>
            <Mensaje>{resultado}</Mensaje>
            <a href="#/login" className="boton">Volver al acceso</a>
          </>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-5">
              <Campo
                nombre="invitado"
                titulo="Nombres y apellidos"
                value="Julio César Paredes Soto"
                disabled
                ayuda="Dato de la invitación, no editable."
              />

              <Campo
                nombre="correoInvitado"
                titulo="Correo institucional"
                value="jparedes@ulima.edu.pe"
                disabled
              />

              <Campo
                nombre="rol"
                titulo="Rol asignado"
                value={rol}
                disabled
              />

              <Campo
                nombre="telefonoInvitado"
                titulo="Teléfono de contacto"
                type="tel"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                required
              />

              <Campo
                nombre="claveInvitada"
                titulo="Contraseña"
                type="password"
                value={clave}
                onChange={e => setClave(e.target.value)}
                autoComplete="new-password"
                required
              />

              <Campo
                nombre="confirmarInvitada"
                titulo="Confirmar contraseña"
                type="password"
                value={confirmar}
                onChange={e => setConfirmar(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            {!supervisor && (
              <div className="mt-5">
                <p className="etiqueta">Especialidad · elige hasta tres categorías</p>
                <div className="flex flex-wrap gap-2">
                  {categorias.map(categoria => (
                    <label key={categoria} className="boton-secundario gap-2">
                      <input
                        type="checkbox"
                        checked={especialidades.includes(categoria)}
                        onChange={() => elegir(categoria)}
                      />
                      {categoria}
                    </label>
                  ))}
                </div>

              </div>
            )}
            <div className="flex gap-4 mt-5">
              <button className="boton">Activar mi cuenta</button>
              <button type="button" className="enlace" onClick={rechazar}>
                Rechazar invitación
              </button>
            </div>

          </>
        )}
      </form>

    </main>
  )
}
