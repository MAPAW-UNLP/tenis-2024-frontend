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
// import Reserva from 'components/Reserva/Reserva'
import NavBar from 'pages/Navbar/NavBar'
import Dashboard from 'components/Dashboard/Dashboard'
import ReservaDashboardItem from 'components/Reserva/ReservaDashboardItem'
import { ordenarPorNombre } from 'components/Utils/Functions'

// Fontawesome
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import 'styles/home.css'
import NotFound404 from 'components/NotFound404/NotFound404'

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
  const [canchas, setCanchas] = useState([])
  const [reservas, setReservas] = useState([])
  const [reservasIsLoading, setReservasIsLoading] = useState(true) // Spinner

  const [profesores, setProfesores] = useState([])

  useEffect(() => {
    setReservasIsLoading(true)
    getProfesores().then((data) => setProfesores(ordenarPorNombre(data)))
    getCanchas().then((data) => setCanchas(data.detail))
    getReservas()
      .then((data) => setReservas(data.detail))
      .then(() => setReservasIsLoading(false))
  }, [])

  return (
    <div id="home-component">
      <NavBar title={'Tennis app'} />
      {reservasIsLoading ? (
        <div style={{ position: 'relative' }}>
          <LoaderSpinner
            active={reservasIsLoading}
            containerClass={'homeLoader'}
            loaderClass={'homeLoaderSpinner'}
          />
        </div>
      ) : (
        <HomeBody
          canchas={canchas}
          profesores={profesores}
          reservas={reservas}
          reservasIsLoading={reservasIsLoading}
        />
      )}
    </div>
  )
}

function HomeBody({ reservas, canchas, profesores, reservasIsLoading }) {
  const [reservasDelDia, setReservasDelDia] = useState([])
  const [reservaDetail, setReservaDetail] = useState({})
  const [alquilerDetailsIsVisible, setAlquilerDetailsIsVisible] =
    useState(false)
  const [selectedDate, setSelectedDate] = useState(Date.now())

  const [claseDetail, setClaseDetail] = useState({})
  const [profesorSeleccionado, setProfesorSeleccionado] = useState('')

  const navigate = useNavigate()

  const handleBuscarClases = () => {
    if (!profesorSeleccionado || !selectedDate) {
      alert('Debe seleccionar un profesor y una fecha.')
      return
    }

    const formattedDate = moment(selectedDate).format('YYYY-MM-DD')
    const url = `http://localhost:8083/api/clases-profesor?persona_id=${profesorSeleccionado}&fecha=${formattedDate}`

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('Clases encontradas:', data)
        // Aquí puedes manejar los resultados obtenidos
      })
      .catch((error) => console.error('Error fetching clases:', error))
  }

  useEffect(() => {
    if (reservasIsLoading) return

    const reservasDia = reservas.reduce((acc, reserva) => {
      if (
        reserva.fecha === moment(selectedDate).format('YYYY-MM-DD') &&
        reserva.estado === 'ASIGNADO'
      ) {
        if (!acc[reserva.canchaId]) {
          acc[reserva.canchaId] = []
        }
        const cancha = canchas.find((c) => c.id === reserva.canchaId)
        const reservaConCancha = {
          ...reserva,
          canchaNombre: cancha ? cancha.nombre : 'Desconocida',
        }
        console.log('Reserva con canchaNombre:', reservaConCancha) // Log
        acc[reserva.canchaId].push(reservaConCancha)
      }
      return acc
    }, {})

    setReservasDelDia(reservasDia)
  }, [canchas, reservas, reservasIsLoading, selectedDate])

  if (canchas.length === 0) {
    return (
      <div style={{ marginTop: '6rem' }}>
        <NotFound404
          title="¡Oops! No encontramos canchas de tenis"
          description="Parece que todavía no hay canchas de tenis disponibles en este complejo. No te preocupes, puedes agregarlas fácilmente."
          btnText="Añadir una nueva cancha"
          onCallToAction={() => navigate('../canchas')}
        />
      </div>
    )
  }

  return (
    <>
      <NavBar title={'Tennis app'} />
      {alquilerDetailsIsVisible && (
        <AlquilerDetails
          isVisible={alquilerDetailsIsVisible}
          onClose={() => setAlquilerDetailsIsVisible(false)}
          reserva={reservaDetail}
          setReservaDetail={setReservaDetail}
        />
      )}
      {claseDetail && Object.keys(claseDetail).length > 0 && (
        <ClaseDetails
          isVisible={claseDetail && Object.keys(claseDetail).length > 0}
          onClose={() => setClaseDetail({})}
          reserva={claseDetail}
        />
      )}

      <Dashboard
        header={
          <div className="home__dashboard-header">
            <button
              className="home__btn-add"
              onClick={() => navigate('../nuevaReserva')}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </button>
            <div>
              <label htmlFor="profesor-select">Seleccionar Profesor:</label>
              <select
                id="profesor-select"
                value={profesorSeleccionado}
                onChange={(e) => setProfesorSeleccionado(e.target.value)}
              >
                <option value="">Seleccione un profesor</option>
                {profesores.map((profesor) => (
                  <option key={profesor.id} value={profesor.id}>
                    {profesor.nombre}
                  </option>
                ))}
              </select>
              <button onClick={handleBuscarClases}>Aceptar</button>
            </div>
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
                      console.log('CLIQUEO ', reserva) // Verifica el objeto reserva
                      setClaseDetail(reserva)
                    }
                  }}
                />
              ))}
          </Dashboard.Col>
        ))}
      </Dashboard>
    </>
  )
}

export default Home
