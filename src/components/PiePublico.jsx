export default function PiePublico() {
  return (
    <footer className="bg-[#163A5A] text-white px-6 py-8">
      <div className="max-w-[1200px] mx-auto grid gap-8 md:grid-cols-[2fr_1fr_2fr]">
        <div>
          <strong>Mesa de Ayuda de Servicios</strong>
          <p className="text-xs text-[#BDCEDD] mt-3">
            Universidad de Lima · Dirección de Infraestructura y Servicios
          </p>
          <p className="text-xs text-[#BDCEDD] mt-2">soporte.campus@ulima.edu.pe · anexo 30500</p>
          <p className="text-xs text-[#BDCEDD] mt-2">Atención de lunes a sábado, 07:00 a 21:00</p>
        </div>

        <div className="text-xs space-y-2">
          <p className="text-[#BDCEDD] tracking-wider">REPORTAR</p>
          <a className="block" href="#/login">Registrar un ticket</a>
          <a className="block" href="#/login">Seguir un ticket</a>
          <a className="block" href="#/#categorias">Categorías de servicio</a>
        </div>

        <div className="text-xs space-y-2">
          <p className="text-[#BDCEDD] tracking-wider">AYUDA</p>
          <a className="block" href="#/#como-reportar">Preguntas frecuentes</a>
          <a className="block" href="#/#tiempos">Tiempos de atención esperados</a>
          <p>Emergencias eléctricas · anexo 30111</p>
        </div>

      </div>
      <div className="max-w-[1200px] mx-auto text-right text-xs text-[#BDCEDD] mt-8">
        <p>© 2026 Universidad de Lima</p>
        <a href="#/terminos">Términos</a>{' '}
        ·{' '}
        <a href="#/privacidad">Privacidad</a>
      </div>

    </footer>
  )
}
