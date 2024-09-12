import React from 'react';
import { useNavigate } from 'react-router-dom';
//styles
import '../../styles/ausencias.css';

//components
import NavBar from '../Navbar/NavBar';

const CrearClase = ({ setSesion }) => {
  
  //navegacion
  const navigate = useNavigate();
  
  return (
    <div id="ausencias-contenedorPrincipal">
      <NavBar title={'Ausencias y suspenciones'} setSesion={setSesion} />
      <div id="ausencias-contenedor">
        {/* Este boton tiene que llevar a mis clases, pagina que esta en desarrollo */}
        <button id="clase-closeBTN" onClick={() => navigate('../inicio')}>
          x
        </button>
        <h2>Ausencias y solicitudes de suspención</h2>
        <div id="ausencias-component">
            <button id="solicitar-Button" onClick={() => navigate('../suspencionClase')}>
                Solicitar suspención de clase
            </button>
            <button id="solicitar-Button" onClick={() => navigate('../periodoAusencia')}>
                Solicitar periodo de ausencia
            </button>
            <button id="solicitar-Button" onClick={() => navigate('../misSolicitudesSuspencion')}>
                Mis solicitudes de suspención de clase
            </button>
            <button id="solicitar-Button" onClick={() => navigate('../misSolicitudesAusencia')}>
                Mis solicitudes de periodos de ausencia
            </button>
        </div>
      </div>
    </div>
  );
};

export default CrearClase;