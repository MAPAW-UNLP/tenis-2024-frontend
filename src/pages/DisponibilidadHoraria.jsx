import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import '../styles/suspencionClase.css';
import '../styles/mensajesUsuario.css'

//components
import NavBar from './Navbar/NavBar';

//Fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Url base de datos
const URL_BASE = `http://localhost:8083/api/`;

export const DisponibilidadHoraria = ({ setSesion }) => {
  
  //navegacion
  const navigate = useNavigate();
  
  // Fecha inicio, fecha fin, motivo
  // Datos que se envian a la BD (se actualizan en tiempo real mientras son seleccionados)
  const [dias, setDias] = useState([]);
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  
  // Dia formateado para HTML
  const mes = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const day = ('0' + new Date().getDate()).slice(-2);
  const año = new Date().getFullYear();
  const today = `${año}-${mes}-${day}`;

  // <-------------- Manejadores (handlers) --------------->
  const handleChangeHoraInicio = (e) => {
    setHoraInicio(e.target.value);
  }
  
  const handleHoraFinChange = (e) => {
    e.preventDefault();
    setHoraFin(e.target.value);
  };

  const diasCheckboxChange = (e) => {
    // Este código realiza la actualización de los dias elegidos en tiempo real, es decir apenas se hace el click.
    setDias((prevDias) => {
      const updatedDias = prevDias.includes(e.target.value)
        ? prevDias.filter((dia) => dia !== e.target.value)
        : [...prevDias, e.target.value];
  
      //console.log(e.target.value);
      //console.log(updatedDias);
      return updatedDias;
    });
  }

  // Manejador del botón submit.
  const handleSubmitContinue = (e) => {
    e.preventDefault();
    /* Cargar horarios disponibles:
        Endpoint: http://localhost:8083/api/horario/disponible
        Formato de datos a enviar:
          {
            "selectedDays": ["martes", "jueves"],
            "horaInicio": "08:00",
            "horaFin": "12:00"
          }
    */

    // Comprueba si se pickearon los elementos necesarios (y minimos) para hacer el submit
    console.log(dias.length)
    if (horaInicio === '' || horaFin === '' || dias.length === 0){
      handleMostrarMensaje("Complete los campos obligatorios (marcados con *)");
      return []; // Retorna antes de hacer el fetch
    }

    // Muestra un mensaje de cargando y no permite clickear el boton de submit otra vez
    const mensajeCargandosubmit = document.getElementById('mensajeCargando-submit');
    mensajeCargandosubmit.style.display = '';
    const checkboxes = document.getElementsByClassName("checkbox-diaSemanal");
    for (const checkbox of checkboxes) {
      checkbox.disabled = true;
    }
    const horaInicioElement = document.getElementById('horaInicio')
    horaInicioElement.disabled = true;
   
    const botonContinuar = document.getElementById('boton-continuar');
    botonContinuar.disabled = true;

    const horaFinElement = document.getElementById('horaFin')
    horaFinElement.disabled = true;

    const requestOptions = {
      method: 'POST',
       body: JSON.stringify({ 
        horaInicio: horaInicio,
         horaFin: horaFin,
         selectedDays: dias,
     }), };
     fetch(`${URL_BASE}horario/disponible`, requestOptions)
        .then((response) => response.json())
        .then((data) => handleMostrarMensaje(data.message))
  };

  // El siguiente segmento de código se utiliza para mostrarle mensajes al usuario.
  const [mensajeUsuario, setMensajeUsuario] = useState('Hola mundo!');

  const handleMostrarMensaje = (message) => {
    // Muestra el mensaje al usuario
    const mensajesUsuario = document.getElementById('mensajesUsuario');
    setMensajeUsuario(message);
  
    // Si el mensaje no es de exito se muestra rojo, hay maneras más elegantes de hacer esto.
    if (message != "Se ha enviado al administrador un pedido de ausencia.") {
      mensajesUsuario.style.borderColor = "#f14c4c";
    }
    mensajesUsuario.style.display = 'flex';
    
    // Si existia el mensaje de "cargando", lo oculta y habilita el boton de submit
    const mensajeCargandosubmit = document.getElementById('mensajeCargando-submit');
    mensajeCargandosubmit.style.display = 'none';
    const botonContinuar = document.getElementById('boton-continuar');
    botonContinuar.disabled = false;
  }
  
  const handleCerrarMostrarMensaje  = (e) => {
    e.preventDefault();
    // Cuando se "acepta" se cierran los mensajes, 
    // en caso de que se haya concretado la solicitud del periodo sin problemas, 
    // redirecciona al usuario al inicio
    // (La manera en que se chequea si se creo la clase es bastante improvisada, se puede mejorar)
    if (mensajeUsuario == "Se ha enviado al administrador un pedido de ausencia.") {
      navigate('/inicio');
    }
    const mensajesUsuario = document.getElementById('mensajesUsuario');
    mensajesUsuario.style.display = 'none';
  }  

  const horas = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]

  // A la BD se envia: Fecha inicio, fecha fin y dias de disponibilidad.
  // Nota: Los estilos fueron copiados de "nueva clase", deberian cambiarse los ID
  return (
    <div id="nuevaClase-contenedorPrincipal">
      <NavBar title={'Disponibilidad horaria'} setSesion={setSesion} />
      <div id="nuevaClase-contenedor">
        <button id="clase-closeBTN" onClick={() => navigate('../inicio')}>
          x
        </button>
        <h2>Establecer disponibilidad horaria</h2>
        <div id="nuevaClase-component">
            <form action="" id="reserva-form" onSubmit={handleSubmitContinue}>  
                <div id={"contenedor-diasSemana"}>
                    <h5>Seleccionar días (*)</h5>
                    <label className="checkbox-container">
                        <input
                            id="checkbox-diaSemanal"
                            className="checkbox-diaSemanal"
                            type="checkbox"
                            onChange={diasCheckboxChange}
                            value={"lunes"}
                        />
                        <span className="checkmark">L</span>
                    </label>
                    <label className="checkbox-container">
                        <input
                            id="checkbox-diaSemanal"
                            className="checkbox-diaSemanal"
                            type="checkbox"
                            onChange={diasCheckboxChange}
                            value={"martes"}
                        />
                        <span className="checkmark">M</span>
                    </label>
                    <label className="checkbox-container">
                        <input
                            id="checkbox-diaSemanal"
                            className="checkbox-diaSemanal"
                            type="checkbox"
                            onChange={diasCheckboxChange}
                            value={"miercoles"}
                        />
                        <span className="checkmark">X</span>
                    </label>
                    <label className="checkbox-container">
                        <input
                            id="checkbox-diaSemanal"
                            className="checkbox-diaSemanal"
                            type="checkbox"
                            onChange={diasCheckboxChange}
                            value={"jueves"}
                        />
                        <span className="checkmark">J</span>
                    </label>
                    <label className="checkbox-container">
                        <input
                            id="checkbox-diaSemanal"
                            className="checkbox-diaSemanal"
                            type="checkbox"
                            onChange={diasCheckboxChange}
                            value={"viernes"}
                        />
                        <span className="checkmark">V</span>
                    </label>
                    <label className="checkbox-container">
                        <input
                            id="checkbox-diaSemanal"
                            className="checkbox-diaSemanal"
                            type="checkbox"
                            onChange={diasCheckboxChange}
                            value={"sabado"}
                        />
                        <span className="checkmark">S</span>
                    </label>
                    <label className="checkbox-container">
                        <input
                            id="checkbox-diaSemanal"
                            className="checkbox-diaSemanal"
                            type="checkbox"
                            onChange={diasCheckboxChange}
                            value={"domingo"}
                        />
                        <span className="checkmark">D</span>
                    </label>
                </div>
                <select name="" className={'inputReserva'} id={'horaInicio'} onChange={handleChangeHoraInicio} >
                    <option value="">Hora inicio (*)</option>
                    {horas.map((hora, i) =>{if(i !== horas.length-1){return  <option key={hora}  value={hora}>{hora}</option> }})   }   
                </select>
                <select name="" className={'inputReserva'} id={'horaFin'} onChange={handleHoraFinChange} >
                    <option value="">Hora fin (*)</option>
                    {horas .slice(horas.findIndex((hora) => hora === horaInicio) + 1) // Filtra las horas después de horaInicio
                    .map((hora) => ( <option key={hora} value={hora}> {hora} </option> ))}   
                </select>
            </form>
        </div>
        <button id="boton-continuar" onClick={handleSubmitContinue} disabled={false}> {' '}
          <FontAwesomeIcon id="next-icon" icon={faChevronRight} />{' '}
          <p id='mensajeCargando-submit' style={{display : 'none'}}>Cargando...</p>
        </button>
      </div>
      {/*El div "mensajes" es para mostrar mensajes al usuario, inicialmente está oculto y por defecto es rojo (para errores)*/}
      <div id="mensajesUsuario" style={{display : 'none'}}>
            <p>{mensajeUsuario}</p>
            <button id="button-cerrarMensaje" onClick={handleCerrarMostrarMensaje}>
                Aceptar
            </button>
      </div>
    </div>
  );
};

export default DisponibilidadHoraria;
