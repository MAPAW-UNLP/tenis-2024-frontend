import { useCrearReserva } from './context/useCrearReserva'
import InputCancha from './inputs/InputCancha'
import InputFecha from './inputs/InputFecha'
import InputHoraFin from './inputs/InputHoraFin'
import InputHoraInicio from './inputs/InputHoraInicio'
import InputNombreCliente from './inputs/InputNombreCliente'
import InputProfesor from './inputs/InputProfesor'
import InputTelefonoCliente from './inputs/InputTelefonoCliente'
import InputTipoClase from './inputs/InputTipoClase'
import InputTipoReserva from './inputs/InputTipoReserva'

export default function CrearReservaContent() {
  return (
    <div className="modal-crear-reserva">
      <InputFecha />
      <InputHoraInicio />
      <InputHoraFin />
      <InputCancha />
      <InputTipoReserva />

      <InputNombreCliente />
      <InputTelefonoCliente />

      <InputProfesor />
      <InputTipoClase />

      <hr />

      <div className="reserva-group">
        <label htmlFor="inputId" className="reserva-group__label">
          Label
        </label>
        <input
          className="reserva-group__input"
          id="inputId"
          name="inputId"
          type="text"
          placeholder="placeholder"
          value="Este es un texto"
        />
      </div>
    </div>
  )
}
