import React from 'react'

//components
import NavBar from '../Navbar/NavBar'
import HomeCard from '../../components/HomeCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableTennis, faUser, faCalendar,faUserTie, faDollarSign } from '@fortawesome/free-solid-svg-icons'

export const Home = ({setSesion}) => {

  
  return (
    <>
      <NavBar title={'Inicio'} setSesion={setSesion} />
      <div id='home-content'>
        <HomeCard
          title={'Canchas'} 
          descr={'Manejo de las cannchas del sistema'}
          Logo={<FontAwesomeIcon icon={faTableTennis}/>}
          color={'#EE82EE'}
          link="../canchas" 
          nombreClase={'canchashc'}
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
          title={'Reservas'} 
          descr={'Reservación de alquiléres y clases'} 
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
      </div>
    </>
  )
}
