import React from 'react';
import { MovimientoForm } from './MovimientoForm';

export const AgregarMovimiento = ({ active, handleCloseForm, submitMovimientoForm, movimientoAddForm, handleChangeFormData,
  personas, movimientoName, movimientoOptions, clasesOptions }) => {

  return (
    <>
      {active && <MovimientoForm handleCloseForm={handleCloseForm} submitMovimientoForm={submitMovimientoForm} personas={personas}
        handleChangeFormData={handleChangeFormData} movimientoAddForm={movimientoAddForm}
        movimientoOptions={movimientoOptions} movimiento={movimientoName} clasesOptions={clasesOptions} />}
    </>
  );
};
