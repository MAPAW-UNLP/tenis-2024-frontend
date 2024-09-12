import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//styles
import '../styles/misPagos.css';
import '../styles/mensajesUsuario.css'
//components
import NavBar from './Navbar/NavBar';
// Url base de datos
const URL_BASE = `http://localhost:8083/api/`;

export const MisPagos = ({setSesion}) => {
  //navegacion
  const navigate = useNavigate();
  
  // Variable y fetch de las solicitudes
  const [solicitudes, setSolicitudes] = useState([]);
  
  // GET Solicitudes
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}mis-solicitudes`, requestOptions)
      .then((response) => response.json())
      .then((data) => setSolicitudes(data.data))
  }, [solicitudes]);

  // <--- Funciones para formatear los datos traidos del backend para mostrarlos correctamente: --->
  const formatearFecha = (fecha) => {
    // Corta la fecha por 'T' y retorna la primera parte
    return fecha.split('T')[0];
  };
  const formatearHora = (hora) => {
    // Corta la hora por 'T' y se queda con la segunda parte
    const horaSinCeros = hora.split('T')[1];
    // Corta por ':' y retorna las dos primeras secciones
    const seccionesHora = horaSinCeros.split(':');
    return `${seccionesHora[0]}:${seccionesHora[1]}`;
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
    setMensajeUsuario("Está por eliminar el pedido de suspención de la clase con fecha: " + formatearFecha(dato.fecha) + " y hora: " + formatearHora(dato.hora));
    mensajesUsuario.style.display = 'flex';
  }
  
  const handleCerrarMostrarMensajeConfirmacion  = (e) => {
    e.preventDefault();
    const mensajesUsuario = document.getElementById('mensajesUsuario');
    mensajesUsuario.style.display = 'none';
  }

  const handleAceptarBorrado = (e) => {
    const requestOptions = {
      method: 'DELETE',
    };
    fetch(`${URL_BASE}eliminar-suspender-clase/`+ solicitudPorBorrar.id, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))

    handleCerrarMostrarMensajeConfirmacion(e);
  }
  
  return (
    <div id="solicitudes-contenedorPrincipal">
      <NavBar title={'Mis pagos'} setSesion={setSesion} />
        <div id="solicitudes-contenedor">
            <h2>Próximo a cobrar</h2>
                <div id="solicitudes-component">
                    <div id="contenedor-tabla">
                        <table id="tablaSolicitudes">
                            <tbody>
                                <tr>
                                    <td><p>Monto: 12.000$</p></td>
                                    <td><p>Clases: 12</p></td>
                                    <td><p>Periodo: 12/11/2023 - 04/12/2023</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
        <div id="solicitudes-contenedor">
            <h2>Historial de pagos</h2>
                <div id="solicitudes-component">
                    <div id="contenedor-tabla">
                        <table id="tablaSolicitudes">
                            <thead>
                                <tr>
                                    <th>Periodo</th>
                                    <th>Cantidad clases</th>
                                    <th>Monto</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {solicitudes.map((dato, index) => (
                                <tr key={index}>
                                    <td>{formatearFecha(dato.fecha)}</td>
                                    <td>{formatearHora(dato.hora)}</td>
                                    <td>{obtenerEstado(dato.estadoId)}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
      {/*El div "mensajes" es para mostrar mensajes al usuario, inicialmente está oculto y por defecto es rojo (para errores)*/}
      <div id="mensajesUsuario" style={{display : 'none'}}>
            <p>{mensajeUsuario}</p>
            <button id="button-cerrarMensaje" onClick={handleAceptarBorrado}>
                Aceptar
            </button>
            <button id="button-cerrarMensaje" onClick={handleCerrarMostrarMensajeConfirmacion}>
                Cancelar
            </button>
      </div>
    </div>
  );
}

export default MisPagos;