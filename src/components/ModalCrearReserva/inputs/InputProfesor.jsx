import { useCrearReserva } from '../context/useCrearReserva'

export default function InputProfesor() {
  const { profesores, profesorValue, updateField } = useCrearReserva()

  return (
    <div className="reserva-group">
      <label htmlFor="reserva-profesor" className="reserva-group__label">
        Profesor
      </label>
      <select
        className="reserva-group__input"
        id="reserva-profesor"
        name="reserva-profesor"
        disabled={profesores.isLoading}
        value={profesorValue.value}
        onChange={(e) => updateField('profesorValue', e.target.value)}
      >
        {profesores.isLoading ? (
          <option value="" disabled>
            Cargando profesores...
          </option>
        ) : (
          <>
            <option value="" disabled>
              Profesor
            </option>
            {profesores.data.map((profesor) => (
              <option key={profesor.id}>{`${profesor.nombre}`}</option>
            ))}
          </>
        )}
      </select>
    </div>
  )
}
