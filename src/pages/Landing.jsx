import { Link } from 'react-router'
export default function Landing() {
  return (
    <main className="max-w-[1200px] w-full mx-auto px-6 py-8 flex-1">
      <section className="tarjeta grid gap-8 md:grid-cols-[1.4fr_1fr] items-center">
        <div>
          <p className="text-xs tracking-widest text-[#D2601A] mb-4">
            INFRAESTRUCTURA Y SERVICIOS DEL CAMPUS
          </p>
          <h1 className="text-[36px] leading-tight font-semibold max-w-[540px]">
            Reporta una falla del campus y sigue su atención en un solo lugar
          </h1>
          <p className="text-[#5F6C78] mt-5 max-w-[520px] leading-6">
            Proyectores, aire acondicionado, red, mobiliario, electricidad, limpieza y accesos.
            Registra el ticket con el ambiente y la categoría; el supervisor lo prioriza y lo asigna
            a un técnico el mismo día.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            <Link to="/login" className="boton">Registrar un ticket</Link>
            <Link to="/#como-reportar" className="boton-secundario">Ver cómo reportar</Link>
          </div>

        </div>
        <div
          className="h-[280px] border border-[#D6DEE5] flex items-center justify-center text-xs text-[#5F6C78] text-center px-4"
          style={{
            background: 'repeating-linear-gradient(45deg, #F4F6F8, #F4F6F8 8px, #EAF0F5 8px, #EAF0F5 16px)'
          }}
        >
          [ foto: técnico atendiendo un aula ]
        </div>

      </section>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        <section id="categorias" className="tarjeta border-t-2 border-t-[#1F4E79] p-4">
          <h2 className="font-semibold">Qué se reporta</h2>
          <p className="ayuda leading-5">
            Audiovisuales, climatización, redes, mobiliario, eléctrico, limpieza y cerraduras.
          </p>
        </section>

        <section id="como-reportar" className="tarjeta border-t-2 border-t-[#1F4E79] p-4">
          <h2 className="font-semibold">Cómo se prioriza</h2>
          <p className="ayuda leading-5">
            Crítica, alta, media y baja según el impacto en clases y en la seguridad.
          </p>
        </section>

        <section id="tiempos" className="tarjeta border-t-2 border-t-[#1F4E79] p-4">
          <h2 className="font-semibold">Tiempo de atención</h2>
          <p className="ayuda leading-5">
            Crítica 2 h · alta 8 h · media 24 h · baja 72 h hábiles.
          </p>
        </section>

        <section className="tarjeta bg-[#E7EFF6] border-[#1F4E79] p-4">
          <h2 className="font-semibold text-[#1F4E79]">Emergencias</h2>
          <p className="ayuda leading-5 text-[#1F4E79]">
            Fugas de agua o riesgo eléctrico: llama al anexo 30111 y registra el ticket después.
          </p>
        </section>

      </div>
    </main>
  )
}
