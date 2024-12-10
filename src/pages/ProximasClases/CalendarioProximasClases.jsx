import React, { useState, useEffect } from 'react'
import { useSession } from '../../hooks/useSession'

// Components
import LoaderSpinner from 'components/LoaderSpinner'
import Dashboard from 'components/Dashboard/Dashboard'
import ClaseDashboardItem from 'components/Clase/ClaseDashboardItem'
import TablaProximasClases from './TablaProximasClases'
import ClasesAFavor from './ClasesAFavor'
import ModalClasesAFavor from './ModalClasesAFavor'

import InputReComponent from '../../components/Utils/InputReComponent'

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

const getCurrentDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()
  return year + '-' + month + '-' + date
}

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    const handleChange = () => setMatches(media.matches)

    setMatches(media.matches)

    media.addEventListener('change', handleChange)

    return () => media.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

const CalendarioProximasClases = () => {
  const URL_BASE = `${process.env.REACT_APP_BASE_URL}/`
  const { session } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(getCurrentDate())
  const [clases, setClases] = useState()
  const isMobile = useMediaQuery('(max-width: 1000px)')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [filtrarSpinner, setFiltrarSpinner] = useState(false)

  const params = new URLSearchParams({
    clienteId: session.id,
    startDate: selectedDate,
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
        setFiltrarSpinner(false)
        if (data.rta === 'ok') {
          setIsLoading(false)
          setClases(data.detail)
        } else {
          console.log('not ok')
        }
      })
  }

  useEffect(() => {
    getNextClases()
  }, [selectedDate])

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value)
  }

  const mes = ('0' + (new Date().getMonth() + 1)).slice(-2)
  const day = ('0' + new Date().getDate()).slice(-2)
  const año = new Date().getFullYear()
  const today = `${año}-${mes}-${day}`

  //const [filtrarSpinner, setFiltarSpinner] = useState(false)

  const [datos, setDatos] = useState({
    fechaInicio: today,
  })

  const handleFiltrado = () => {
    if (!datos.fechaInicio) datos.fechaInicio = today
    setFiltrarSpinner(true)
  }

  const LoadingSpinner = () => {
    return (
      <div
        style={{
          display: 'inline-block',
          width: '24px',
          height: '24px',
          borderTopColor: 'rgb(255, 255, 255)',
          borderRightColor: 'rgba(255, 255, 255, 0.4)',
          borderBottomColor: 'rgba(255, 255, 255, 0.4)',
          borderLeftColor: 'rgba(255, 255, 255, 0.4)',
          borderWidth: '3px',
          borderStyle: 'solid',
          borderImage: 'none',
          borderRadius: '50%',
          animation: 'spin 1s ease-in-out infinite',
          WebkitAnimation: 'spin 1s ease-in-out infinte',
        }}
      />
    )
  }

  return (
    <>
      <div className="clases-container">
        <div className="clases-head">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '80%',
            }}
          >
            <span style={{ marginRight: '.5em' }}>Selecciona fecha: </span>
            <InputReComponent
              type={'date'}
              name={'fechaInicio'}
              id={'fechaInicio'}
              className={'input-date'}
              placeholder={'Fecha'}
              onChangeFuncion={handleDateChange}
            />
          </div>
          <button className="button-clases-head" onClick={handleFiltrado}>
            {filtrarSpinner ? <LoadingSpinner /> : 'Filtar'}
          </button>
        </div>
      </div>
      <ClasesAFavor onOpenModal={() => setIsModalVisible(true)} />
      <ModalClasesAFavor
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      {isLoading ? (
        <div style={{ position: 'relative' }}>
          <LoaderSpinner
            active={isLoading}
            containerClass={'homeLoader'}
            loaderClass={'homeLoaderSpinner'}
          />
        </div>
      ) : !isLoading && !isMobile ? (
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
      ) : (
        <TablaProximasClases clases={clases} />
      )}
    </>
  )
}

export default CalendarioProximasClases
