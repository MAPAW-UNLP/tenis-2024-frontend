import { useState } from 'react'
import moment from 'moment'
import '../../styles/alquilerDetail.css'

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCheck } from '@fortawesome/free-solid-svg-icons'
import EditFechaYHoraController from './EditFechaYHoraController'
import Modal from 'components/Modal/Modal'

const dias = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
]

const AlquilerDetails = ({ isVisible, onClose, reserva, setReservaDetail }) => {
  const [active, setActive] = useState()

  const [horaInicio, setHoraInicio] = useState('')
  const [horaFinal, setHoraFinal] = useState('')
  const [diaElegido, setDiaElegido] = useState('')

  if (reserva.canchaNombre == null) return

  const clasePasada = (fecha) => {
    return fecha.split('-').join('') < moment(new Date()).format('YYYYMMDD')
  }

  const formateoFecha = (fecha) => {
    const numeroDia = new Date(fecha).getDay()
    const nombreDia = dias[numeroDia]
    const destructFecha = fecha.split('-')
    return `${nombreDia} ${destructFecha[2]}/${destructFecha[1]}`
  }

  const setClassActive = () => {
    setActive(true)
    const background = document.getElementById('alquiler-detail-futuro')
    const componente = document.getElementById('btn-background')
    console.log(componente)
    background.classList.add('active')
    componente.classList.add('active')
  }

  const cerrarEdicion = () => {
    setActive(false)
    const componente = document.getElementById('btn-background')
    const background = document.getElementById('alquiler-detail-futuro')
    background.classList.remove('active')
    componente.classList.remove('active')
  }

  const cerrarDetalles = () => {
    cerrarEdicion()
    setReservaDetail({})
    setHoraFinal('')
    setHoraInicio('')
    setDiaElegido('')
  }

  function hanldeClose() {
    if (clasePasada(reserva.fecha)) {
      setReservaDetail({})
    } else {
      cerrarDetalles()
    }
    onClose()
  }

  return (
    <Modal title="Alquiler" isVisible={isVisible} onClose={hanldeClose}>
      <div id="alquiler-detail-component">
        {clasePasada(reserva.fecha) ? (
          <div id="alquiler-detail-general" class="clase-caja-alq">
            <h2>Cancha: {reserva.canchaNombre}</h2>
            <p id="alquiler-detail-fecha">{formateoFecha(reserva.fecha)}</p>
            <p id="alquiler-detail-hora">
              {reserva.horaIni} - {reserva.horaFin}
            </p>
          </div>
        ) : (
          <div id="alquiler-detail-futuro" class="clase-caja-alq">
            <h2>Cancha: {reserva.canchaNombre}</h2>
            {active ? (
              <div id="alquiler-detail-contenido">
                <div id="alquiler-detail-texto">
                  <p id="alquiler-detail-fecha">
                    {diaElegido === ''
                      ? formateoFecha(reserva.fecha)
                      : formateoFecha(diaElegido)}
                  </p>
                  <p id="alquiler-detail-hora">
                    {horaInicio === '' ? reserva.horaIni : horaInicio} -{' '}
                    {horaFinal === '' ? reserva.horaFin : horaFinal}
                  </p>
                </div>
                <div id="btn-background">
                  <EditFechaYHoraController
                    reserva={reserva}
                    setHoraInicio={setHoraInicio}
                    horaInicio={horaInicio}
                    setHoraFinal={setHoraFinal}
                    horaFinal={horaFinal}
                    diaElegido={diaElegido}
                    setDiaElegido={setDiaElegido}
                  />
                  <button id="alquiler-detail-edit-btn" onClick={cerrarEdicion}>
                    {' '}
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </div>
              </div>
            ) : (
              <div id="alquiler-detail-contenido">
                <div id="alquiler-detail-texto">
                  <p id="alquiler-detail-fecha">
                    {diaElegido === ''
                      ? formateoFecha(reserva.fecha)
                      : formateoFecha(diaElegido)}
                  </p>
                  <p id="alquiler-detail-hora">
                    {horaInicio === '' ? reserva.horaIni : horaInicio} -{' '}
                    {horaFinal === '' ? reserva.horaFin : horaFinal}
                  </p>
                </div>
                <div id="btn-background">
                  <button
                    id="alquiler-detail-edit-btn"
                    onClick={setClassActive}
                  >
                    {' '}
                    <FontAwesomeIcon icon={faCalendar} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <div id="alquiler-detail-detail" className="clase-caja-alq">
          <h3>Cliente info</h3>
          <p className="alquiler-detail-nombre">
            Cliente: {reserva.titular.nombre}
          </p>
          <p className="alquiler-detail-numeros">
            {' '}
            Teléfono: {reserva.titular.telefono}
          </p>
        </div>
        {clasePasada(reserva.fecha) ? (
          ''
        ) : (
          <div id="alquiler-detail-btns">
            <button id="alquiler-detail-guardar">Guardar</button>
            <button id="alquiler-detail-cancelar" onClick={cerrarDetalles}>
              Cancelar
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default AlquilerDetails
