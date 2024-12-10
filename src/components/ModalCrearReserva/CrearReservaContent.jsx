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
  const { tipoReservaValue } = useCrearReserva()

  return (
    <div className="modal-crear-reserva">
      <InputFecha />
      <InputHoraInicio />
      <InputHoraFin />
      <InputCancha />
      <br />
      <InputTipoReserva />

      {tipoReservaValue.value === 'alquiler' ? (
        <>
          <InputNombreCliente />
          <InputTelefonoCliente />
        </>
      ) : tipoReservaValue.value === 'clase' ? (
        <>
          <InputProfesor />
          <InputTipoClase />
        </>
      ) : null}
    </div>
  )
}
