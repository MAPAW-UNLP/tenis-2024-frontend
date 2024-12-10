import { useEffect } from 'react'
import { useCrearReserva } from '../context/useCrearReserva'
import { compareHoras, getHorasMayoresA } from '../helpers/horas'

export default function InputHoraFin() {
  const { horaFin, horaInicio, updateField } = useCrearReserva()

  useEffect(() => {
    if (compareHoras(horaInicio.value, horaFin.value) > 0) {
      updateField('horaFin', '')
    }
  }, [horaFin.value, horaInicio.value, updateField])

  return (
    <div className="reserva-group">
      <label htmlFor="horaFin" className="reserva-group__label">
        Hora de fin
      </label>
      <select
        className="reserva-group__input"
        id="horaFin"
        name="horaFin"
        value={horaFin.value}
        onChange={(e) => updateField('horaFin', e.target.value)}
        disabled={horaInicio.value === ''}
      >
        <option value="" disabled>
          Fin
        </option>
        {getHorasMayoresA(horaInicio.value).map((hora) => (
          <option key={hora} value={hora}>
            {hora}
          </option>
        ))}
      </select>
    </div>
  )
}
