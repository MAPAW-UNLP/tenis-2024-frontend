import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//styles
import '../../styles/suspencionClase.css';
import '../../styles/mensajesUsuario.css'

//components
import NavBar from '../Navbar/NavBar';
import InputComponent from '../../components/Utils/InputComponent';

//Fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Url base de datos
const URL_BASE = `http://localhost:8083/api/`;

const PeriodoAusencia = ({ setSesion }) => {
  
  //navegacion
  const navigate = useNavigate();
  
  // Fecha inicio, fecha fin, motivo
  // Datos que se envian a la BD (se actualizan en tiempo real mientras son seleccionados)
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [motivo, setMotivo] = useState('');

  // Dia formateado para HTML
  const mes = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const day = ('0' + new Date().getDate()).slice(-2);
  const año = new Date().getFullYear();
  const today = `${año}-${mes}-${day}`;

  
  // <-------------- Manejadores (handlers) --------------->
  
  const handleFechaInicioChange = (e) => {
    e.preventDefault();
    setFechaInicio(e.target.value); // Se setea la fecha de inicio por la seleccionada.
  };

  const handleFechaFinChange = (e) => {
    e.preventDefault();
    setFechaFin(e.target.value);
  };

  const handleMotivoChange = (e) => {
    e.preventDefault();
    setMotivo(e.target.value);
  };

  // Manejador del botón submit.
  const handleSubmitContinue = (e) => {
    e.preventDefault();
    /* Datos que se envian a la BD: 
    ** Fecha inicio, fecha fin, motivo
    ** A: http://localhost:8083/api/periodo-ausencia 
    ** se les deben enviar los siguientes parámetros:
    **  {
    **    "fecha_ini": "2023-11-01",
    **    "fecha_fin": "2023-11-30",
    **    "motivo": "Me voy de vacaciones."
    **  }
    */

    // Comprueba si se pickearon los elementos necesarios (y minimos) para hacer el submit
    if (fechaInicio === '' || fechaFin === '' || motivo === ''){
      handleMostrarMensaje("Complete los campos obligatorios (marcados con *)");
      return []; // Retorna antes de hacer el fetch
    }

    // Muestra un mensaje de cargando y no permite clickear el boton de submit otra vez
    const mensajeCargandosubmit = document.getElementById('mensajeCargando-submit');
    mensajeCargandosubmit.style.display = '';
    const botonContinuar = document.getElementById('boton-continuar');
    botonContinuar.disabled = true;

    console.log("Ingresados: " + fechaInicio + " " + fechaFin + " " + motivo)
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ 
      fecha_ini: fechaInicio,
      fecha_fin: fechaFin,
      motivo: motivo,
    }), };
    fetch(`${URL_BASE}periodo-ausencia`, requestOptions)
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
      navigate('/misSolicitudesAusencia');
    }
    const mensajesUsuario = document.getElementById('mensajesUsuario');
    mensajesUsuario.style.display = 'none';
  }  

  // A la BD se envia: Fecha inicio, fecha fin, motivo.
  // Nota: Los estilos fueron copiados de "nueva clase", deberian cambiarse los ID
  return (
    <div id="nuevaClase-contenedorPrincipal">
      <NavBar title={'Crear periodo de ausencia'} setSesion={setSesion} />
      <div id="nuevaClase-contenedor">
        <button id="clase-closeBTN" onClick={() => navigate('../inicio')}>
          x
        </button>
        <h2>Crear periodo</h2>
        <div id="nuevaClase-component">
            <form action="" id="reserva-form" onSubmit={handleSubmitContinue}>
              <h5>Fecha inicio (*)</h5>
                <InputComponent
                  type={'date'}
                  id={'fechaInicio'}
                  className={'inputReserva'}
                  placeholder={'Fecha'}
                  onChangeFuncion={handleFechaInicioChange}
                  min={today}
                />
                <h5>Fecha fin (*)</h5>
                <InputComponent
                  type={'date'}
                  id={'fechaFin'}
                  className={'inputReserva'}
                  placeholder={'Fecha'}
                  onChangeFuncion={handleFechaFinChange}
                  min={fechaInicio}
                />
              <textarea
                id={'imput_motivo'}
                type="text" 
                onChange={handleMotivoChange} 
                placeholder="Motivo... (*)"
              />
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
            <button id="button-aceptarMensaje" onClick={handleCerrarMostrarMensaje} className='botones-MensajesUsuario'>
                Aceptar
            </button>
      </div>
    </div>
  );
};

export default PeriodoAusencia;
