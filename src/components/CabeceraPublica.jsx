export default function CabeceraPublica() {
  return (
    <header
      className="min-h-[60px] flex items-center justify-between gap-5 px-6 py-3 bg-white border-b border-[#D6DEE5] flex-wrap"
    >
      <div className="flex items-center gap-2">
        <span className="bg-[#1F4E79] w-6 h-6 rounded-[4px]"></span>
        <a href="#/">
          <strong>Mesa de Ayuda</strong>
          <span className="text-[#5F6C78]"> · Campus Ulima</span>
        </a>
      </div>

      <nav className="flex flex-wrap gap-4 text-sm">
        <a href="#/">Inicio</a>
        <a href="#/#como-reportar">Cómo reportar</a>
        <a href="#/#categorias">Categorías de servicio</a>
        <a href="#/#tiempos">Tiempos de atención</a>
      </nav>
      <div className="flex gap-2 text-sm">
        <a href="#/login" className="boton-secundario">Iniciar sesión</a>
        <a href="#/registro" className="boton">Registrarme</a>
      </div>

    </header>
  )
}
