import { useNavigate } from 'react-router-dom'
import { useSession } from '../../hooks/useSession'
import NavBar from '../Navbar/NavBar'
import {
  ItemsIcon,
  ClaseIcon,
} from '../../components/items/ajustesHome/AjustesHomeIcons.js'

import '../../styles/ajustes/ajustesHome.css'

export const Precios = () => {
  const navigate = useNavigate()
  const handleRedirect = (link) => {
    navigate(link)
  }
  let user = useSession().session

  return (
    <>
      <NavBar title={'Items y Tipo de clases'} />
      <div
        style={{
          width: '80%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2em',
          marginBottom: '2em',
          gap: '1em',
        }}
      >
        {user.rolPorDefecto === 'ROLE_ADMIN' && (
          <>
            {/* Card for Items */}
            <div
              className="card items"
              onClick={() => handleRedirect('../itemsAlquiler')}
            >
              <div
                className="image"
                style={{ backgroundColor: '#DFC531', position: 'relative' }}
              >
                <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
                  <ItemsIcon className="ajustes-icon" />
                </div>
              </div>
              <div className="content">
                <span className="title" style={{ color: '#BCEB3C' }}>
                  Items
                </span>
                <p className="desc">
                  Agrega y gestiona artículos para alquilar
                </p>
              </div>
            </div>

            {/* Card for Clase */}
            <div
              className="card clase"
              onClick={() => handleRedirect('../ajustes')}
            >
              <div
                className="image"
                style={{ backgroundColor: '#45C824', position: 'relative' }}
              >
                <div style={{ fontSize: '5em', color: '#5d5d5d' }}>
                  <ClaseIcon className="ajustes-icon" />
                </div>
              </div>
              <div className="content">
                <span className="title" style={{ color: '#BCEB3C' }}>
                  Clases
                </span>
                <p className="desc">
                  Crea y personaliza diferentes tipos de clases
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
