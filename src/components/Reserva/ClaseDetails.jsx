import React, { useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlusCircle,
  faCalendar,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

// Components
import Modal from 'components/Modal/Modal'
import EditFechaYHoraController from './EditFechaYHoraController'
import SelectorDeAlumnosDeClase from './SelectorDeAlumnosDeClase'

// Styles
import '../../styles/claseDetail.css'

const ClaseDetails = ({ isVisible, onClose, reserva }) => {
  const [active, setActive] = useState(false)
  const [horaInicio, setHoraInicio] = useState('')
  const [horaFinal, setHoraFinal] = useState('')
  const [diaElegido, setDiaElegido] = useState('')
  const [alumnosBtnActive, setAlumnosBtnActive] = useState(false)
  const [actProfe, setActProfe] = useState(null)
  const [alumnosDeLaClase, setAlumnosDeLaClase] = useState(reserva.grupo || [])

  const navigate = useNavigate()

  const dias = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ]

  // Función para formatear la fecha
  const formateoFecha = (fecha) => {
    const numeroDia = new Date(fecha).getDay()
    const nombreDia = dias[numeroDia]

    const destructFecha = fecha.split('-')
    return `${nombreDia} ${destructFecha[2]}/${destructFecha[1]}`
  }

  // Función para verificar si la clase ya pasó
  const clasePasada = (fecha) => {
    return fecha.split('-').join('') < moment(new Date()).format('YYYYMMDD')
  }

  // Funciones para manejar la edición de la clase
  const handleDeleteAlumno = (indexItem) => {
    setAlumnosDeLaClase((prevState) =>
      prevState.filter((_, index) => index !== indexItem)
    )
    // Aquí puedes agregar lógica para eliminar al alumno en el backend
  }

  const handleEditProfe = (e) => {
    setActProfe(parseInt(e.target.value))
  }

  const handleEditAlumnos = (selectedAlumnos) => {
    setAlumnosDeLaClase(selectedAlumnos.map((i) => i.value))
  }

  const actualizarClase = () => {
    const URL_BASE = 'http://localhost:8083/api/'
    const alumnos_ID = alumnosDeLaClase.map((el) => el.id)
    const params = new URLSearchParams()
    const profeDefault = reserva.profesorId // Usar el id del profesor

    params.append('reserva_id', reserva.reservaId)
    params.append('hora_ini', horaInicio || reserva.horaIni)
    params.append('hora_fin', horaFinal || reserva.horaFin)
    params.append('fecha', diaElegido || reserva.fecha)
    params.append('persona_id', actProfe || profeDefault)
    params.append('grupo_ids', alumnos_ID)

    const requestOptions = {
      method: 'PUT',
      body: params,
    }

    fetch(`${URL_BASE}clase_reserva`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar la clase')
        }
        return response.json()
      })
      .then(() => {
        onClose() // Cerrar el modal después de actualizar
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const cerrarDetalles = () => {
    onClose()
    setHoraFinal('')
    setHoraInicio('')
    setDiaElegido('')
    setActProfe(null)
  }

  return (
    <Modal
      isVisible={isVisible}
      onClose={cerrarDetalles}
      title="Detalles de la Clase"
    >
      <div id="clase-detail-component">
        {clasePasada(reserva.fecha) ? (
          <div id="clase-detail-general" className="clase-caja">
            <h2>Cancha: {reserva.canchaNombre}</h2>
            <p id="clase-detail-fecha">{formateoFecha(reserva.fecha)}</p>
            <p id="clase-detail-hora">
              {reserva.horaIni} - {reserva.horaFin}
            </p>
          </div>
        ) : (
          <div id="clase-detail-futuro" className="clase-caja">
            <h2>Cancha: {reserva.canchaNombre}</h2>
            {active ? (
              <div id="clase-detail-contenido">
                <div id="clase-detail-texto">
                  <p id="clase-detail-fecha">
                    {diaElegido === ''
                      ? formateoFecha(reserva.fecha)
                      : formateoFecha(diaElegido)}
                  </p>
                  <p id="clase-detail-hora">
                    {horaInicio === '' ? reserva.horaIni : horaInicio} -{' '}
                    {horaFinal === '' ? reserva.horaFin : horaFinal}
                  </p>
                </div>
                <div id="clase-btn-background">
                  <EditFechaYHoraController
                    reserva={reserva}
                    setHoraInicio={setHoraInicio}
                    horaInicio={horaInicio}
                    setHoraFinal={setHoraFinal}
                    horaFinal={horaFinal}
                    diaElegido={diaElegido}
                    setDiaElegido={setDiaElegido}
                  />
                  <button
                    id="clase-detail-edit-btn"
                    onClick={() => setActive(false)}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </div>
              </div>
            ) : (
              <div id="clase-detail-contenido">
                <div id="clase-detail-texto">
                  <p id="clase-detail-fecha">
                    {diaElegido === ''
                      ? formateoFecha(reserva.fecha)
                      : formateoFecha(diaElegido)}
                  </p>
                  <p id="clase-detail-hora">
                    {horaInicio === '' ? reserva.horaIni : horaInicio} -{' '}
                    {horaFinal === '' ? reserva.horaFin : horaFinal}
                  </p>
                </div>
                <div id="clase-btn-background">
                  <button
                    id="clase-detail-edit-btn"
                    onClick={() => setActive(true)}
                  >
                    <FontAwesomeIcon icon={faCalendar} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div id="clase-detail-profesor" className="clase-caja">
          <h3>Profesor</h3>
          <div id="profesor-label">
            <p id="profesor">ID del profesor: </p>{' '}
            {/*TDOO mostrar el nombre, no el id*/}
            <p className="clase-detail-nombre">{reserva.profesorId}</p>
          </div>
          {!clasePasada(reserva.fecha) && (
            <select
              className="inputReserva"
              onChange={handleEditProfe}
              defaultValue={reserva.profesorId}
            >
              <option value={reserva.profesorId}>Cambiar Profe</option>
              {/* Aquí debes incluir la lista de profesores */}
            </select>
          )}
        </div>

        <div id="clase-detail-alumnos" className="clase-caja">
          <h3>Alumnos</h3>
          {alumnosDeLaClase.length > 0 ? (
            alumnosDeLaClase.map((alumno, index) => (
              <div key={index} className="alumno-item">
                <span>{alumno.nombre}</span>
                <button onClick={() => handleDeleteAlumno(index)}>
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <p>No hay alumnos en esta clase.</p>
          )}
          <SelectorDeAlumnosDeClase
            selectedAlumnos={alumnosDeLaClase}
            onChange={handleEditAlumnos}
          />
        </div>

        {!clasePasada(reserva.fecha) && (
          <div id="clase-detail-btns">
            <button id="clase-detail-guardar" onClick={actualizarClase}>
              Guardar
            </button>
            <button id="clase-detail-cancelar" onClick={cerrarDetalles}>
              Cancelar
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default ClaseDetails
