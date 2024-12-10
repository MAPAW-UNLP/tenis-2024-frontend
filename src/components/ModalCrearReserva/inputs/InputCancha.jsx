import { useCrearReserva } from '../context/useCrearReserva'
import ReservaInputGroup from '../ReservaInputGroup'

export default function InputCancha() {
  const { canchas, cancha, updateField } = useCrearReserva()

  return (
    <ReservaInputGroup
      htmlFor="cancha"
      labelText="Cancha"
      errors={cancha.errors}
    >
      <select
        className="reserva-group__input"
        id="cancha"
        name="cancha"
        disabled={canchas.isLoading}
        value={cancha.value}
        onChange={(e) => updateField('cancha', e.target.value)}
      >
        {canchas.isLoading ? (
          <option value={-1} disabled>
            Cargando canchas...
          </option>
        ) : (
          <>
            <option value={-1} disabled>
              Cancha
            </option>
            {canchas.data.map((cancha) => (
              <option
                key={cancha.id}
                value={cancha.id}
              >{`${cancha.nombre}`}</option>
            ))}
          </>
        )}
      </select>
    </ReservaInputGroup>
  )
}
