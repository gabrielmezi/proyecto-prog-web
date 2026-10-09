import { Link } from 'react-router'
export default function ErrorPagina({ codigo = 404 }) {
  const denegado = codigo === 403

  return (
    <main className="flex-1 flex items-center justify-center p-6 py-16">
      <section className="tarjeta text-center max-w-[680px] w-full py-10">
        <span
          className={denegado ? 'inline-block border border-[#B4322B] text-[#B4322B] bg-[#FBEDEC] p-2 rounded mb-4 text-xl' : 'block text-5xl text-[#1F4E79] font-semibold mb-4'}
        >
          {codigo}
        </span>
        <h1 className="text-2xl font-semibold">
          {denegado ? 'No tienes permiso para ver la cola de atención' : 'No encontramos esta página'}
        </h1>
        <p className="text-sm text-[#5F6C78] leading-6 mt-3">
          {denegado ? 'Tu cuenta tiene el rol de usuario. La cola, la asignación y el catálogo de servicios son exclusivos del supervisor. Si necesitas ese acceso, solicítalo a Infraestructura y Servicios.' : 'El enlace puede haber cambiado. Si buscabas un ticket, ingresa su código en el buscador de la cabecera.'}
        </p>
        <div className="flex justify-center flex-wrap gap-2 mt-5">
          <Link className="boton" to={denegado ? '/mis-tickets' : '/'}>
            {denegado ? 'Ir a mis tickets' : 'Ir al inicio'}
          </Link>
          <a
            className="boton-secundario"
            href={denegado ? 'mailto:soporte.campus@ulima.edu.pe?subject=Solicitud%20de%20acceso' : '/login'}
          >
            {denegado ? 'Solicitar acceso' : 'Buscar un ticket'}
          </a>
        </div>

      </section>
    </main>
  )
}
