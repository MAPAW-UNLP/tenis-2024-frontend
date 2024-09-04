import React, { useState } from 'react';
import moment from 'moment';
import { MovimientoForm } from '../../Movimiento/MovimientoForm';

export const AgregarCobro = ({ active, setActive, setActCobros, alumnos }) => {
  const URL_BASE = `http://localhost:8083/api/`;
  const [user_id, setUser_id] = useState('');
  
  const handleChangeUser_id = (e) => {
    setUser_id(e.value);
  };

  const handleCloseForm = () => {
    setActive(false);
  };

  const submitCobroForm = (e) => {
    e.preventDefault();
    setActive(false);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        idPersona: user_id,
        fecha: moment().format('YYYY/MM/DD'),
      }),
    };

    console.log(requestOptions.body);

    fetch(`${URL_BASE}pagos`, requestOptions)
      .then((response) => response.json())
      .then(() => setActCobros((v) => !v));
  };

  // ELementos de 'Concepto' para el Select de Nuevo Cobro
  const mockupOptions = [
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

  return (
    <>
      {active && <MovimientoForm handleCloseForm={handleCloseForm} submitMovimientoForm={submitCobroForm} 
        handleMovimientoForm={handleChangeUser_id} mockupOptions={mockupOptions} movimiento={"Cobro"} />}
    </>
  );
};
