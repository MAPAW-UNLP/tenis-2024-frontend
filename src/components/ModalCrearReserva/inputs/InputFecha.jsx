import DatePicker from 'react-datepicker'
import { useCrearReserva } from '../context/useCrearReserva'

export default function InputFecha() {
  const { fechaValue, updateField } = useCrearReserva()

  return (
    <div className="reserva-group">
      <label htmlFor="fecha" className="reserva-group__label">
        Fecha
      </label>
      <DatePicker
        className="reserva-group__input"
        id="fecha"
        placeholderText="Fecha"
        dateFormat="dd/MM/yyyy"
        locale="es"
        minDate={Date.now()}
        selected={fechaValue.value}
        onChange={(date) => updateField('fechaValue', date)}
      />
    </div>
  )
}
