// Libraries
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// API
import { getCanchas } from 'api/canchas'
import { getClasesProfesor, getProfesores } from 'api/profesores'
import { getReservas } from 'api/reservas'

// Components
import LoaderSpinner from 'components/LoaderSpinner'
import AlquilerDetails from 'components/Reserva/AlquilerDetails'
import CalendarPicker from 'components/Reserva/CalendarComponent'
import ClaseDetails from 'components/Reserva/ClaseDetails'
// import Reserva from 'components/Reserva/Reserva'
import Dashboard from 'components/Dashboard/Dashboard'
import NotFound404 from 'components/NotFound404/NotFound404'
import ReservaDashboardItem from 'components/Reserva/ReservaDashboardItem'
import { ordenarPorNombre } from 'components/Utils/Functions'
import NavBar from 'pages/Navbar/NavBar'

// Fontawesome
import { faPlus } from '@fortawesome/free-solid-svg-icons'
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

function organizarReservasPorCancha(reservas, canchas, selectedDate) {
  const selectedDateFormatted = moment(selectedDate).format('YYYY-MM-DD')
  return reservas.reduce((acc, reserva) => {
    const reservaFecha = moment(reserva.fecha).format('YYYY-MM-DD')
    if (reservaFecha === selectedDateFormatted) {
      if (!acc[reserva.canchaId]) acc[reserva.canchaId] = []
      const cancha = canchas.find((c) => c.id === reserva.canchaId)
      acc[reserva.canchaId].push({
        ...reserva,
        canchaNombre: cancha ? cancha.nombre : 'Desconocida',
      })
    }
    return acc
  }, {})
}

export default function Home() {
  const [canchas, setCanchas] = useState([])
  const [reservas, setReservas] = useState([]) // Reservas generales
  const [clasesReservas, setClasesReservas] = useState([]) // Reservas de clases
  const [profesores, setProfesores] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const [profesores, canchas, reservas] = await Promise.all([
        getProfesores(),
        getCanchas(),
        getReservas(),
      ])
      setProfesores(ordenarPorNombre(profesores))
      setCanchas(canchas.detail)
      setReservas(reservas.detail)
      setIsLoading(false)
    })()
  }, [])

  console.log('reservas', reservas)
  console.log('clasesReservas', clasesReservas)

  return (
    <div id="home-component">
      <NavBar title={'Tennis app'} />
      {isLoading && (
        <div style={{ position: 'relative' }}>
          <LoaderSpinner
            active={isLoading}
            containerClass={'homeLoader'}
            loaderClass={'homeLoaderSpinner'}
          />
        </div>
      )}
      <HomeBody
        canchas={canchas}
        profesores={profesores}
        reservas={reservas}
        clasesReservas={clasesReservas} // Pasar las reservas de clases
        setClasesReservas={setClasesReservas} // Pasar setter de clases
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  )
}

function HomeBody({
  reservas,
  clasesReservas,
  setClasesReservas,
  canchas,
  profesores,
  isLoading,
  setIsLoading,
}) {
  const [reservasDelDia, setReservasDelDia] = useState([])
  const [reservaDetail, setReservaDetail] = useState({})
  const [alquilerDetailsIsVisible, setAlquilerDetailsIsVisible] =
    useState(false)
  const [isClaseDetailsVisible, setIsClaseDetailsVisible] = useState(false)

  const [selectedDate, setSelectedDate] = useState(Date.now())
  const [claseDetail, setClaseDetail] = useState({})
  const [profesorSeleccionado, setProfesorSeleccionado] = useState('todos')

  console.log('reservasDelDia', reservasDelDia)

  const navigate = useNavigate()

  const handleBuscarClases = useCallback(async () => {
    if (!profesorSeleccionado || !selectedDate) {
      alert('Debe seleccionar un profesor y una fecha.')
      return
    }

    setIsLoading(true)

    if (profesorSeleccionado === 'todos') {
      const reservasDia = organizarReservasPorCancha(
        reservas,
        canchas,
        selectedDate
      )
      setReservasDelDia(reservasDia)
    } else if (profesorSeleccionado === 'reservas') {
    } else {
      const clasesProfe = await getClasesProfesor(
        profesorSeleccionado,
        moment(selectedDate).format('YYYY-MM-DD')
      )

      if (clasesProfe?.data?.length > 0) {
        const clasesDelDia = organizarReservasPorCancha(
          clasesProfe.data,
          canchas,
          selectedDate
        )
        setClasesReservas(clasesProfe)
        setReservasDelDia(clasesDelDia)
      }
    }
    setIsLoading(false)
  }, [
    canchas,
    profesorSeleccionado,
    reservas,
    selectedDate,
    setClasesReservas,
    setIsLoading,
  ])

  useEffect(() => {
    handleBuscarClases()
  }, [handleBuscarClases])

  if (isLoading) return null

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
      <AlquilerDetails
        isVisible={alquilerDetailsIsVisible}
        onClose={() => setAlquilerDetailsIsVisible(false)}
        reserva={reservaDetail}
        setReservaDetail={setReservaDetail}
      />
      <ClaseDetails
        isVisible={isClaseDetailsVisible}
        onClose={() => setIsClaseDetailsVisible(false)}
        reserva={claseDetail}
        setReservasDelDia={setReservasDelDia}
      />

      <div className="home__header">
        <div className="profesor-select-container">
          <label htmlFor="profesor-select" className="profesor-label">
            Filtrar por profesor
          </label>
          <select
            id="profesor-select"
            value={profesorSeleccionado}
            onChange={(e) => setProfesorSeleccionado(e.target.value)}
            className="profesor-select"
          >
            <option value="todos">Todas las clases y reservas</option>
            {profesores.map((profesor) => (
              <option key={profesor.id} value={profesor.id}>
                Clases de {profesor.nombre}
              </option>
            ))}
          </select>
          <button onClick={handleBuscarClases} className="profesor-btn">
            Aceptar
          </button>
        </div>

        <div className="home__btn-add-wrapper">
          <button
            className="home__btn-add"
            onClick={() => navigate('../nuevaReserva')}
          >
            <span>Crear reserva</span>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      <Dashboard
        header={
          <div className="home__dashboard-header">
            <div style={{ width: '6rem' }}></div>
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
            {reservasDelDia[cancha.id] &&
              reservasDelDia[cancha.id].map((reserva) => (
                <ReservaDashboardItem
                  key={reserva.reservaId}
                  reserva={reserva}
                  onClick={() => {
                    if (reserva.tipo === 'ALQUILER') {
                      setReservaDetail(reserva)
                      setAlquilerDetailsIsVisible(true)
                    } else {
                      setIsClaseDetailsVisible(true)
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
