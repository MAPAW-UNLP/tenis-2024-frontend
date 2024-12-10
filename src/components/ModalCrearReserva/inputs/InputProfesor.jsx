import { useCrearReserva } from '../context/useCrearReserva'

export default function InputProfesor() {
  const { profesores } = useCrearReserva()

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
      >
        {profesores.isLoading ? (
          <option value="" disabled selected>
            Cargando profesores...
          </option>
        ) : (
          <>
            <option value="" disabled selected>
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
