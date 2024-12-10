import { useCrearReserva } from '../context/useCrearReserva'

export default function InputTipoClase() {
  const { tipoClase, updateField } = useCrearReserva()

  return (
    <div className="reserva-group">
      <label htmlFor="tipoClase" className="reserva-group__label">
        Tipo de clase
      </label>
      <select
        className="reserva-group__input"
        id="tipoClase"
        name="tipoClase"
        value={tipoClase.value}
        onChange={(e) => updateField('tipoClase', e.target.value)}
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
