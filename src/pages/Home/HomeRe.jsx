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

        <Card
          title="canchas"
          description="Manejo de las canchas del sistema"
          customColor="#ee82ee"
          icon={faTableTennis}
          className="canchasCard"
        />

        <Card
          title="profesores"
          description="Gestión de profesores"
          customColor="#bceb3c"
          icon={faUserTie}
          className="profesoresCard"
        />

        <Card
          title="alumnos"
          description="Gestión de alumnos"
          customColor="#add8e6"
          icon={faUser}
          className="alumnosCard"
        />

        <Card
          title="ajustes"
          description="Configuración de valores"
          customColor="#78a1ca"
          icon={faGear}
          className="ajustesCard"
        />

        <Card
          title="proveedores"
          description="Gestión de proveedores"
          customColor="#32CD32"
          icon={faTools}
          className="proveedoresCard"
        />
      </div>
    </>
  )
}
