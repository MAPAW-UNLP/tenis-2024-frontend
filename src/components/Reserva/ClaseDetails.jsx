import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import '../../styles/claseDetail.css';
//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faPenToSquare,
  faCalendar,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
//components
import SelectAlumnosAddClase from '../SelectAlumnosAddClase';
import FeedbackText from '../FeedbackText';
import LoaderSpinner from '../LoaderSpinner';
import Select from 'react-select';
import EditFechaYHoraController from './EditFechaYHoraController';
import SelectorDeAlumnosDeClase from './SelectorDeAlumnosDeClase';

const ClaseDetails = ({
  reserva,
  diaReserva,
  setClaseDetail,
  alumnosDeLaClase,
  setAlumnosDeLaClase,
  profeClase,
  setProfeClase,
  alumnos,
  profesores,
  setActReservas,
}) => {
  const [active, setActive] = useState();

  const [horaInicio, setHoraInicio] = useState('');
  const [horaFinal, setHoraFinal] = useState('');
  const [diaElegido, setDiaElegido] = useState('');

  const [alumnosBtnActive, setAlumnosBtnActive] = useState();

  const dias = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  const [selectActive, setActiveSelect] = useState(false);
  const [actProfe, setActProfe] = useState(null);
  const [idReserva, setIdReserva] = useState('');

  const [profeLoader, setProfeLoader] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAlumno = (indexItem) => {
    setAlumnosDeLaClase((prevState) =>
      prevState.filter((alu, index) => index !== indexItem)
    );
    //aca vamos a deletear al alumno de la clase
  };

  const handleEditProfe = (e) => {
    console.log(e.target.value);
    /*setProfeClase(parseInt(e.target.value));*/
    setActProfe(parseInt(e.target.value));
  };

  const handleEditAlumnos = (e) => {
    console.log('Selecciono alumnos ', e);
    setAlumnosDeLaClase(e.map((i) => i.value));
    console.log(alumnosDeLaClase);
  };

  const formateoFecha = (fecha) => {
    const numeroDia = new Date(fecha).getDay();
    const nombreDia = dias[numeroDia];

    const destructFecha = fecha.split('-');
    return `${nombreDia} ${destructFecha[2]}/${destructFecha[1]}`;
  };

  const clasePasada = (fecha) => {
    return fecha.split('-').join('') < moment(new Date()).format('YYYYMMDD');
  };

  const setClassActive = () => {
    setActive(true);
    const background = document.getElementById('clase-detail-futuro');
    const componente = document.getElementById('clase-btn-background');
    console.log(componente);
    background.classList.add('active');
    componente.classList.add('active');
  };

  const activeAddAlumnos = () => {
    setAlumnosBtnActive(true);
    const background = document.getElementById('clase-detail-futuro');
    const componenteSuperior = document.getElementById('clase-btn-background');
    const componente = document.getElementById('addAlumnosDiv');
    const father = document.getElementById('clase-detail-component');
    const alumnosList = document.getElementById('alumnosList');
    console.log(componente);
    father.classList.add('activeAlumnos');
    alumnosList.classList.add('activeAlumnos');
    background.classList.add('activeAlumnos');
    componenteSuperior.classList.add('activeAlumnos');
    componente.classList.add('activeAlumnos');
  };

  const desactivateAddAlumnos = () => {
    setAlumnosBtnActive(false);
    const background = document.getElementById('clase-detail-futuro');
    const componenteSuperior = document.getElementById('clase-btn-background');
    const componente = document.getElementById('addAlumnosDiv');
    const father = document.getElementById('clase-detail-component');
    const alumnosList = document.getElementById('alumnosList');
    console.log(componente);
    father.classList.remove('activeAlumnos');
    alumnosList.classList.remove('activeAlumnos');
    background.classList.remove('activeAlumnos');
    componenteSuperior.classList.remove('activeAlumnos');
    componente.classList.remove('activeAlumnos');
  };
  const cerrarEdicion = () => {
    setAlumnosBtnActive(false);
    setActive(false);
    const componente = document.getElementById('clase-btn-background');
    const background = document.getElementById('clase-detail-futuro');
    background.classList.remove('active');
    componente.classList.remove('active');
  };

  const cerrarDetalles = () => {
    cerrarEdicion();
    setClaseDetail({});
    setHoraFinal('');
    setHoraInicio('');
    setDiaElegido('');
  };

  const actualizarClase = () => {
    //Aca agarrar todos los datos que tiene detalles y hacer un POST a la API, el unico problema es que los IDs de los usuarios no vienen a la front
    const URL_BASE = 'http://localhost:8083/api/';
    const alumnos_ID = alumnosDeLaClase.map((el) => el.id);
    const params = new URLSearchParams();
    const profeDefault = document.getElementById('idProfeSelected').value;

    params.append('reserva_id', reserva.reservaId);
    params.append('hora_ini', horaInicio);
    params.append('hora_fin', horaFinal);
    params.append('fecha', diaElegido);
    actProfe == null
      ? params.append('persona_id', profeDefault)
      : params.append('persona_id', actProfe);
    params.append('grupo_ids', alumnos_ID);
    console.log(params);

    const requestOptions = {
      method: 'PUT',
      body: params,
    };
    fetch(`${URL_BASE}clase_reserva`, requestOptions)
      .then((response) => setActReservas((v) => !v))
      .then((response) => setClaseDetail((v) => !v))
      .finally(navigate('/reservas'));
  };

  const editProfe = () => {
    const URL_BASE = 'http://localhost:8083/api/';
    const params = new URLSearchParams();
    params.append('reserva_id', reserva.reservaId);
    params.append('persona_id', actProfe);
    console.log('Acutalizando las reservas');

    const requestOptions = {
      method: 'PUT',
      body: params,
    };
    fetch(`${URL_BASE}profe_reserva`, requestOptions).then((response) =>
      setClaseDetail((v) => !v)
    );
  };

  return (
    <>
      {reserva.canchaNombre !== undefined ? (
        <div id="clase-detail-component">
          {clasePasada(reserva.fecha) ? (
            <button id="clase-closeBTN" onClick={() => setClaseDetail({})}>
              x
            </button>
          ) : (
            <button id="clase-closeBTN" onClick={cerrarDetalles}>
              x
            </button>
          )}

          {clasePasada(reserva.fecha) ? (
            <div id="clase-detail-general" className="clase-caja">
              <h2>Cancha: {reserva.canchaNombre}</h2>
              <p id="clase-detail-fecha">{formateoFecha(reserva.fecha)}</p>
              <p id="clase-detail-hora">
                {reserva.horaIni} - {reserva.horaFin}
              </p>
            </div>
          ) : (
            <div id="clase-detail-futuro" className="clase-caja">
              <h2>Cancha: {reserva.canchaNombre}</h2>
              {active ? (
                <div id="clase-detail-contenido">
                  <div id="clase-detail-texto">
                    <p id="clase-detail-fecha">
                      {diaElegido === ''
                        ? formateoFecha(reserva.fecha)
                        : formateoFecha(diaElegido)}
                    </p>
                    <p id="clase-detail-hora">
                      {horaInicio === '' ? reserva.horaIni : horaInicio} -{' '}
                      {horaFinal === '' ? reserva.horaFin : horaFinal}
                    </p>
                  </div>
                  <div id="clase-btn-background">
                    <EditFechaYHoraController
                      reserva={reserva}
                      setHoraInicio={setHoraInicio}
                      horaInicio={horaInicio}
                      setHoraFinal={setHoraFinal}
                      horaFinal={horaFinal}
                      diaElegido={diaElegido}
                      setDiaElegido={setDiaElegido}
                    />
                    <button id="clase-detail-edit-btn" onClick={cerrarEdicion}>
                      {' '}
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </div>
                </div>
              ) : (
                <div id="clase-detail-contenido">
                  <div id="clase-detail-texto">
                    <p id="clase-detail-fecha">
                      {diaElegido === ''
                        ? formateoFecha(reserva.fecha)
                        : formateoFecha(diaElegido)}
                    </p>
                    <p id="clase-detail-hora">
                      {horaInicio === '' ? reserva.horaIni : horaInicio} -{' '}
                      {horaFinal === '' ? reserva.horaFin : horaFinal}
                    </p>
                  </div>
                  <div id="clase-btn-background">
                    <button id="clase-detail-edit-btn" onClick={setClassActive}>
                      {' '}
                      <FontAwesomeIcon icon={faCalendar} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div id="clase-detail-profesor" className="clase-caja">
            <h3>Profesor</h3>
            {clasePasada(reserva.fecha) ? (
              <div id="profesor-label">
                <p id="profesor">nombre: </p>
                <p className="clase-detail-nombre">{reserva.titular.nombre}</p>
              </div>
            ) : (
              <div>
                <div id="profesor-label">
                  <p id="profesor">nombre: </p>
                  <p className="clase-detail-nombre">
                    {reserva.titular.nombre}{' '}
                  </p>
                </div>
                <select
                  name=""
                  className="inputReserva"
                  id="profeInput"
                  onChange={handleEditProfe}
                  defaultValue={reserva.titular.id}
                >
                  <option id="idProfeSelected" value={reserva.titular.id}>
                    Cambiar Profe
                  </option>
                  {profesores.map((el) => {
                    return reserva.titular.nombre !== el.nombre ? (
                      <option value={el.id} key={el.id}>
                        {el.nombre}
                      </option>
                    ) : (
                      ''
                    );
                  })}
                </select>
              </div>
            )}
          </div>

          <div id="clase-detail-alumnos" className="clase-caja">
            <h3>Alumnos</h3>
            {clasePasada(reserva.fecha) ? (
              <div id="alumnosList">
                {alumnosDeLaClase.map((el, index) => (
                  <div
                    key={index}
                    className="clase-detail-a"
                    id="alumnosList-detail"
                  >
                    <p>{el.nombre}</p>{' '}
                  </div>
                ))}
              </div>
            ) : (
              <div id="alumnosList">
                {alumnosDeLaClase.map((el, index) => (
                  <div
                    key={index}
                    className="clase-detail-a"
                    id="alumnosList-detail"
                  >
                    <p>{el.nombre}</p>{' '}
                    <button
                      id="deleteAlumnoBtn"
                      onClick={() => handleDeleteAlumno(index)}
                    >
                      x
                    </button>{' '}
                  </div>
                ))}
              </div>
            )}
            <div id="addAlumnosDiv">
              {alumnosBtnActive ? (
                <div>
                  <SelectorDeAlumnosDeClase
                    alumnos={alumnos}
                    setAlumnosDeLaClase={setAlumnosDeLaClase}
                    alumnosDeLaClase={alumnosDeLaClase}
                  />
                  <button
                    id="clase-detail-alumnos-addBTN"
                    onClick={desactivateAddAlumnos}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </div>
              ) : reserva.tipo === 'INDIVIDUAL' &&
                alumnosDeLaClase.length === 1 ? (
                <div class="desvanecer">
                  <button
                    id="clase-detail-alumnos-addBTN"
                    class="btnDis"
                    title="Sólo puede haber un alumno asignado"
                    disabled
                  >
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </button>
                  <small>Sólo puede haber un alumno asignado</small>
                </div>
              ) : (
                <button
                  id="clase-detail-alumnos-addBTN"
                  onClick={activeAddAlumnos}
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                </button>
              )}
            </div>
          </div>
          {clasePasada(reserva.fecha) ? (
            ''
          ) : (
            <div id="clase-detail-btns">
              <button id="clase-detail-guardar" onClick={actualizarClase}>
                Guardar
              </button>
              <button
                id="clase-detail-cancelar"
                onClick={() => setClaseDetail({})}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
      {console.log(reserva)}
    </>
  );
};

export default ClaseDetails;
