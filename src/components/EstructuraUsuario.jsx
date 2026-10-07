export default function EstructuraUsuario({ usuario, salir, ruta, children }) {
  const iniciales = usuario.nombres[0] + usuario.apellidos[0]

  function buscarTicket(e) {
    e.preventDefault()
    window.location.hash = '/404'
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="bg-[#1F4E79] text-white flex flex-wrap items-center gap-5 px-5 py-3 min-h-[60px]"
      >
        <a href="#/mi-cuenta" className="flex items-center gap-2 font-semibold">
          <span className="w-5 h-5 bg-white rounded"></span>
          Mesa de Ayuda
        </a>
        <form className="flex-1 max-w-[440px]" onSubmit={buscarTicket}>
          <input
            className="w-full rounded border border-white/30 bg-white/15 px-3 py-2 text-xs placeholder:text-white/80"
            placeholder="Buscar por código de ticket · TCK-2026-…"
            aria-label="Buscar por código de ticket"
            required
          />
        </form>

        <div className="ml-auto flex items-center gap-4 text-xs">
          <span className="bg-white/15 px-3 py-2 rounded">
            MIS TICKETS ABIERTOS{' '}
            <strong>0</strong>
          </span>
          <div className="text-right">
            <p>{usuario.nombres} {usuario.apellidos}</p>
            <p className="uppercase tracking-wider text-[10px]">{usuario.rol}</p>
          </div>

          <span className="bg-[#D2601A] rounded px-2 py-2 font-semibold">{iniciales}</span>
        </div>

      </header>
      <div className="flex flex-1">
        <aside
          className="w-[190px] lg:w-[236px] shrink-0 bg-white border-r border-[#D6DEE5] px-3 py-5 flex flex-col"
        >
          <p className="etiqueta px-2 mb-3">Mis servicios</p>
          <nav className="space-y-1 text-sm">
            <a href="#/mi-cuenta" className="block px-2 py-2">Inicio</a>
            <a href="#/nuevo-ticket" className="block px-2 py-2">Nuevo ticket</a>
            <a href="#/mis-tickets" className="flex justify-between px-2 py-2">
              Mis tickets{' '}
              <span className="ayuda">0</span>
            </a>
            <a href="#/encuestas" className="flex justify-between px-2 py-2">
              Encuesta pendiente{' '}
              <span className="ayuda">0</span>
            </a>
            <a href="#/mis-encuestas" className="flex justify-between px-2 py-2">
              Mis encuestas{' '}
              <span className="ayuda">0</span>
            </a>
            <a
              href="#/mi-cuenta"
              className={'block px-2 py-2 rounded ' + (ruta === '/mi-cuenta' ? 'bg-[#E7EFF6] text-[#1F4E79] border-l-2 border-[#1F4E79]' : '')}
            >
              Mi cuenta
            </a>
          </nav>
          <div className="mt-auto border-t border-[#D6DEE5] pt-4 text-xs space-y-3">
            <a href="#/mi-cuenta" className="block">Mi cuenta</a>
            <button onClick={salir}>Cerrar sesión</button>
          </div>

        </aside>
        <div className="flex flex-col flex-1 min-w-0">
          {children}
          <footer
            className="mt-auto bg-white border-t border-[#D6DEE5] px-5 py-3 text-xs text-[#5F6C78] flex flex-wrap justify-between gap-2"
          >
            <p>Mesa de Ayuda de Servicios del Campus · Universidad de Lima</p>
            <p>
              soporte.campus@ulima.edu.pe · anexo 30500 ·{' '}
              <a href="#/terminos">Términos</a>{' '}
              ·{' '}
              <a href="#/privacidad">Privacidad</a>
            </p>
          </footer>
        </div>

      </div>
    </div>
  )
}
