export default function ReservaInputGroup({
  labelText,
  htmlFor,
  errors,
  children,
}) {
  return (
    <div
      className={`reserva-group ${errors.length > 0 ? 'reserva-group--error' : ''}`}
    >
      <label htmlFor={htmlFor} className="reserva-group__label">
        {labelText}
      </label>
      {children}
      {errors.map((error) => (
        <p key={error} className="reserva-group__error-desc">
          {error}
        </p>
      ))}
    </div>
  )
}
