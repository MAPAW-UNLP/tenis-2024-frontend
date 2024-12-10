import { useEffect } from 'react'
import { useCrearReserva } from '../context/useCrearReserva'
import { compareHoras, getHorasMayoresA } from '../helpers/horas'

export default function InputHoraFin() {
  const { horaFinValue, horaInicioValue, updateField } = useCrearReserva()

  useEffect(() => {
    if (compareHoras(horaInicioValue.value, horaFinValue.value) > 0) {
      updateField('horaFinValue', '')
    }
  }, [horaFinValue.value, horaInicioValue.value, updateField])

  return (
    <div className="reserva-group">
      <label htmlFor="horaFin" className="reserva-group__label">
        Hora de fin
      </label>
      <select
        className="reserva-group__input"
        id="horaFin"
        name="horaFin"
        value={horaFinValue.value}
        onChange={(e) => updateField('horaFinValue', e.target.value)}
        disabled={horaInicioValue.value === ''}
      >
        <option value="" disabled>
          Fin
        </option>
        {getHorasMayoresA(horaInicioValue.value).map((hora) => (
          <option key={hora} value={hora}>
            {hora}
          </option>
        ))}
      </select>
    </div>
  )
}
