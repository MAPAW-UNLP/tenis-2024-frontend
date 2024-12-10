const horas = [
  '8:00',
  '8:30',
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
]

export default function InputHoraInicio() {
  return (
    <div className="reserva-group">
      <label htmlFor="horaInicio" className="reserva-group__label">
        Hora de inicio
      </label>
      <select
        className="reserva-group__input"
        id="horaInicio"
        name="horaInicio"
      >
        <option value="" disabled selected>
          Hora de inicio
        </option>
        {horas.map((hora) => (
          <option key={hora} value={hora}>
            {hora}
          </option>
        ))}
      </select>
    </div>
  )
}
