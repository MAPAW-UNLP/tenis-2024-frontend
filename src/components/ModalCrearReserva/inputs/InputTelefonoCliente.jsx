import { useCrearReserva } from '../context/useCrearReserva'

export default function InputTelefonoCliente() {
  const { telefonoCliente, updateField } = useCrearReserva()

  function handleChange(e) {
    if (/^\d*$/.test(e.target.value)) {
      updateField('telefonoCliente', e.target.value)
    }
  }

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
        inputMode="numeric"
        placeholder="Teléfono del cliente"
        value={telefonoCliente.value}
        onChange={handleChange}
      />
    </div>
  )
}
