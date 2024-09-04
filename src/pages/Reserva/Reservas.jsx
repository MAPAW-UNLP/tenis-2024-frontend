import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//styles
import '../../styles/reservas.css';

//hora
import SelectHoraInicio from '../../components/Utils/Alquiler/SelectHoraInicio';
import SelectHoraFin from '../../components/Utils/Alquiler/SelectHoraFin';
//components
import NavBar from '../Navbar/NavBar';
import AlquilerFormComponent from '../../components/Utils/Alquiler/AlquilerFormComponent';
import ClaseFormComponent from '../../components/Utils/Alquiler/ClaseFormComponent';
import InputComponent from '../../components/Utils/InputComponent';
import SelectComponent from '../../components/Utils/SelectComponent';

//Fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { ordenarPorNombre } from '../../components/Utils/Functions';

export const Reservas = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;
  //navegacion
  const navigate = useNavigate();
  
  const [reservas, setReservas] = useState([]);
  const [actReservas, setActReservas] = useState(false);
  const [reservasLoader, setReservasLoader] = useState(false);
  
  //para actualizar los profesores
  const [profesores, setProfesores] = useState([]);
  const [alumnos, setAlumnos] = useState([])
  const [actAlumnos, setActAlumnos] = useState(false);

  const [actProfesores, setActProfesores] = useState(false);

  const [alquilerOp, setAlquilerOp] = useState(false);
  const [claseOp, setClaseOp] = useState(false);
  //a futuro vamos a tener un tipo reserva por aca.
  const [reservaTipo, setReservaTipo] = useState('');
  const [cancha, setCancha] = useState('');
  const [canchas, setCanchas] = useState([]);
  const [actCanchas, setActCanchas] = useState(false);

  //con estos campos verificar actualizar el select de cancha solo mostrando las posibles
  const [dia, setDia] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');

  const horas = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
  ];

  //alquiler
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  //clase

  const [profesorSel, setProfesorSel] = useState(0); //id profesor
  const [grupoIds, setGrupoIds] = useState([]); // ids Alumnos
  const [replica, setReplica] = useState(false);
  const [tipoClase, setTipoClase] = useState(0);

  //diaFormateadopara HTML
  const mes = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const day = ('0' + new Date().getDate()).slice(-2);
  const año = new Date().getFullYear();

  const today = `${año}-${mes}-${day}`;

  const handleTypeChange = (e) => {
    if (e.target.value === 'Alquiler') {
      setAlquilerOp(true);
      setClaseOp(false);
    }
    if (e.target.value === 'Clase') {
      setClaseOp(true);
      setAlquilerOp(false);
    }
    setReservaTipo(e.target.value);

    const nextInput = document.getElementById('fecha');
    e.target.value === ''
      ? (nextInput.disabled = true)
      : (nextInput.disabled = false);
  };

  const handleDayChange = (e) => {
    setDia(e.target.value);
    const nextInput = document.getElementById('horaInicio');
    e.target.value === ''
      ? (nextInput.disabled = true)
      : (nextInput.disabled = false);
  };

  const handleSubmitContinue = (e) => {
    e.preventDefault();
    const reservaType = document.getElementById('selectedReservaType');
    if (reservaType.value == 'Alquiler') {
      setAlquilerOp(true);
      setClaseOp(false);
    }
    if (reservaType.value == 'Clase') {
      setAlquilerOp(false);
      setClaseOp(true);
    }
  };

  const canchasDisponibles = () => {
    //este algoritmo se por un lado se queda con los nombres de las canchas no disponibles y luego devuelve los nombres de las canchas que no aparecen en el primer arrreglo
    const nombresCanchasNoDisponibles = reservas
      .map((reserva) => {
        if (
          reserva.fecha === dia &&
          horas.indexOf(horaFin) >= horas.indexOf(reserva.horaIni) &&
          horas.indexOf(horaInicio) <= horas.indexOf(reserva.horaFin)
        ) {
          return reserva.canchaNombre;
        }
      })
      .filter((el) => el !== undefined);

    return canchas
      .filter(
        (cancha) => nombresCanchasNoDisponibles.indexOf(cancha.nombre) === -1
      )
      .map((el) => el);
  };

  const handleSetHoraInicio = (e) => {
    setHoraInicio(e.target.value);
  };

  const handleSetHoraFin = (e) => {
    setHoraFin(e.target.value);
  };

  const handleAddReserva = () => {
    const URL_BASE = `http://localhost:8083/api/`;
    const reserva = {
      nombre: nombre,
      telefono: telefono,
      fecha: dia,
      cancha_id: cancha,
      hora_ini: horaInicio,
      hora_fin: horaFin,
      persona_id: profesorSel,
      replica: replica,
      estado_id: 0,
      grupo_ids: grupoIds,
      tipo: tipoClase,
    };
    const form_data = new FormData();

    for (var r in reserva) {
      console.log('form reserva ', r, reserva[r]);
      form_data.append(r, reserva[r]);
    }
    console.log('form data', form_data);
    const requestOptions = {
      method: 'POST',
      body: form_data,
    };
    fetch(`${URL_BASE}reserva`, requestOptions)
      .then((response) => setActReservas((v) => !v))
      .then(setReservasLoader(true))
      .finally(navigate('../reservas'));
  };

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}canchas`, requestOptions)
      .then((response) => response.json())
      .then((data) => setCanchas(data.detail))
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actCanchas]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}profesores`, requestOptions)
      .then((response) => response.json())
      .then((data) => setProfesores(ordenarPorNombre(data)))
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actProfesores]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}alumnos`, requestOptions)
      .then((response) => response.json())
      .then((data) => setAlumnos(ordenarPorNombre(data.detail)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actAlumnos]);

  return (
    <div id="reservas-component">
      <NavBar title={'Reservas'} setSesion={setSesion} />
      <div id="reserva-nuevaReserva">
        <button id="clase-closeBTN" onClick={() => navigate('../reservas')}>
          x
        </button>
        <h2>Nueva reserva</h2>
        <form action="" id="reserva-form" onSubmit={handleSubmitContinue}>
          <SelectComponent
            className={'inputReserva'}
            id={'selectedReservaType'}
            onChange={handleTypeChange}
            options={['Alquiler', 'Clase']}
            deshabilitado={false}
            placeholder={'Seleccionar Tipo de Reserva'}
          />
          <InputComponent
            type={'date'}
            id={'fecha'}
            className={'inputReserva'}
            placeholder={'Fecha'}
            onChangeFuncion={handleDayChange}
            deshabilitado={true}
            min={today}
          />
          {/*  LA IDEA ES USAR LOS COMENTADOS
                <SelectComponent className={'inputReserva'} id={'horaInicio'} onChange={handleSetHoraInicio} options={horas} deshabilitado={false}/>
                <SelectComponent className={'inputReserva'} id={'horaInicio'} onChange={handleSetHoraFin} options={horas} deshabilitado={false}/> */}

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
          />
          {alquilerOp && (
            <AlquilerFormComponent
              active={alquilerOp}
              canchas={canchasDisponibles()}
              setCancha={setCancha}
              setActive={setAlquilerOp}
              handleAddReserva={handleAddReserva}
              setNombre={setNombre}
              setTelefono={setTelefono}
            />
          )}
          {claseOp && (
            <ClaseFormComponent
              active={claseOp}
              canchas={canchasDisponibles()}
              setCancha={setCancha}
              setActive={setClaseOp}
              handleAddReserva={handleAddReserva}
              profesores={profesores}
              setProfesores={setProfesores}
              alumnos={alumnos}
              setAlumnos={setAlumnos}
              profesorSel={profesorSel}
              setProfesorSel={setProfesorSel}
              grupoIds={grupoIds}
              setGrupoIds={setGrupoIds}
              replica={replica}
              setReplica={setReplica}
              tipoClase={tipoClase}
              setTipoClase={setTipoClase}
            />
          )}
          {!alquilerOp && !claseOp && (
            <button id="continue-btn" disabled>
              {' '}
              <FontAwesomeIcon id="next-icon" icon={faChevronRight} />{' '}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
