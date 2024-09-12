import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//styles
import '../../styles/suspencionClase.css';
import '../../styles/mensajesUsuario.css';

//components
import NavBar from '../Navbar/NavBar';
import InputComponent from '../../components/Utils/InputComponent';

//Fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Url base de datos
const URL_BASE = `http://localhost:8083/api/`;

const SuspencionClase = ({ setSesion }) => {
  
  //navegacion
  const navigate = useNavigate();
  
  // Esta página utiliza: Fecha inicio, hora, motivo que son enviadas al backend.
  // Datos que se envian a la BD (se actualizan en tiempo real mientras son seleccionados)
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [motivo, setMotivo] = useState('');

  // Dia formateado para HTML
  const mes = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const day = ('0' + new Date().getDate()).slice(-2);
  const año = new Date().getFullYear();
  const today = `${año}-${mes}-${day}`;

  const horas = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]
  
  // <-------------- Manejadores (handlers) --------------->
  
  const handleFechaChange = (e) => {
    e.preventDefault();
    setFecha(e.target.value); // Se setea la fecha de inicio por la seleccionada.

  };

  const handleChangeHora = (e) => {
    e.preventDefault();
    setHoraInicio(e.target.value);
  };

  const handleChangeMotivo = (e) => {
    e.preventDefault();
    setMotivo(e.target.value);
  };

  // Manejador del botón submit.
  const handleSubmitContinue = (e) => {
    e.preventDefault();
    /* Datos que se envian a la BD: 
    ** 
    ** A http://localhost:8083/api/suspender-clase se le deben enviar los siguientes parámetros:
    ** {
        "fecha": "2023-10-30",
        "hora": "08:00",
        "motivo": "Debo ir al medico."
        }
    */

    // Comprueba si se pickearon los elementos necesarios (y minimos) para hacer el submit
    if (fecha === '' || horaInicio === '' || motivo === ''){
      handleMostrarMensaje("Complete los campos obligatorios (marcados con *)");
      return []; // Retorna antes de hacer el fetch
    }

    // Muestra un mensaje de cargando y no permite clickear el boton de submit otra vez
    const mensajeCargandosubmit = document.getElementById('mensajeCargando-submit');
    mensajeCargandosubmit.style.display = '';
    const botonContinuar = document.getElementById('boton-continuar');
    botonContinuar.disabled = true;

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ 
        fecha: fecha,
        hora: horaInicio,
        motivo: motivo,
      }),
    };
    fetch(`${URL_BASE}suspender-clase`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.clasesAnteriores)
        handleMostrarMensaje(data);
      })
  };

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

  // El siguiente segmento de código se utiliza para mostrarle mensajes al usuario.
  const [mensajeUsuario, setMensajeUsuario] = useState('Hola mundo!');

  const construirMensaje = (data) => {
    let mensaje = data.message + '\n' + " Clases anteriores: \n";
    mensaje += data.data.clasesAnteriores.map((clase) => {
      return (
        formatearFecha(clase.fecha) + " hora: " + formatearHora(clase.horaIni)
      );
    }).join('\n');

    if (data.data.clasesAnteriores.length == 0){
      mensaje += "No hay clases anteriores registradas"
    }
    mensaje += '\n' + " Clases posteriores: \n";

    mensaje += data.data.clasesPosteriores.map((clase) => {
      return (
        formatearFecha(clase.fecha) + " hora: " + formatearHora(clase.horaIni)
      );
    }).join('\n');

    if (data.data.clasesPosteriores.length == 0){
      mensaje += "No hay clases posteriores registradas"
    }

    return mensaje;
  };


  // Esté código puede ser muy emprolijado, se necesitaria recibir en códigos (números) desde el back que situación es la actual
  const handleMostrarMensaje = (data) => {
    // Muestra el mensaje al usuario
    const mensajesUsuario = document.getElementById('mensajesUsuario');

    // Si el mensaje es el de que le erró de reserva, se construye un mensaje con las clases anteriores y las posteriores.
    if (data.message == "No existe una reserva para el día y horario ingresado. Quizas quiso mencionar algunas de estas clases:"){
      setMensajeUsuario(construirMensaje(data));
    } else {
      setMensajeUsuario(data.message);
    }
    
    // Se ocultan/muestran los elementos correspondientes.
    mensajesUsuario.style.display = 'flex';
    const mensajeCargandosubmit = document.getElementById('mensajeCargando-submit');
    mensajeCargandosubmit.style.display = 'none';
    const botonContinuar = document.getElementById('boton-continuar');
    botonContinuar.disabled = false;
  }
  
  const handleCerrarMostrarMensaje  = (e) => {
    e.preventDefault();
    // (La manera en que se chequea si se creo la clase es bastante improvisada, se puede mejorar)
    if (mensajeUsuario == "Se ha enviado al administrador un pedido de suspensión de clase.") {
      navigate('/misSolicitudesSuspencion');
    }
    const mensajesUsuario = document.getElementById('mensajesUsuario');
    mensajesUsuario.style.display = 'none';
  }  

  // A la BD se envia: Fecha, hora inicio, motivo.
  return (
    <div id="nuevaClase-contenedorPrincipal">
      <NavBar title={'Suspención de clase'} setSesion={setSesion} />
      <div id="nuevaClase-contenedor">
        <button id="clase-closeBTN" onClick={() => navigate('../inicio')}>
          x
        </button>
        <h2>Suspender clase</h2>
        <div id="nuevaClase-component">
            <form action="" id="reserva-form" onSubmit={handleSubmitContinue}>
              <h5>Fecha (*)</h5>
                <InputComponent
                  type={'date'}
                  id={'fechaInicio'}
                  className={'inputReserva'}
                  placeholder={'Fecha'}
                  onChangeFuncion={handleFechaChange}
                  min={today}
                />
              <select 
                className={'inputReserva'} 
                id={'horaInicio'} 
                onChange={handleChangeHora}>
                <option value="">Hora (*)</option>
                {horas.map((hora, i) =>{if(i !== horas.length-1){return  <option key={hora}  value={hora}>{hora}</option> } else{return ""}})   }   
              </select>
              <textarea
                id={'imput_motivo'}
                type="text" 
                onChange={handleChangeMotivo} 
                placeholder="Motivo... (*)"
                style={{ resize: "none" }}
                />
            </form>
        </div>
        <button id="boton-continuar" onClick={handleSubmitContinue} disabled={false}> {' '}
          <FontAwesomeIcon id="next-icon" icon={faChevronRight} />{' '}
          <p id='mensajeCargando-submit' style={{display : 'none'}}>Cargando...</p>
        </button>
      </div>
      {/*El div "mensajes" es para mostrar mensajes al usuario, inicialmente está oculto*/}
      <div id="mensajesUsuario" style={{display : 'none'}}>
            <p>{mensajeUsuario}</p>
            <button id="button-aceptarMensaje" onClick={handleCerrarMostrarMensaje} className='botones-MensajesUsuario'>
                Aceptar
            </button>
      </div>
    </div>
  );
};

export default SuspencionClase;
