import React, { useState, useEffect } from 'react'
import { useSession } from '../../hooks/useSession'

// Components
import LoaderSpinner from 'components/LoaderSpinner'
import Dashboard from 'components/Dashboard/Dashboard'
import CalendarPicker from 'components/Reserva/CalendarComponent'
import ClaseDashboardItem from 'components/Clase/ClaseDashboardItem'

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

const dias = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo',
]

// const clasesJSON = {
//   Domingo: [
//     {
//       id: 1,
//       tipo: 'GRUPAL',
//       importe: 100,
//       fecha: '2024-11-03',
//       hora_ini: '09:00:00',
//       hora_fin: '10:00:00',
//       profesor: 'profeuno',
//       cancha: 'Cancha 1',
//     },
//     {
//       id: 2,
//       tipo: 'INDIVIDUAL',
//       importe: 100,
//       fecha: '2024-11-03',
//       hora_ini: '12:00:00',
//       hora_fin: '13:00:00',
//       profesor: 'profeuno',
//       cancha: 'Cancha 1',
//     },
//   ],
//   Lunes: [
//     {
//       id: 3,
//       tipo: 'INDIVIDUAL',
//       importe: 100,
//       fecha: '2024-11-03',
//       hora_ini: '09:00:00',
//       hora_fin: '10:00:00',
//       profesor: 'profeuno',
//       cancha: 'Cancha 1',
//     },
//   ],
//   Martes: [],
//   Miercoles: [
//     {
//       id: 4,
//       tipo: 'GRUPAL',
//       importe: 100,
//       fecha: '2024-11-03',
//       hora_ini: '09:00:00',
//       hora_fin: '10:00:00',
//       profesor: 'profeuno',
//       cancha: 'Cancha 1',
//     },
//   ],
//   Jueves: [],
//   Viernes: [
//     {
//       id: 5,
//       tipo: 'INDIVIDUAL',
//       importe: 100,
//       fecha: '2024-11-03',
//       hora_ini: '09:00:00',
//       hora_fin: '10:00:00',
//       profesor: 'profeuno',
//       cancha: 'Cancha 1',
//     },
//   ],
//   Sabado: [
//     {
//       id: 6,
//       tipo: 'INDIVIDUAL',
//       importe: 100,
//       fecha: '2024-11-03',
//       hora_ini: '09:00:00',
//       hora_fin: '10:00:00',
//       profesor: 'profeuno',
//       cancha: 'Cancha 1',
//     },
//     {
//       id: 7,
//       tipo: 'GRUPAL',
//       importe: 100,
//       fecha: '2024-11-03',
//       hora_ini: '11:00:00',
//       hora_fin: '12:00:00',
//       profesor: 'profeuno',
//       cancha: 'Cancha 1',
//     },
//   ],
// }

const CalendarioProximasClases = () => {
  const URL_BASE = 'http://localhost:8083/api/'
  const { session } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(Date.now())
  const [clases, setClases] = useState()
  const params = new URLSearchParams({
    clienteId: session.id,
    startDate: '2024-11-08',
  })
  const getNextClases = () => {
    fetch(`${URL_BASE}cliente/next-clases?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.rta === 'ok') {
          setIsLoading(false)
          console.log(data.detail)
          setClases(data.detail)
        } else {
          console.log('not ok')
        }
      })
  }

  useEffect(() => {
    getNextClases()
  }, [])

  return (
    <>
      {isLoading && (
        <div style={{ position: 'relative' }}>
          <LoaderSpinner
            active={isLoading}
            containerClass={'homeLoader'}
            loaderClass={'homeLoaderSpinner'}
          />
        </div>
      )}
      {!isLoading && (
        <Dashboard header={<div className="home__dashboard-header"></div>}>
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
          {Object.keys(clases).map((dia) => (
            <Dashboard.Col
              key={dia}
              style={{
                backgroundColor: '#D4D4D4',
              }}
            >
              <Dashboard.Row
                header={true}
                sticky={true}
                className="home__cancha"
                style={{
                  backgroundColor: '#5d5d5d',
                  color: '#f4f4f4',
                }}
              >
                <span
                  className="text-ellipsis"
                  style={{ maxWidth: '100%' }}
                  title={dia}
                >
                  {dia}
                </span>
              </Dashboard.Row>

              {/* Rellenar con celdas vacías para armar la grilla  */}
              {horas.map((hora) => (
                <Dashboard.Row key={`${dia}-${hora}`}></Dashboard.Row>
              ))}
              {clases[dia].map((clase) => (
                <ClaseDashboardItem key={clase.id} clase={clase} />
              ))}
            </Dashboard.Col>
          ))}
        </Dashboard>
      )}
    </>
  )
}

export default CalendarioProximasClases
