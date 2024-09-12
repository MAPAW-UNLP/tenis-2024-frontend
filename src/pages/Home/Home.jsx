import React from 'react'

//components
import NavBar from '../Navbar/NavBar'
import HomeCard from '../../components/HomeCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableTennis, faUser, faCalendar,faUserTie, faDollarSign, faPlus, faCalendarTimes } from '@fortawesome/free-solid-svg-icons'

export const Home = ({setSesion}) => {

  
  return (
    <>
      <NavBar title={'Inicio'} setSesion={setSesion} />
      <div id='home-content'>
        <HomeCard
          title={'Canchas'} 
          descr={'Manejo de las canchas del sistema'}
          Logo={<FontAwesomeIcon icon={faTableTennis}/>}
          color={'#EE82EE'}
          link="../canchas" 
          nombreClase={'canchashc'}
        />
        <HomeCard 
          title={'Reservas'} 
          descr={'Reservación de alquileres y clases'} 
          Logo={<FontAwesomeIcon icon={faCalendar}/>} 
          color={'#FFA500'} 
          link="../reservas" 
          nombreClase={'reservashc'}
        />
        <HomeCard 
          title={'Profesores'} 
          descr={'Gestión de profesores'} 
          Logo={<FontAwesomeIcon icon={faUserTie}/>} 
          color={'#BCEB3C'} 
          link="../profesores" 
          nombreClase={'profesoreshc'}
        />
        <HomeCard 
          title={'Movimientos'} 
          descr={'Movimiento de dinero y manejo de cobros'} 
          Logo={<FontAwesomeIcon icon={faDollarSign} />} 
          color={'#94F5C5'} 
          link="../movimientos" 
          nombreClase={'pagoshc'}
        />
        <HomeCard 
          title={'Clases'} 
          descr={'Crear clases'} 
          Logo={<FontAwesomeIcon icon={faPlus} />} 
          color={'#FFA500'} 
          link="../crearClase" 
          nombreClase={'claseshc'}
        />
        <HomeCard 
          title={'Alumnos'} 
          descr={'Gestion de alumnos'} 
          Logo={<FontAwesomeIcon icon={faUser}/>} 
          color={'#ADD8E6'} 
          link="../alumnos" 
          nombreClase={'alumnoshc'}
        />
        <HomeCard 
          title={'Ausencias y suspenciones'} 
          descr={'Gestión de periodos de ausencia y suspención de clases'} 
          Logo={<FontAwesomeIcon icon={faCalendarTimes} />} 
          color={'#698bc9'} 
          link="../ausencias" 
          nombreClase={'ausenciashc'}
        />
      </div>
    </>
  )
}
