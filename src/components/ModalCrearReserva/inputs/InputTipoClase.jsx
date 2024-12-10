import { useCrearReserva } from '../context/useCrearReserva'

export default function InputTipoClase() {
  const { tipoClaseValue, updateField } = useCrearReserva()

  return (
    <div className="reserva-group">
      <label htmlFor="tipoClase" className="reserva-group__label">
        Tipo de clase
      </label>
      <select
        className="reserva-group__input"
        id="tipoClase"
        name="tipoClase"
        value={tipoClaseValue.value}
        onChange={(e) => updateField('tipoClaseValue', e.target.value)}
      >
        <option value="" disabled>
          Tipo de clase
        </option>
        <option value="individual">Individual</option>
        <option value="grupal">Grupal</option>
      </select>
    </div>
  )
}
