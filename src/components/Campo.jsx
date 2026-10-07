export default function Campo({ nombre, titulo, error, ayuda, ...props }) {
  return (
    <div>
      <label htmlFor={nombre} className="etiqueta">{titulo}</label>
      <input
        id={nombre}
        name={nombre}
        {...props}
        className={'campo ' + (error ? 'border-[#B4322B]' : '')}
        aria-invalid={!!error}
        aria-describedby={error || ayuda ? nombre + '-ayuda' : undefined}
      />
      {(error || ayuda) && (
        <p id={nombre + '-ayuda'} className={'ayuda ' + (error ? 'text-[#B4322B]' : '')}>
          {error || ayuda}
        </p>
      )}
    </div>
  )
}
