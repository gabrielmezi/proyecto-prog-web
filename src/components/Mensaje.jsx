export default function Mensaje({ children, tipo = 'exito' }) {
  const colores = {
    exito: 'border-[#1E7F4D] bg-[#EAF4ED] text-[#1E7F4D]',
    error: 'border-[#B4322B] bg-[#FBEDEC] text-[#B4322B]',
    aviso: 'border-[#B7791F] bg-[#FFF5DF] text-[#B7791F]'
  }

  return (
    <div role="status" className={'border rounded-[4px] p-3 text-sm mb-4 ' + colores[tipo]}>
      {children}
    </div>
  )
}
