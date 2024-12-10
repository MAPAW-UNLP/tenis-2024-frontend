export default function InputNombreCliente() {
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
      />
    </div>
  )
}
