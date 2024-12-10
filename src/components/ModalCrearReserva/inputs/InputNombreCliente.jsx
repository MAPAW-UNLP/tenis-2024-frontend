import { useCrearReserva } from '../context/useCrearReserva'

export default function InputNombreCliente() {
  const { nombreCliente, updateField } = useCrearReserva()

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
        value={nombreCliente.value}
        onChange={(e) => updateField('nombreCliente', e.target.value)}
      />
    </div>
  )
}
