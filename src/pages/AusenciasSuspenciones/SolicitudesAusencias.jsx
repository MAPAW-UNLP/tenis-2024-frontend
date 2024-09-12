import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//styles
import '../../styles/solicitudes.css';
import '../../styles/mensajesUsuario.css'
//components
import NavBar from '../Navbar/NavBar';

//Fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Url base de datos
const URL_BASE = `http://localhost:8083/api/`;

const SolicitudesAusencias = ({ setSesion }) => {
  //navegacion
  const navigate = useNavigate();

  // Variable para indicar si los datos se están cargando
  const [cargando, setCargando] = useState(true);
  
  // Variable y fetch de las solicitudes
  const [solicitudes, setSolicitudes] = useState([]);
  // GET Solicitudes
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}mis-periodos-ausencia`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setSolicitudes(data.data);
        setCargando(false); // Marcamos que los datos han terminado de cargar
      })
  }, [solicitudes]);

  // <--- Funciones para formatear los datos traidos del backend para mostrarlos correctamente: --->
  const formatearFecha = (fecha) => {
    // Corta la fecha por 'T' y retorna la primera parte
    return fecha.split('T')[0];
  };
  const obtenerEstado = (estadoId) => {
    switch (estadoId) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'Aprobada';
      case 3:
        return 'Desaprobada';
      default:
        return '';
    }
  };
  // ------------------- Fin funciones para formatear datos -------------------------
  

  // <--- Sección de manejo del borrado de solicitudes: --->
  
  const [solicitudPorBorrar, setSolicitudPorBorrar] = useState([null]); // Los datos de la solicitud a borrar son cargados en esta variable en tiempo real
  const [mensajeUsuario, setMensajeUsuario] = useState('Hola mundo!'); // Mensaje que va a mostrarse al usuario

  const handleEliminarSolicitud  = (dato) => {
    setSolicitudPorBorrar(dato);
    handleMostrarMensajeConfirmacion(dato);
  }

  const handleMostrarMensajeConfirmacion = (dato) => {
    // Muestra el mensaje de confirmación al usuario
    const mensajesUsuario = document.getElementById('mensajesUsuario');
    setMensajeUsuario("Está por eliminar la solicitud de ausencia con fecha inicial: " + formatearFecha(dato.fechaIni) + " y fecha fin: " + formatearFecha(dato.fechaFin));
    mensajesUsuario.style.display = 'flex';
  }
  
  const handleCerrarMostrarMensajeConfirmacion  = (e) => {
    e.preventDefault();
    const mensajesUsuario = document.getElementById('mensajesUsuario');
    mensajesUsuario.style.display = 'none';
  }

  const handleAceptarBorrado = (e) => {
    setCargando(true);
    const requestOptions = {
      method: 'DELETE',
    };
    fetch(`${URL_BASE}eliminar-periodo-ausencia/`+ solicitudPorBorrar.id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCargando(false); // Marcamos que los datos han terminado de cargar
      })
    handleCerrarMostrarMensajeConfirmacion(e);
  }
  
  return (
    <div id="solicitudes-contenedorPrincipal">
      <NavBar title={'Solicitudes de periodos de ausencia'} setSesion={setSesion} />
      <div id="solicitudes-contenedor">
        <button id="clase-closeBTN" onClick={() => navigate('../inicio')}>
          x
        </button>
        <h2>Mis solicitudes</h2>
        <div id="solicitudes-component">
        {cargando ? (
              <p className='mensajeTablaVacia-Cargando'>Cargando...</p>
            ) : (
            <div id="contenedor-tabla">
              {solicitudes.length > 0 ? (
                <table id="tablaSolicitudes">
                    <thead>
                        <tr>
                            <th>Fecha inicio</th>
                            <th>Fecha fin</th>
                            <th>Estado</th>
                            <th>Motivo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudes.map((dato, index) => (
                        <tr key={index}>
                            <td>{formatearFecha(dato.fechaFin)}</td>
                            <td>{formatearFecha(dato.fechaIni)}</td>
                            <td>{obtenerEstado(dato.estadoId)}</td>
                            <td>{dato.motivo}</td>
                            <td>
                              <div id={'contenedor-buttonEliminarTablaSolicitudes'}>
                                <button id={'button-eliminarTablaSolicitudes'}onClick={() => handleEliminarSolicitud(dato)} >
                                    <p>Eliminar <FontAwesomeIcon id="trash-icon" icon={faTrash} /></p>{' '}
                                </button>
                              </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                ) : (
                  <p className='mensajeTablaVacia-Cargando'>No hay solicitudes para mostrar.</p>
                )}
            </div>
          )}
        </div>
      </div>
      {/*El div "mensajes" es para mostrar mensajes al usuario, inicialmente está oculto y por defecto es rojo (para errores)*/}
      <div id="mensajesUsuario" style={{display : 'none'}}>
            <p>{mensajeUsuario}</p>
            <button id="button-aceptarMensaje" onClick={handleAceptarBorrado} className='botones-MensajesUsuario'>
                Aceptar
            </button>
            <button id="button-cerrarMensaje" onClick={handleCerrarMostrarMensajeConfirmacion} className='botones-MensajesUsuario'>
                Cancelar
            </button>
      </div>
    </div>
  );
};

export default SolicitudesAusencias;