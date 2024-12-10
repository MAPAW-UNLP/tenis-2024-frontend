export default function InputTipoClase() {
  return (
    <div className="reserva-group">
      <label htmlFor="tipoClase" className="reserva-group__label">
        Tipo de clase
      </label>
      <select className="reserva-group__input" id="tipoClase" name="tipoClase">
        <option value="" disabled selected>
          Tipo de clase
        </option>
        <option value="individual">Individual</option>
        <option value="grupal">Grupal</option>
      </select>
    </div>
  )
}
