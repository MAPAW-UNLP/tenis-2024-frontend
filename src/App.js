import { Login } from './pages/Login/Login'
import { HomeRe } from './pages/Home/HomeRe'
import { Canchas } from './pages/Cancha/Canchas'
import { Reservas } from './pages/Reserva/Reservas'
import { Profesores } from './pages/Profesor/Profesores'
import { Cobros } from './pages/Cobros/Cobros'
import { Pagos } from './pages/Pagos/Pagos'
import { Balance } from './pages/Balance/Balance'
import CrearClase from './pages/CrearClase'
import { Movimientos } from './pages/Movimientos/Movimientos'
import SuspencionClase from './pages/AusenciasSuspenciones/SuspencionClase'
import PeriodoAusencia from './pages/AusenciasSuspenciones/PeriodoAusencia'
import SolicitudesSuspencion from './pages/AusenciasSuspenciones/SolicitudesSuspencion'
import SolicitudesAusencias from './pages/AusenciasSuspenciones/SolicitudesAusencias'
import Ausencias from './pages/AusenciasSuspenciones/Ausencias'

//VarianteHome
import HomeVariant from './pages/Reserva/HomeVariant'

//Style
import './styles/App.css'

//routes react
import { Routes, Route } from 'react-router-dom'
import { Ajustes } from './pages/Ajustes/Ajustes'
import { AlumnosNew } from './pages/Alumno/AlumnosNew'
import Proveedores from 'pages/Proveedores/Proveedores'

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header"></header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<HomeRe />} />
          <Route path="/reservas" element={<HomeVariant />} />
          <Route path="/canchas" element={<Canchas />} />
          <Route path="/alumnos" element={<AlumnosNew />} />
          <Route path="/profesores" element={<Profesores />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/cobros" element={<Cobros />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/movimientos" element={<Movimientos />} />
          <Route path="/nuevaReserva" element={<Reservas />} />
          <Route path="/crearClase" element={<CrearClase />} />
          <Route path="/ajustes" element={<Ajustes />} />
          <Route path="/periodoAusencia" element={<PeriodoAusencia />} />
          <Route path="/suspencionClase" element={<SuspencionClase />} />
          <Route
            path="/misSolicitudesSuspencion"
            element={<SolicitudesSuspencion />}
          />
          <Route
            path="/misSolicitudesAusencia"
            element={<SolicitudesAusencias />}
          />
          <Route path="/ausencias" element={<Ausencias />} />
        </Routes>
      </div>
    </>
  )
}

export default App
