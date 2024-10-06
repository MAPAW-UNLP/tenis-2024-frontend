// Libraries
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

// API
import { getAlumnos } from 'api/alumnos'
import { getCanchas } from 'api/canchas'
import { getProfesores } from 'api/profesores'
import { getReservas } from 'api/reservas'

// Components
import LoaderSpinner from 'components/LoaderSpinner'
import AlquilerDetails from 'components/Reserva/AlquilerDetails'
import CalendarPicker from 'components/Reserva/CalendarComponent'
import ClaseDetails from 'components/Reserva/ClaseDetails'
import Reserva from 'components/Reserva/Reserva'
import NavBar from 'pages/Navbar/NavBar'
import Dashboard from 'components/Dashboard/Dashboard'
import ReservaDashboardItem from 'components/Reserva/ReservaDashboardItem'
import { ordenarPorNombre } from 'components/Utils/Functions'

// Fontawesome
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import 'styles/home.css'

const horas = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
]

const coloresCanchas = [
  '#FFA500',
  '#FFC0CB',
  '#90EE90',
  '#ADD8E6',
  '#EE82EE',
  '#94F5C5',
]

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(Date.now())
  const [canchas, setCanchas] = useState([])
  const [reservas, setReservas] = useState([])
  const [reservasIsLoading, setReservasIsLoading] = useState(true) // Spinner
  const [reservasDelDia, setReservasDelDia] = useState([])

  const [reservaDetail, setReservaDetail] = useState({})
  const [alquilerDetailsIsVisible, setAlquilerDetailsIsVisible] =
    useState(false)

  const [alumnosDeLaClase, setAlumnosDeLaClase] = useState([])
  const [profeClase, setProfeClase] = useState('')
  const [claseDetail, setClaseDetail] = useState({})
  const [actReservas, setActReservas] = useState(false)
  const [alumnos, setAlumnos] = useState([])
  const [profesores, setProfesores] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getProfesores().then((data) => setProfesores(ordenarPorNombre(data)))
    getAlumnos().then((data) => setAlumnos(ordenarPorNombre(data)))
    getCanchas().then((data) => setCanchas(data.detail))
    setReservasIsLoading(true)
    getReservas()
      .then((data) => setReservas(data.detail))
      .then(() => setReservasIsLoading(false))
  }, [])

  useEffect(() => {
    if (reservasIsLoading) return

    const reservasDia = reservas.reduce((acc, reserva) => {
      if (reserva.fecha === moment(selectedDate).format('YYYY-MM-DD')) {
        if (!acc[reserva.canchaId]) {
          acc[reserva.canchaId] = []
        }
        acc[reserva.canchaId].push(reserva)
      }
      return acc
    }, {})

    setReservasDelDia(reservasDia)
  }, [reservas, reservasIsLoading, selectedDate])

  return (
    <div id="home-component">
      <NavBar title={'Tennis app'} />
      <AlquilerDetails
        isVisible={alquilerDetailsIsVisible}
        onClose={() => setAlquilerDetailsIsVisible(false)}
        reserva={reservaDetail}
        setReservaDetail={setReservaDetail}
      />
      <ClaseDetails
        reserva={claseDetail}
        diaReserva={selectedDate}
        setClaseDetail={setClaseDetail}
        alumnosDeLaClase={alumnosDeLaClase}
        setAlumnosDeLaClase={setAlumnosDeLaClase}
        profeClase={profeClase}
        setProfeClase={setProfeClase}
        alumnos={alumnos}
        profesores={profesores}
        setActReservas={setActReservas}
      />
      {/* <LoaderSpinner active={reservasLoader} containerClass={'homeLoader'} loaderClass={'homeLoaderSpinner'}/> */}

      <Dashboard
        header={
          <div className="home__dashboard-header">
            <button
              className="home__btn-add"
              onClick={() => navigate('../nuevaReserva')}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </button>
            <div className="home__date">
              <CalendarPicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
          </div>
        }
      >
        <Dashboard.Col first={true} sticky={true}>
          <Dashboard.Row
            header={true}
            sticky={true}
            className="home__hora--main"
          >
            Hora
          </Dashboard.Row>
          {horas.map((hora, i) => (
            <Dashboard.Row
              key={hora}
              header={true}
              className={`home__hora ${i % 2 === 0 ? 'home__hora--hour' : 'home__hora--half'}`}
            >
              {hora}
            </Dashboard.Row>
          ))}
        </Dashboard.Col>
        {canchas.map((cancha, i) => (
          <Dashboard.Col
            key={cancha.nombre}
            style={{
              backgroundColor: coloresCanchas[i % (coloresCanchas.length - 1)],
            }}
          >
            <Dashboard.Row
              header={true}
              sticky={true}
              className="home__cancha"
              style={{
                backgroundColor:
                  coloresCanchas[i % (coloresCanchas.length - 1)],
              }}
            >
              <span
                className="text-ellipsis"
                style={{ maxWidth: '100%' }}
                title={cancha.nombre}
              >
                {cancha.nombre}
              </span>
            </Dashboard.Row>

            {/* Rellenar con celdas vacías para armar la grilla  */}
            {horas.map((hora) => (
              <Dashboard.Row key={`${cancha.nombre}-${hora}`}></Dashboard.Row>
            ))}
            {/* Mostrar los eventos para esa cancha */}
            {reservasDelDia[cancha.id] &&
              reservasDelDia[cancha.id].map((reserva) => (
                <ReservaDashboardItem
                  key={reserva.reservaId}
                  reserva={reserva}
                  onClick={() => {
                    setReservaDetail(reserva)
                    if (reserva.tipo === 'ALQUILER') {
                      setAlquilerDetailsIsVisible(true)
                    } else {
                      // TODO ver qué hacer con el otro tipo
                    }
                  }}
                />
              ))}
          </Dashboard.Col>
        ))}
      </Dashboard>

      <div id="table-component">
        <div id="table-options">
          <button
            id="home-addReservaBtn"
            onClick={() => navigate('../nuevaReserva')}
          >
            {' '}
            <FontAwesomeIcon id="reserva-add-btn" icon={faPlusCircle} />
          </button>

          <div id="table-panel-date">
            <CalendarPicker today={selectedDate} setToday={setSelectedDate} />
          </div>
          {/* Aca iria el selector */}
        </div>
        <div
          id="table-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `13vw repeat(${canchas.length}, 1fr)`,
            gridTemplateRows: `repeat(${horas.length + 1}, 1fr)`,
          }}
        >
          <div id="hora" style={{ gridArea: '1/1/2/2' }}>
            Hora
          </div>

          {horas.map((el, i) => (
            <div
              className="horas"
              key={i}
              style={{ gridArea: `${i + 2}/1/${i + 3}/2` }}
            >
              {' '}
              {el}{' '}
            </div>
          ))}
          {canchas.map((el, i) => (
            <div
              className="canchas"
              key={el.id}
              style={{
                gridArea: `1/${i + 2} / ${horas.length}/${i + 3}`,
                backgroundColor: coloresCanchas[i % coloresCanchas.length],
              }}
            >
              <div
                style={{
                  backgroundColor: coloresCanchas[i % coloresCanchas.length],
                  filter: 'brightness(120%)',
                  height: '4vh',
                }}
              >
                <p> {el.nombre} </p>
              </div>{' '}
            </div>
          ))}
          {reservas.map((el) => (
            <Reserva
              key={el.reservaId}
              datos={el}
              canchas={canchas}
              today={moment(selectedDate).format('YYYY-MM-DD')}
              setReservaDetail={setReservaDetail}
              setClaseDetail={setClaseDetail}
              setAlumnos={setAlumnosDeLaClase}
              setProfe={setProfeClase}
            />
          ))}
        </div>
        <LoaderSpinner
          active={reservasIsLoading}
          containerClass={'homeLoaderNew'}
          loaderClass={'homeLoaderSpinner'}
        />
      </div>
    </div>
  )
}

export default Home
