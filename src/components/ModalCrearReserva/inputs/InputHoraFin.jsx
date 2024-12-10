const horas = [
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
  '21:00',
]

export default function InputHoraFin() {
  return (
    <div className="reserva-group">
      <label htmlFor="horaFin" className="reserva-group__label">
        Hora de fin
      </label>
      <select className="reserva-group__input" id="horaFin" name="horaFin">
        <option value="" disabled selected>
          Hora de fin
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
