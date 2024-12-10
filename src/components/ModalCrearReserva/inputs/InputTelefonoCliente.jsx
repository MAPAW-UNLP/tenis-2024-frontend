import { useCrearReserva } from '../context/useCrearReserva'

export default function InputTelefonoCliente() {
  const { telefonoCliente, updateField } = useCrearReserva()

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
        value={telefonoCliente.value}
        onChange={(e) => updateField('telefonoCliente', e.target.value)}
      />
    </div>
  )
}
