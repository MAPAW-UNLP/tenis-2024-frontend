import { useCrearReserva } from '../context/useCrearReserva'
import { horas } from '../helpers/horas'

export default function InputHoraInicio() {
  const { horaInicio, updateField } = useCrearReserva()

  return (
    <div className="reserva-group">
      <label htmlFor="horaInicio" className="reserva-group__label">
        Hora de inicio
      </label>
      <select
        className="reserva-group__input"
        id="horaInicio"
        name="horaInicio"
        value={horaInicio.value}
        onChange={(e) => updateField('horaInicio', e.target.value)}
      >
        <option value="" disabled>
          Inicio
        </option>
        {/* horas.slice(0, -1) -> devuelve el arreglo sin el último valor */}
        {horas.slice(0, -1).map((hora) => (
          <option key={hora} value={hora}>
            {hora}
          </option>
        ))}
      </select>
    </div>
  )
}
