import { useNavigate } from 'react-router-dom'
import { useSession } from '../../hooks/useSession'
import NavBar from '../Navbar/NavBar'
import {
  faTableTennis,
  faUser,
  faCalendar,
  faUserTie,
  faDollarSign,
  faGear,
  faTools,
} from '@fortawesome/free-solid-svg-icons'

import '../../styles/home/home.css'
import Card from 'components/Home/Card'

export const HomeRe = () => {
  const navigate = useNavigate()
  const handleRedirect = (link) => {
    navigate(link)
  }
  let user = useSession().session
  return (
    <>
      <NavBar title={'Inicio'} />
      <div
        style={{
          width: '80%',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '2em',
          marginBottom: '2em',
          gap: '1em',
        }}
      >
        <Card
          title="movimientos"
          description="Movimiento de dinero y manejo de cobros"
          customColor="#94f5c5"
          icon={faDollarSign}
          className="movimientosCard"
        />

        <Card
          title="reservas"
          description="Reservación de alquileres y clases"
          customColor="#ffa500"
          icon={faCalendar}
          className="reservasCard"
        />

        {user.rolPorDefecto === 'ROLE_ADMIN' && (
          <>
            <div
              className="card canchasCard"
              onClick={() => handleRedirect('../canchas')}
            >
              <div
                className="image"
                style={{ backgroundColor: '#ee82ee', position: 'relative' }}
              >
                <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
                  <FontAwesomeIcon
                    icon={faTableTennis}
                    style={{
                      position: 'absolute',
                      left: '37%',
                      top: '0',
                      bottom: '0',
                      margin: 'auto',
                    }}
                  />
                </div>
              </div>
              <div className="content">
                <span className="title" style={{ color: '#ee82ee' }}>
                  Canchas
                </span>

                <p className="desc">Manejo de las canchas del sistema</p>
              </div>
            </div>

            <div
              className="card profesoresCard bottom"
              style={{ marginRight: '1em' }}
              onClick={() => handleRedirect('../profesores')}
            >
              <div
                className="image"
                style={{ backgroundColor: '#bceb3c', position: 'relative' }}
              >
                <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
                  <FontAwesomeIcon
                    icon={faUserTie}
                    style={{
                      position: 'absolute',
                      left: '37%',
                      top: '0',
                      bottom: '0',
                      margin: 'auto',
                    }}
                  />
                </div>
              </div>
              <div className="content">
                <span className="title" style={{ color: '#bceb3c' }}>
                  Profesores
                </span>
                <p className="desc">Gestión de profesores</p>
              </div>
            </div>

            <div
              className="card alumnosCard bottom"
              style={{ marginRight: '1em' }}
              onClick={() => handleRedirect('../alumnos')}
            >
              <div
                className="image"
                style={{ backgroundColor: '#add8e6', position: 'relative' }}
              >
                <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      position: 'absolute',
                      left: '37%',
                      top: '0',
                      bottom: '0',
                      margin: 'auto',
                    }}
                  />
                </div>
              </div>
              <div className="content">
                <span className="title" style={{ color: '#add8e6' }}>
                  Alumnos
                </span>
                <p className="desc">Gestión de alumnos</p>
              </div>
            </div>

            <div
              className="card ajustesCard bottom"
              onClick={() => handleRedirect('../ajustes')}
            >
              <div
                className="image"
                style={{ backgroundColor: '#78a1ca', position: 'relative' }}
              >
                <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
                  <FontAwesomeIcon
                    icon={faGear}
                    style={{
                      position: 'absolute',
                      left: '35%',
                      top: '0',
                      bottom: '0',
                      margin: 'auto',
                    }}
                  />
                </div>
              </div>
              <div className="content">
                <span className="title" style={{ color: '#78a1ca' }}>
                  Ajustes
                </span>

                <p className="desc">Configuracion de valores</p>
              </div>
            </div>
            <Card
              title="proveedores"
              description="Gestión de proveedores"
              customColor="#32CD32"
              icon={faTools}
              className="proveedoresCard"
            />
          </>
        )}
      </div>
    </>
  )
}
