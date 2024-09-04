import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import InputReComponent from '../Utils/InputReComponent';
import NacimientoComponent from '../Utils/NacimientoComponent';

const AgregarAlumno = ({
  active,
  setActive,
  handleChangeName,
  handleChangePhone,
  handleSubmitAlumnoForm,
  setAlumnoForm,
  clearState,
  alumnoForm,
  feedback
}) => {

  const handleCloseForm = () => {
    setActive(false);
    clearState()
  };
  
  return (
    <>
      {active && (
        <div id="alumno-add-component">
          <button id="close-alumno-add-form" onClick={handleCloseForm}>
            x
          </button>
          <h2>Nuevo Alumno</h2>
          <form action="" id="alumno-add-form" onSubmit={handleSubmitAlumnoForm}>
            <div className="inputlabel">
              <InputReComponent
                type={'text'}
                name={'nombre'}
                className={'alumno-add-form-input'}
                placeholder={'Nombre'}
                onChangeFuncion={(e) => handleChangeName(e, 'alumno-add-form-addBtn', 'telefonoInput', true)}
              />
              <p className="feedbackInline" style={{ color: feedback.nombreFB.color }}>
                {feedback.nombreFB.text}
              </p>
            </div>
            <div className="inputlabel">
              <InputReComponent
                type={'text'}
                name={'telefono'}
                id="telefonoInput"
                className={'alumno-add-form-input'}
                placeholder={'Telefono'}
                onChangeFuncion={(e) => handleChangePhone(e, 'alumno-add-form-addBtn', true)}
                deshabilitado={true}
                min={7}
                max={12}
              />
              <p className="feedbackInline" style={{ color: feedback.telefonoFB.color }}>
                {feedback.telefonoFB.text}
              </p>
            </div>
            <NacimientoComponent alumnoForm={alumnoForm} setNacimiento={setAlumnoForm} />
            <button id="alumno-add-form-addBtn" type="sumbit" disabled>
              <FontAwesomeIcon id="canchas-add-form-btn" icon={faPlusCircle} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AgregarAlumno;
