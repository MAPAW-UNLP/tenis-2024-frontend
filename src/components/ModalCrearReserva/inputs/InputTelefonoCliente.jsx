export default function InputTelefonoCliente() {
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
      />
    </div>
  )
}
