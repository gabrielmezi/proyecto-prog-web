import { useEffect, useState } from 'react'

import CabeceraPublica from './components/CabeceraPublica'
import PiePublico from './components/PiePublico'
import EstructuraUsuario from './components/EstructuraUsuario'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Invitacion from './pages/Invitacion'
import Recuperar from './pages/Recuperar'
import MiCuenta from './pages/MiCuenta'
import ErrorPagina from './pages/ErrorPagina'

function leerRuta() {
  return (window.location.hash.slice(1) || '/').split(/[?#]/)[0]
}

export default function App() {
  const [ruta, setRuta] = useState(leerRuta)
  const [cuentas, setCuentas] = useState([])
  const [correoActivo, setCorreoActivo] = useState('')

  const usuario = cuentas.find(cuenta => cuenta.correo === correoActivo)

  useEffect(() => {
    function navegar() {
      setRuta(leerRuta())
      const seccion = window.location.hash.split('#')[2]

      if (seccion) {
        setTimeout(() => {
          const elemento = document.getElementById(seccion)
          if (elemento) elemento.scrollIntoView({ behavior: 'smooth' })
        }, 0)
      } else {
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('hashchange', navegar)
    return () => window.removeEventListener('hashchange', navegar)
  }, [])

  function actualizarCuenta(correo, cambios) {
    setCuentas(actual =>
      actual.map(cuenta => {
        if (cuenta.correo === correo) {
          return { ...cuenta, ...cambios }
        }

        return cuenta
      })
    )
  }

  function guardarUsuario(datos) {
    actualizarCuenta(correoActivo, datos)
  }

  function ingresar(correo, clave) {
    const cuenta = cuentas.find(item => item.correo === correo && item.clave === clave)

    if (!cuenta) {
      return false
    }

    setCorreoActivo(cuenta.correo)
    return true
  }

  function registrar(datos) {
    if (existeCorreo(datos.correo)) return false

    const cuenta = {
      nombres: datos.nombres.trim(),
      apellidos: datos.apellidos.trim(),
      correo: datos.correo.trim().toLowerCase(),
      telefono: datos.telefono,
      clave: datos.clave,
      carrera: datos.carrera,
      vinculo: datos.vinculo,
      rol: datos.rol,
      especialidades: datos.especialidades || [],
      creada: new Date().toLocaleDateString('es-PE'),
      ambiente: ''
    }

    setCuentas([...cuentas, cuenta])
    return true
  }

  function restablecer(correo, clave) {
    if (!existeCorreo(correo)) return false

    actualizarCuenta(correo, { clave })
    return true
  }

  function existeCorreo(correo) {
    return cuentas.some(cuenta => cuenta.correo === correo.trim().toLowerCase())
  }

  function cambiarClave(actual, nueva) {
    if (usuario.clave !== actual) {
      return false
    }

    restablecer(usuario.correo, nueva)
    return true
  }

  function salir() {
    setCorreoActivo('')
    window.location.hash = '/login'
  }

  const rutasSesion = [
    '/mi-cuenta',
    '/403',
    '/cola',
    '/mis-tickets',
    '/nuevo-ticket',
    '/encuestas',
    '/mis-encuestas'
  ]
  if (usuario && rutasSesion.includes(ruta)) {
    let pagina

    if (ruta === '/mi-cuenta') {
      pagina = <MiCuenta usuario={usuario} guardarUsuario={guardarUsuario} cambiarClave={cambiarClave} />
    } else if (ruta === '/403' || ruta === '/cola') {
      pagina = <ErrorPagina codigo={403} />
    } else {
      let titulo = 'Mis encuestas'

      if (ruta === '/mis-tickets') {
        titulo = 'Mis tickets'
      } else if (ruta === '/nuevo-ticket') {
        titulo = 'Nuevo ticket'
      }
      pagina = (
        <main className="flex-1 p-8">
          <h1 className="titulo">{titulo}</h1>
          <p className="text-[#5F6C78] mt-4">
            Esta sección se desarrolla en las siguientes historias.
          </p>
          <a href="#/mi-cuenta" className="boton mt-5">Volver a mi cuenta</a>
        </main>
      )
    }
    return (
      <EstructuraUsuario usuario={usuario} salir={salir} ruta={ruta}>{pagina}</EstructuraUsuario>
    )
  }

  let pagina

  if (ruta === '/') {
    pagina = <Landing />
  } else if (ruta === '/login' || rutasSesion.includes(ruta)) {
    pagina = <Login ingresar={ingresar} />
  } else if (ruta === '/registro') {
    pagina = <Registro registrar={registrar} existeCorreo={existeCorreo} />
  } else if (ruta === '/invitacion') {
    pagina = <Invitacion registrar={registrar} />
  } else if (ruta === '/recuperar') {
    pagina = <Recuperar restablecer={restablecer} />
  } else {
    pagina = <ErrorPagina />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CabeceraPublica />
      {pagina}
      <PiePublico />
    </div>
  )
}
