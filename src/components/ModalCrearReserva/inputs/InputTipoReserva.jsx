import { useCrearReserva } from '../context/useCrearReserva'

export default function InputTipoReserva() {
  const { tipoReserva, updateField } = useCrearReserva()

  return (
    <div className="reserva-group">
      <label htmlFor="tipoReserva" className="reserva-group__label">
        Tipo de reserva
      </label>
      <select
        className="reserva-group__input"
        id="tipoReserva"
        name="tipoReserva"
        value={tipoReserva.value}
        onChange={(e) => updateField('tipoReserva', e.target.value)}
      >
        <option value="" disabled>
          Tipo de reserva
        </option>
        <option value="alquiler">Alquiler</option>
        <option value="clase">Clase</option>
      </select>
    </div>
  )
}
