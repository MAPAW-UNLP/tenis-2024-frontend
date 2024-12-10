import Button from 'components/Button/Button'
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
    <form className="modal-crear-reserva">
      <InputFecha />
      <div className="reserva-horas">
        <InputHoraInicio />
        <InputHoraFin />
      </div>
      <InputCancha />

      <InputTipoReserva />

      {tipoReservaValue.value !== '' && (
        <>
          <hr className="reserva-hr" />
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

          <Button style={{ marginTop: '1rem', padding: '0.5rem' }}>
            Crear {tipoReservaValue.value}
          </Button>
        </>
      )}
    </form>
  )
}
