// React
import { useEffect, useState } from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// API
import { getAlumnos } from 'api/alumnos'
import { getCanchas } from 'api/canchas'
import { getProfesores } from 'api/profesores'
import { getReservas } from 'api/reservas'

// Components
import LoaderSpinner from 'components/LoaderSpinner'
import AlquilerDetails from 'components/Reserva/AlquilerDetails'
import CalendarComponent from 'components/Reserva/CalendarComponent'
import ClaseDetails from 'components/Reserva/ClaseDetails'
import Reserva from 'components/Reserva/Reserva'
import NavBar from 'pages/Navbar/NavBar'

// Fontawesome
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ordenarPorNombre } from 'components/Utils/Functions'

import 'styles/home.css'

const Home = () => {
  //Todo esto es para manejar una fecha visible para el usuario
  const horas = [
    '8:00',
    '8:30',
    '9:00',
    '9:30',
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
    '#FFFFE0',
    '#ADD8E6',
    '#EE82EE',
    '#94F5C5',
  ]

  //cositas para formatear el dia
  const mes = ('0' + (new Date().getMonth() + 1)).slice(-2)
  const dia = ('0' + new Date().getDate()).slice(-2)
  const año = new Date().getFullYear()
  const DateToday = `${año}-${mes}-${dia}`

  const [today, setToday] = useState(DateToday)

  //alumnos de la clase
  const [alumnosDeLaClase, setAlumnosDeLaClase] = useState([])

  const [profeClase, setProfeClase] = useState('')

  //Details
  const [reservaDetail, setReservaDetail] = useState({})
  const [claseDetail, setClaseDetail] = useState({})

  const navigate = useNavigate()

  // Refactor desde home para reservas
  const [reservas, setReservas] = useState([])
  const [reservasIsLoading, setReservasIsLoading] = useState(false) // Spinner
  const [actReservas, setActReservas] = useState(false)
  const [canchas, setCanchas] = useState([])
  const [alumnos, setAlumnos] = useState([])
  const [profesores, setProfesores] = useState([])

  useEffect(() => {
    getProfesores().then((data) => setProfesores(ordenarPorNombre(data)))
  }, [])

  useEffect(() => {
    getCanchas().then((data) => setCanchas(data.detail))
  }, [])

  useEffect(() => {
    getAlumnos().then((data) => setAlumnos(ordenarPorNombre(data.detail)))
  }, [])

  useEffect(() => {
    setReservasIsLoading(true)
    getReservas()
      .then((data) => setReservas(data.detail))
      .then(() => setReservasIsLoading(false))
  }, [])

  return (
    <div id="home-component">
      <NavBar title={'Tennis app'} />
      {/* <VistaSemanal canchas={canchas} reservas={reservas}/> */}
      <AlquilerDetails
        reserva={reservaDetail}
        diaReserva={today}
        setReservaDetail={setReservaDetail}
      />
      <ClaseDetails
        reserva={claseDetail}
        diaReserva={today}
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
            <CalendarComponent today={today} setToday={setToday} />
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
              today={today}
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
