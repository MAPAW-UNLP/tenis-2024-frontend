export default function InputTipoReserva() {
  return (
    <div className="reserva-group">
      <label htmlFor="tipoReserva" className="reserva-group__label">
        Tipo de reserva
      </label>
      <select
        className="reserva-group__input"
        id="tipoReserva"
        name="tipoReserva"
      >
        <option value="" disabled selected>
          Tipo de reserva
        </option>
        <option value="alquiler">Alquiler</option>
        <option value="clase">Clase</option>
      </select>
    </div>
  )
}
