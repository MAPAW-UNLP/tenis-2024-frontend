import { useCrearReserva } from '../context/useCrearReserva'

export default function InputNombreCliente() {
  const { nombreClienteValue, updateField } = useCrearReserva()

  return (
    <div className="reserva-group">
      <label htmlFor="nombreCliente" className="reserva-group__label">
        Nombre del cliente
      </label>
      <input
        className="reserva-group__input"
        id="nombreCliente"
        name="nombreCliente"
        type="text"
        placeholder="Nombre del cliente"
        value={nombreClienteValue.value}
        onChange={(e) => updateField('nombreClienteValue', e.target.value)}
      />
    </div>
  )
}
