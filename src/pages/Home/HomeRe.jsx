import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Navbar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableTennis, faUser, faCalendar, faUserTie, faDollarSign, faGear } from '@fortawesome/free-solid-svg-icons'

import '../../styles/home/home.css'

export const HomeRe = ({ setSesion }) => {
  const navigate = useNavigate()
  const handleRedirect = (link) => {
    navigate(link)
  }
  return (
    <>
      <NavBar title={'Inicio'} setSesion={setSesion} />
      <div style={{
        width: '80%', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        marginTop: '2em', marginBottom: '2em'
      }}>

        <div className="card movimientosCard" style={{ marginRight: '1em' }} onClick={() => handleRedirect('../movimientos')}>
          <div className="image" style={{ backgroundColor: '#94f5c5', position: 'relative' }}>
            <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
              <FontAwesomeIcon icon={faDollarSign} style={{ position: 'absolute', left: '41%', top: '0', bottom: '0', margin: 'auto' }} />
            </div>
          </div>
          <div className="content">
            <span className="title" style={{ color: '#94f5c5' }}>
              Movimientos
            </span>
            <p className="desc">
              Movimiento de dinero y manejo de cobros
            </p>
          </div>
        </div>

        <div className="card reservasCard" style={{ marginRight: '1em' }} onClick={() => handleRedirect('../reservas')}>
          <div className="image" style={{ backgroundColor: '#ffa500', position: 'relative' }}>
            <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
              <FontAwesomeIcon icon={faCalendar} style={{ position: 'absolute', left: '38%', top: '0', bottom: '0', margin: 'auto' }} />
            </div>
          </div>
          <div className="content">
            <span className="title" style={{ color: '#ffa500' }}>
              Reservas
            </span>
            <p className="desc">
              Reservación de alquileres y clases
            </p>
          </div>
        </div>

        <div className="card canchasCard" onClick={() => handleRedirect('../canchas')}>
          <div className="image" style={{ backgroundColor: '#ee82ee', position: 'relative' }}>
            <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
              <FontAwesomeIcon icon={faTableTennis} style={{ position: 'absolute', left: '37%', top: '0', bottom: '0', margin: 'auto' }} />
            </div>
          </div>
          <div className="content">
            <span className="title" style={{ color: '#ee82ee' }}>
              Canchas
            </span>

            <p className="desc">
              Manejo de las cannchas del sistema
            </p>
          </div>
        </div>

        <div className="card profesoresCard bottom" style={{ marginRight: '1em' }} onClick={() => handleRedirect('../profesores')}>
          <div className="image" style={{ backgroundColor: '#bceb3c', position: 'relative' }}>
            <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
              <FontAwesomeIcon icon={faUserTie} style={{ position: 'absolute', left: '37%', top: '0', bottom: '0', margin: 'auto' }} />
            </div>
          </div>
          <div className="content">
            <span className="title" style={{ color: '#bceb3c' }}>
              Profesores
            </span>
            <p className="desc">
              Gestión de profesores
            </p>
          </div>
        </div>

        <div className="card alumnosCard bottom" style={{ marginRight: '1em' }} onClick={() => handleRedirect('../alumnos')}>
          <div className="image" style={{ backgroundColor: '#add8e6', position: 'relative' }}>
            <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
              <FontAwesomeIcon icon={faUser} style={{ position: 'absolute', left: '37%', top: '0', bottom: '0', margin: 'auto' }} />
            </div>
          </div>
          <div className="content">
            <span className="title" style={{ color: '#add8e6' }}>
              Alumnos
            </span>
            <p className="desc">
              Gestión de alumnos
            </p>
          </div>
        </div>

        <div className="card ajustesCard bottom" onClick={() => handleRedirect('../ajustes')}>
          <div className="image" style={{ backgroundColor: '#78a1ca', position: 'relative' }}>
            <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
              <FontAwesomeIcon icon={faGear} style={{ position: 'absolute', left: '35%', top: '0', bottom: '0', margin: 'auto' }} />
            </div>
          </div>
          <div className="content">
            <span className="title" style={{ color: '#78a1ca' }}>
              Ajustes
            </span>

            <p className="desc">
              Configuracion de valores
            </p>
          </div>
        </div>

      </div>
    </>
  )
}
