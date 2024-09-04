import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { AgregarMovimiento } from '../../components/Movimiento/AgregarMovimiento'
import { MovimientoTable } from '../../components/Movimiento/MovimientoTable'
import { ordenarPorNombre } from '../../components/Utils/Functions'
import { GenericLargeButton } from '../../components/Utils/GenericLargeButton'
import LoaderSpinner from '../../components/LoaderSpinner'
import NavBar from '../Navbar/NavBar'

import '../../styles/movimiento/movimiento.css'

export const Cobros = ({ setSesion }) => {
  const URL_BASE = `http://localhost:8083/api/`;

  const [active, setActive] = useState(false);
  const [cobros, setCobros] = useState([]);
  const [actCobros, setActCobros] = useState(false);

  const [alumnos, setAlumnos] = useState([]);
  const [cobrosLoader, setCobrosLoader] = useState(true); // Spinner
  const [loadingFetch, setLoadingFetch] = useState() // Spinner despues de cargar un cobro

  // Trae todos los COBROS 
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`${URL_BASE}cobros`, requestOptions)
      .then((response) => response.json())
      .then((data) => setCobros(data))
      .then(() => setCobrosLoader(() => false))
      .then(() => setLoadingFetch(false))

    fetch(`${URL_BASE}alumnos`, requestOptions)
      .then((response) => response.json())
      .then((data) => setAlumnos(ordenarPorNombre(data)))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actCobros]);

  // Estado para el formulario de "Agregar Cobro"
  const [cobroAddForm, setCobroAddForm] = useState({
    personaId: '', // Antes alumnoID, ahora es personaId para poder usarlo como generico pero en los endpoints cambiamos el nombre
    personaSeleccionada: '',
    concepto: '',
    monto: '',
    descripcion: '',
    tipoClaseId: '1',
  })

  // Actualiza los datos del formulario para agregar un COBRO
  const handleChangeFormData = (e) => {
    if (e.target.name === 'personaId') {
      // El valor de la persona seleccionada
      const personaSeleccionada = e.target[e.target.selectedIndex].text;
      
      // Si no seleccionamos ningun alumno resetamos el input a cadena vacia ("")
      if (e.target.value === "") {
        setCobroAddForm({
          ...cobroAddForm,
          'personaSeleccionada': "",
          [e.target.name]: e.target.value,
          'descripcion': ""
        });
      }
      // Si tenemos que setear personaId con un valor != vacio --> entonces agarramos el valor de option y lo
      // seteamos en el formulario del estado
      else {
        setCobroAddForm({
          ...cobroAddForm,
          'personaSeleccionada': personaSeleccionada,
          [e.target.name]: e.target.value,
          'descripcion': `Cobro a: ${personaSeleccionada}`
        });
      }
    }
    else {
      setCobroAddForm({ ...cobroAddForm, [e.target.name]: e.target.value });
    }
  };

  // Reseteo el formulario de COBRO
  const resetCobroAddForm = () => {
    setCobroAddForm({
      personaId: '',
      personaSeleccionada: '',
      concepto: '',
      monto: '',
      descripcion: '',
      tipoClaseId: ''
    })
  }

  // Funcion para cerrar el formulario de creacion de COBRO
  const handleCloseForm = () => {
    resetCobroAddForm()
    setActive(false);
  };

  const submitCobroForm = (event) => {
    setActive(false);
    setLoadingFetch(true)

    if (cobroAddForm.personaId) {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          alumnoId: +cobroAddForm.personaId,
          concepto: cobroAddForm.concepto,
          monto: cobroAddForm.monto,
          descripcion: cobroAddForm.descripcion,
          idTipoClase: cobroAddForm.tipoClaseId,
          fecha: moment().format('YYYY/MM/DD'),
        }),
      }
      fetch(`${URL_BASE}nuevo_cobro`, requestOptions)
        .then((response) => response.json())
        .then(() => setActCobros((v) => !v));
    }
    else {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          concepto: cobroAddForm.concepto,
          monto: cobroAddForm.monto,
          descripcion: cobroAddForm.descripcion,
          fecha: moment().format('YYYY/MM/DD'),
        }),
      }
      fetch(`${URL_BASE}nuevo_cobro`, requestOptions)
        .then((response) => response.json())
        .then(() => setActCobros((v) => !v));
    }

    resetCobroAddForm()
  };


  // Opciones de movimiento (Cobro) para el formulario de 'Agregar Cobro'
  const movimientoOptions = [
    {
      id: 1,
      concepto: "Alumno"
    },
    {
      id: 2,
      concepto: "Alquiler"
    },
    {
      id: 3,
      concepto: "Varios"
    }
  ];

  // Opciones de clases (Individual - Grupal ) para el formulario de 'Agregar Cobro'
  // cuando se selecciona un alumno
  const clasesOptions = [
    {
      id: 1,
      tipo: "Individual"
    },
    {
      id: 2,
      tipo: "Grupal"
    }
  ]

  return (
    <div className='movimiento-component'>
      <NavBar title={'Cobros'} setSesion={setSesion} />
      <div className='movimiento-component-mainContent'>
        <GenericLargeButton doSomething={() => setActive(true)} title={"Crear nuevo cobro"} />

        <AgregarMovimiento active={active} handleCloseForm={handleCloseForm} submitMovimientoForm={submitCobroForm}
          movimientoAddForm={cobroAddForm} handleChangeFormData={handleChangeFormData} personas={alumnos}
          movimientoName={"Cobro"} movimientoOptions={movimientoOptions} clasesOptions={clasesOptions} />

        {cobrosLoader ?
          <LoaderSpinner active={cobrosLoader} containerClass={'canchasLoader'} loaderClass={'canchasLoaderSpinner'} />
          :
          <MovimientoTable movimientos={cobros} loadingFetch={loadingFetch} />
        }
      </div>
    </div>
  )
}
