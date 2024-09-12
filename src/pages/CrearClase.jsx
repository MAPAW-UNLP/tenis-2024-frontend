import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//styles
import '../styles/crearClase.css';
import '../styles/mensajesUsuario.css'
//utils
import { ordenarPorNombre } from '../components/Utils/Functions';
//hora
import SelectHoraInicio from '../components/Utils/Alquiler/SelectHoraInicio';
import SelectHoraFin from '../components/Utils/Alquiler/SelectHoraFin';
//components
import NavBar from './Navbar/NavBar';
import InputComponent from '../components/Utils/InputComponent';
import SelectComponent from '../components/Utils/SelectComponent';
import Select from 'react-select';

//Fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Url base de datos
const URL_BASE = `http://localhost:8083/api/`;

// Crear clase recibe por parámetro:
// Las canchas, las reservas (para comprobar disponibilidad), y los alumnos.
const CrearClase = ({ setSesion }) => {
  
  //navegacion
  const navigate = useNavigate();
  
  // Fecha inicio, repeticion, fecha fin, hora inicio, hora fin, cancha, alumnos
  // Datos que se envian a la BD (se actualizan en tiempo real mientras son seleccionados)
  const [fechaInicio, setFechaInicio] = useState('');
  const [repeticion, setRepeticion] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [cancha, setCancha] = useState('');
  const [alumnosSelec, setAlumnosSelec] = useState([]);
  
  const [alumnos, setAlumnos] = useState([]);
  const [actAlumnos, setActAlumnos] = useState(false);
  const [canchas, setCanchas] = useState([])
  const [actCanchas, setActCanchas] = useState(false);

  // Dia formateado para HTML
  const mes = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const day = ('0' + new Date().getDate()).slice(-2);
  const año = new Date().getFullYear();
  const today = `${año}-${mes}-${day}`;

  // GET alumnos
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}alumnos`, requestOptions)
      .then((response) => response.json())
      .then((data) => setAlumnos(ordenarPorNombre(data.detail)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actAlumnos]);

  // GET canchas
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}canchas`, requestOptions)
      .then((response) => response.json())
      .then((data) => setCanchas(data.detail))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actCanchas]);

  // Manejadores (handles) de las variables que son enviadas a la BD.
  // En orden: Fecha inicio, repeticion, fecha fin, hora inicio, hora fin, cancha, alumnos.
  
  const handleFechaInicioChange = (e) => {
    e.preventDefault();
    setFechaInicio(e.target.value); // Se setea la fecha de inicio por la seleccionada.

    // Al elegir un dia de inicio se habilitan los selectores de "hora de inicio" y de "repeticion"
    const horaInicio = document.getElementById('horaInicio');
    e.target.value === ''
      ? (horaInicio.disabled = true)
      : (horaInicio.disabled = false);
      const selectorRepeticion = document.getElementById('selectorRepeticion');
    e.target.value === ''
      ? (selectorRepeticion.disabled = true)
      : (selectorRepeticion.disabled = false);
  };

  const handleRepeticionChange = (e) => {
    e.preventDefault();

    // Si la repeticion fue establecida en "No se repite" la BD espera "No"
    if (e.target.value !== 'Todas las semanas' && e.target.value !== 'Todos los meses'){
      setRepeticion("No");
    } else {
      setRepeticion(e.target.value); // Se setea la repetición por las seleccionada.
    }
    
    // Si elige que haya repeticion, se activa el botón de "fecha fin"
    const fechaFin = document.getElementById('fechaFin');
    if (e.target.value === 'Todas las semanas' || e.target.value === 'Todos los meses'){
      fechaFin.disabled = false;
      setFechaFin(fechaFin.value); // Contempla si cambio de opinion después de elegir la fecha de fin
    } else {
      fechaFin.disabled = true;
      setFechaFin(''); // Contempla si cambio de opinion después de elegir la fecha de fin
    }
  };

  const handleFechaFinChange = (e) => {
    e.preventDefault();
    setFechaFin(e.target.value);
  };

  // El manejador de la hora de inicio esta en el código de ese imput.

  const handleHoraFinChange = (e) => {
    e.preventDefault();
    setHoraFin(e.target.value);
  };

  const handleSelectorCancha = (e) => {
    e.preventDefault();
    setCancha(e.target.value);
  }

  const handleSelectorAlumnosChange = (event) => {
    // Manejador de los checkbox para cada alumno.
    // Agrega los alumnos marcados (chequed) a un arreglo.
    const { value, checked } = event.target;

    // Actualiza el estado según si el checkbox está marcado o desmarcado
    if (checked) {
      setAlumnosSelec([...alumnosSelec, value]);
    } else {
      setAlumnosSelec(alumnosSelec.filter((alumno) => !alumno.startsWith(value)));
    }
  };

  // <-------------- Funciones extras --------------->

  // Esta funcion separa los nombres de los alumnos de sus ID para enviarselo a la BD.
  const convertirAlumnosEnId = () => {
    const idsAlumnos = alumnosSelec.map(alumno => {
      const partes = alumno.split(" "); // Divide la cadena por espacios
      const id = partes[partes.length - 1];
      return parseInt(id, 10); // Convierte la cadena en un entero (base 10)
    });
    return idsAlumnos;
  }

  // <-------------- Otros manejadores: --------------->

  // Manejador del botón submit.
  const handleSubmitContinue = (e) => {
    e.preventDefault();
    /* Datos que se envian a la BD: 
    ** Fecha inicio, repeticion, fecha fin, hora inicio, hora fin, cancha, alumnos.
    ** El formato como espera recibir los datos la BD es el siguiente:
    **
              "fecha_ini": "2023-09-01",
              "fecha_fin": "2024-09-01",
              "hora_ini": "09:00",
              "hora_fin": "10:00",
              "repite": "No", ('Todas las semanas' ; 'Todos los meses')
              "cancha_id": 1,
              "alumnos": [2, 3, 4]
    */
    
    // Como la base de datos espera solo los ID de los alumnos se los separa de su nombre
    const alumnosId = convertirAlumnosEnId();

    // Comprueba si se pickearon los elementos necesarios (y minimos) para hacer el submit
    if (fechaInicio === '' || horaInicio === '' || horaFin === '' || cancha === ''){
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
        fecha_ini: fechaInicio,
        fecha_fin: fechaFin,
        hora_ini: horaInicio,
        hora_fin: horaFin,
        repite: repeticion, 
        cancha_id: cancha,
        alumnos: alumnosId
      }),
    };
    fetch(`${URL_BASE}profesor-reserva`, requestOptions)
      .then((response) => response.json())
      .then((data) => handleMostrarMensaje(data.data.message))
      //.finally((response) => console.log(response.json()));
      // Aca deberia actualizar las clases de la app
      //.finally((response) => setActClases((v) => !v));
  };

  const handleChangeAlumnoMultSelect = (e) => {
    console.log('Selecciono alumno ', e)
  }

  // El siguiente segmento de código se utiliza para mostrarle mensajes al usuario.
  const [mensajeUsuario, setMensajeUsuario] = useState('Hola mundo!');

  const handleMostrarMensaje = (message) => {
    // Muestra el mensaje al usuario
    const mensajesUsuario = document.getElementById('mensajesUsuario');
    setMensajeUsuario(message);
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
    // en caso de que se haya creado la clase sin problemas, redirecciona al usuario al inicio
    // (La manera en que se chequea si se creo la clase es bastante improvisada, se puede mejorar)
    if (mensajeUsuario == "Reserva registrada con éxito") {
      navigate('/inicio');
    }
    const mensajesUsuario = document.getElementById('mensajesUsuario');
    mensajesUsuario.style.display = 'none';
  }  

  // A la BD se envia: Fecha inicio, repeticion, fecha fin, hora inicio, hora fin, cancha, alumnos (sus id).
  return (
    <div id="nuevaClase-contenedorPrincipal">
      <NavBar title={'Nueva clase'} setSesion={setSesion} />
      <div id="nuevaClase-contenedor">
        {/* Este boton tiene que llevar a mis clases, pagina que esta en desarrollo */}
        <button id="clase-closeBTN" onClick={() => navigate('../inicio')}>
          x
        </button>
        <h2>Crear clase</h2>
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
              <SelectComponent
                className={'inputReserva'}
                id={'selectorRepeticion'}
                onChange={handleRepeticionChange}
                options={['No se repite', 'Todas las semanas', 'Todos los meses']}
                deshabilitado={true}
                placeholder={'Seleccionar tipo de repetición'}
              />
              <h5>Fecha fin</h5>
              <InputComponent
                type={'date'}
                id={'fechaFin'}
                className={'inputReserva'}
                placeholder={'Fecha'}
                onChangeFuncion={handleFechaFinChange}
                deshabilitado={true}
                min={fechaInicio}
              />      
              <SelectHoraInicio
                id={'horaInicio'}
                className={'inputReserva'}
                setHoraInicio={setHoraInicio}
              />
              <SelectHoraFin
                id={'horaFin'}
                className={'inputReserva'}
                setHoraFin={setHoraFin}
                horaInicio={horaInicio}
                onChangeFuncion={handleHoraFinChange}
              />
              <select
                type="select"
                className={'inputReserva'}
                id={'selectorCancha'}
                placeholder={'Seleccionar cancha (*)'}
                onChange={handleSelectorCancha}
              >
                <option>Seleccionar cancha (*)</option>
                {canchas.map((cancha) => <option value={cancha.id} key={cancha.id}>{cancha.nombre}</option>)}
              </select>
              <Select className='inputReserva' isMulti onChange={handleChangeAlumnoMultSelect} options={alumnos.map((el)=> ({label:el.nombre, value:el.id}))} placeholder="Seleccionar alumnos">
              </Select>
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

export default CrearClase;
