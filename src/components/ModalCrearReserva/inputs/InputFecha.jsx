import DatePicker from 'react-datepicker'

export default function InputFecha() {
  return (
    <div className="reserva-group">
      <label htmlFor="fecha" className="reserva-group__label">
        Fecha
      </label>
      <DatePicker
        id="fecha"
        dateFormat="dd/mm/yyyy"
        className="reserva-group__input"
        value="12/12/2024"
      />
    </div>
  )
}
