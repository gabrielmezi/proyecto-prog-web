const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'como-reportar', label: 'Cómo reportar' },
  { id: 'categorias-de-servicio', label: 'Categorías de servicio' },
  { id: 'tiempos-de-atencion', label: 'Tiempos de atención' },
];

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-[#D6DEE5]">
      <div className="max-w-[1530px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        
        {/* Branding (Logo + Título) */}
        <div className="flex items-center space-x-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUHVtF5JCSUNJBcYVQoN-T9L_H2ueM8X-4CVk7MvHZSw&s=10"
            alt="Logo Mesa de Ayuda Ulima"
            className="w-8 h-8 rounded-lg object-cover"
            loading="eager"
          />
          <div className="flex items-center space-x-1 text-base">
            <span className="font-bold text-gray-900">Mesa de ayuda</span>
            <span className="text-[#5F6C78]" aria-hidden="true">·</span>
            <span className="text-[#5F6C78]">Campus Ulima</span>
          </div>
        </div>

        {/* Links de Navegación */}
        <nav aria-label="Navegación principal">
          <ul className="flex flex-wrap items-center space-x-4 text-base">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  id={item.id}
                  type="button"
                  className="hover:drop-shadow-lg hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1F4E79] focus:ring-offset-2 rounded-sm transition-all"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botones de Acción */}
        <div className="flex items-center space-x-4">
          <button
            id="iniciar-sesion"
            type="button"
            className="bg-white border border-[#1F4E79] text-[#1F4E79] px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1F4E79] focus:ring-offset-2 transition-all"
          >
            Iniciar sesión
          </button>
          <button
            id="registrarme"
            type="button"
            className="bg-[#1F4E79] border border-[#1F4E79] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-[#1F4E79] focus:ring-offset-2 transition-all"
          >
            Registrarme
          </button>
        </div>

      </div>
    </header>
  );
}