import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'

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

const rutasSesion = ['/mi-cuenta', '/403', '/cola', '/mis-tickets', '/nuevo-ticket', '/encuestas', '/mis-encuestas']

function PaginaPublica({ children }) {
  return <div className="min-h-screen flex flex-col"><CabeceraPublica />{children}<PiePublico /></div>
}

function PaginaSesion({ usuario, salir, children }) {
  const location = useLocation()
  if (!usuario) return <Navigate to="/login" replace />
  return <EstructuraUsuario usuario={usuario} salir={salir} ruta={location.pathname}>{children}</EstructuraUsuario>
}

export default function App() {
  const [cuentas, setCuentas] = useState([])
  const [correoActivo, setCorreoActivo] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const usuario = cuentas.find(cuenta => cuenta.correo === correoActivo)

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' }))
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  function actualizarCuenta(correo, cambios) {
    setCuentas(actual => actual.map(cuenta => cuenta.correo === correo ? { ...cuenta, ...cambios } : cuenta))
  }
  function guardarUsuario(datos) { actualizarCuenta(correoActivo, datos) }
  function ingresar(correo, clave) {
    const cuenta = cuentas.find(item => item.correo === correo && item.clave === clave)
    if (!cuenta) return false
    setCorreoActivo(cuenta.correo)
    return true
  }
  function existeCorreo(correo) { return cuentas.some(cuenta => cuenta.correo === correo.trim().toLowerCase()) }
  function registrar(datos) {
    if (existeCorreo(datos.correo)) return false
    const cuenta = {
      nombres: datos.nombres.trim(), apellidos: datos.apellidos.trim(), correo: datos.correo.trim().toLowerCase(),
      telefono: datos.telefono, clave: datos.clave, carrera: datos.carrera, vinculo: datos.vinculo,
      rol: datos.rol, especialidades: datos.especialidades || [], creada: new Date().toLocaleDateString('es-PE'), ambiente: ''
    }
    setCuentas(actual => [...actual, cuenta])
    return true
  }
  function restablecer(correo, clave) {
    if (!existeCorreo(correo)) return false
    actualizarCuenta(correo, { clave })
    return true
  }
  function cambiarClave(actual, nueva) {
    if (usuario.clave !== actual) return false
    restablecer(usuario.correo, nueva)
    return true
  }
  function salir() { setCorreoActivo(''); navigate('/login') }

  return <Routes>
    <Route path="/" element={<PaginaPublica><Landing /></PaginaPublica>} />
    <Route path="/login" element={<PaginaPublica><Login ingresar={ingresar} /></PaginaPublica>} />
    <Route path="/registro" element={<PaginaPublica><Registro registrar={registrar} existeCorreo={existeCorreo} /></PaginaPublica>} />
    <Route path="/invitacion" element={<PaginaPublica><Invitacion registrar={registrar} /></PaginaPublica>} />
    <Route path="/recuperar" element={<PaginaPublica><Recuperar restablecer={restablecer} /></PaginaPublica>} />
    <Route path="/mi-cuenta" element={<PaginaSesion usuario={usuario} salir={salir}><MiCuenta usuario={usuario} guardarUsuario={guardarUsuario} cambiarClave={cambiarClave} /></PaginaSesion>} />
    {rutasSesion.filter(ruta => ruta !== '/mi-cuenta').map(ruta => <Route key={ruta} path={ruta} element={<PaginaSesion usuario={usuario} salir={salir}>{ruta === '/403' || ruta === '/cola' ? <ErrorPagina codigo={403} /> : <main className="flex-1 p-8"><h1 className="titulo">{ruta === '/mis-tickets' ? 'Mis tickets' : ruta === '/nuevo-ticket' ? 'Nuevo ticket' : 'Mis encuestas'}</h1><p className="text-[#5F6C78] mt-4">Esta sección se desarrolla en las siguientes historias.</p></main>}</PaginaSesion>} />)}
    <Route path="*" element={<PaginaPublica><ErrorPagina /></PaginaPublica>} />
  </Routes>
}
