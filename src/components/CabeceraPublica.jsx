import { Link } from 'react-router'
export default function CabeceraPublica() {
  return (
    <header
      className="min-h-[60px] flex items-center justify-between gap-5 px-6 py-3 bg-white border-b border-[#D6DEE5] flex-wrap"
    >
      <div className="flex items-center gap-2">
        <span className="bg-[#1F4E79] w-6 h-6 rounded-[4px]"></span>
        <Link to="/">
          <strong>Mesa de Ayuda</strong>
          <span className="text-[#5F6C78]"> · Campus Ulima</span>
        </Link>
      </div>

      <nav className="flex flex-wrap gap-4 text-sm">
        <Link to="/">Inicio</Link>
        <Link to="/#como-reportar">Cómo reportar</Link>
        <Link to="/#categorias">Categorías de servicio</Link>
        <Link to="/#tiempos">Tiempos de atención</Link>
      </nav>
      <div className="flex gap-2 text-sm">
        <Link to="/login" className="boton-secundario">Iniciar sesión</Link>
        <Link to="/registro" className="boton">Registrarme</Link>
      </div>

    </header>
  )
}
