import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getClasesProfesor, getProfesorById } from 'api/profesores'
import Dashboard from 'components/Dashboard/Dashboard'
import LoaderSpinner from 'components/LoaderSpinner'
import NotFound404 from 'components/NotFound404/NotFound404'
import CalendarPicker from 'components/Reserva/CalendarComponent'
import ClaseDetails from 'components/Reserva/ClaseDetails'
import ReservaDashboardItem from 'components/Reserva/ReservaDashboardItem'
import moment from 'moment'
import NavBar from 'pages/Navbar/NavBar'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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

export default function ProfesorHomePage() {
  const [profesor, setProfesor] = useState(null)

  return (
    <div id="home-component">
      {/* Navbar */}
      <NavBar title={profesor?.nombre ?? ''} />
      <ProfesorHomePageBody profesor={profesor} setProfesor={setProfesor} />
    </div>
  )
}

function ProfesorHomePageBody({ profesor, setProfesor }) {
  const [clasesProfesor, setClasesProfesor] = useState()
  const [selectedDate, setSelectedDate] = useState(Date.now())
  const [isLoading, setIsLoading] = useState(true)

  const [isClaseDetailsVisible, setIsClaseDetailsVisible] = useState(false)
  const [claseDetail, setClaseDetail] = useState({})

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)

      const [profesorData, clasesProfesorData] = await Promise.all([
        getProfesorById(id),
        getClasesProfesor(id, moment(selectedDate).format('YYYY-MM-DD')),
      ])

      setProfesor(profesorData)

      if (
        clasesProfesorData.message ===
        'No se encontraron clases para la fecha indicada.'
      ) {
        setClasesProfesor([])
      } else {
        setClasesProfesor(clasesProfesorData.data)
      }

      console.log({ profesorData, clasesProfesorData })

      setIsLoading(false)
    })()
  }, [id, selectedDate, setProfesor])

  if (isLoading) {
    return (
      <div style={{ position: 'relative' }}>
        <LoaderSpinner
          active={isLoading}
          containerClass={'homeLoader'}
          loaderClass={'homeLoaderSpinner'}
        />
      </div>
    )
  }

  if (profesor == null) {
    return (
      <div style={{ marginTop: '6rem' }}>
        <NotFound404
          title="¡Oops! No encontramos al profesor"
          description="Parece que el profesor no está registrado en el sistema"
          btnText="Volver al inicio"
          onCallToAction={() => navigate('/inicio')}
        />
      </div>
    )
  }

  return (
    <>
      <Dashboard
        header={
          <div className="home__dashboard-header">
            <button
              className="home__btn-add"
              onClick={() => alert('No funciona')}
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
            className="home__hora--main dashboard__row--light"
          >
            Hora
          </Dashboard.Row>
          {horas.map((hora, i) => (
            <Dashboard.Row
              key={hora}
              header={true}
              className={`home__hora ${i % 2 === 0 ? 'home__hora--hour' : 'home__hora--half'} dashboard__row--light`}
            >
              {hora}
            </Dashboard.Row>
          ))}
        </Dashboard.Col>

        <Dashboard.Col style={{ backgroundColor: '#' }}>
          <Dashboard.Row
            header={true}
            sticky={true}
            className="home__cancha"
            style={{ backgroundColor: 'hsl(0, 0%, 76%)' }}
          >
            <span
              className="text-ellipsis"
              style={{ maxWidth: '100%' }}
              title={moment(selectedDate).format('DD-MM')}
            >
              {moment(selectedDate).format('DD-MM')}
            </span>
          </Dashboard.Row>

          {/* Rellenar con celdas vacías para armar la grilla  */}
          {horas.map((hora) => (
            <Dashboard.Row
              key={`${selectedDate.toString()}-${hora}`}
              className="dashboard__row--light"
            ></Dashboard.Row>
          ))}
          {clasesProfesor.map((reserva) => (
            <ReservaDashboardItem
              key={reserva.reservaId}
              reserva={reserva}
              onClick={() => {
                setIsClaseDetailsVisible(true)
                setClaseDetail(reserva)
              }}
            />
          ))}
        </Dashboard.Col>
      </Dashboard>
      <ClaseDetails
        isVisible={isClaseDetailsVisible}
        onClose={() => setIsClaseDetailsVisible(false)}
        reserva={claseDetail}
      />
    </>
  )
}
