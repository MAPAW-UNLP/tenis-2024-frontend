import { useCrearReserva } from '../context/useCrearReserva'

export default function InputTelefonoCliente() {
  const { telefonoClienteValue, updateField } = useCrearReserva()

  return (
    <div className="reserva-group">
      <label htmlFor="telefonoCliente" className="reserva-group__label">
        Teléfono del cliente
      </label>
      <input
        className="reserva-group__input"
        id="telefonoCliente"
        name="telefonoCliente"
        type="text"
        placeholder="Teléfono del cliente"
        value={telefonoClienteValue.value}
        onChange={(e) => updateField('telefonoClienteValue', e.target.value)}
      />
    </div>
  )
}
