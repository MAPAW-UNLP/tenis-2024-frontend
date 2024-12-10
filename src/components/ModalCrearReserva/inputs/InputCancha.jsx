import { useCrearReserva } from '../context/useCrearReserva'

export default function InputCancha() {
  const { canchas } = useCrearReserva()

  return (
    <div className="reserva-group">
      <label htmlFor="cancha" className="reserva-group__label">
        Cancha
      </label>
      <select
        className="reserva-group__input"
        id="cancha"
        name="cancha"
        disabled={canchas.isLoading}
      >
        {canchas.isLoading ? (
          <option value="" disabled selected>
            Cargando canchas...
          </option>
        ) : (
          <>
            <option value="" disabled selected>
              Cancha
            </option>
            {canchas.data.map((cancha) => (
              <option key={cancha.id}>{`${cancha.nombre}`}</option>
            ))}
          </>
        )}
      </select>
    </div>
  )
}
