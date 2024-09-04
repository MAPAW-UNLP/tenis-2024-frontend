import React from 'react';
import { AlumnoForm } from './AlumnoForm';

export const AgregarAlumno = ({ active, handleCloseForm, submitAlumnoForm, handleChangeFormData,
  alumnoForm, setAlumnoForm, checkStudentExistence }) => {
  return (
    <>
      {active && <AlumnoForm handleCloseForm={handleCloseForm} submitAlumnoForm={submitAlumnoForm}
        handleChangeFormData={handleChangeFormData} alumnoForm={alumnoForm} setAlumnoForm={setAlumnoForm}
        checkStudentExistence={checkStudentExistence} />}
    </>
  );
};
