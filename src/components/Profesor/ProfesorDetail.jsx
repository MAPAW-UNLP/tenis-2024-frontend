import React, { useState } from 'react';

import InputReComponent from '../Utils/InputReComponent';
import '../../styles/profesorLoader.css'

export const ProfesorDetail = ({
  activeDetail,
  setActiveDetail,
  setProfeDetail,
  profeDetail,
  handleChangeName,
  handleChangePhone,
  handleChangeEmail,
  feedback,
  clearState,
  setWillEdit,
  setActProfesores,
}) => {
  const URL_BASE = 'http://localhost:8083/api/';
  const [waitingUpdate, setWaitingUpdate] = useState(false);

  const LoadingSpinner = () => {
    return(
      <div className='spinnerContainer' style={{marginBottom:"1.2em", marginTop:".5em"}}>
        <div id="waitingUpdate" className='waiting-update'></div>
      </div>
    )
  }

  const handleCloseForm = () => {
    setActiveDetail(false)
    setWillEdit(false)
    setProfeDetail({})
    clearState()
  }
  const actualizar = () => {
    actualizarProfesor()
    setWaitingUpdate(true)
  }

  const actualizarProfesor = () => {
    const nombreProfe = document.getElementById('nombreProfesor').value;
    const telProfe = document.getElementById('telefonoProfesor').value;
    const emailProfe = document.getElementById('emailProfesor').value;

    const data = {
      id: profeDetail.id
    };

    nombreProfe === '' ? (data.nombre = profeDetail.nombre) : (data.nombre = nombreProfe); 
    telProfe === '' ? (data.telefono = profeDetail.telefono) : (data.telefono = telProfe);
    emailProfe === '' ? (data.email = profeDetail.email) : (data.email = emailProfe);

    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(data),
    };

    fetch(`${URL_BASE}profesorr`, requestOptions)
      .then((response) => response.json())
      .then(() => setWaitingUpdate(false))
      .then(() => handleCloseForm())
      .then(() => setProfeDetail({}))
      .then(() => setActProfesores((v) => !v));
  };

  return (
    <>
      {activeDetail && (
        <div id="profesor-edit-component">
          <button id="close-profesor-add-form" onClick={handleCloseForm}> x </button>
          <h2>Editar Profesor</h2>
          <div className="inputlabel">
            <InputReComponent
              type={'text'}
              id={'nombreProfesor'}
              name={'nombre'}
              className={'profesor-add-form-input'}
              placeholder={profeDetail.nombre}
              defaultValue={profeDetail.nombre}
              onChangeFuncion={(e) => handleChangeName(e, 'clase-detail-guardar', '', false)}
            />
            <p className="feedbackInline" style={{ color: feedback.nombreFB.color }}>
              {feedback.nombreFB.text}
            </p>
          </div>

          <div className="inputlabel">
            <InputReComponent
              type={'text'}
              id={'emailProfesor'}
              name={'email'}
              className={'profesor-add-form-input'}
              placeholder={profeDetail.email}
              defaultValue={profeDetail.email}
              onChangeFuncion={(e) => handleChangeEmail(e, 'clase-detail-guardar', '', false)}
            />
            <p className="feedbackInline" style={{ color: feedback.emailFB.color }}>
              {feedback.emailFB.text}
            </p>
          </div>

          <div className="inputlabel">
            <InputReComponent
              type={'text'}
              name={'telefono'}
              id={'telefonoProfesor'}
              className={'profesor-add-form-input'}
              placeholder={profeDetail.telefono}
              defaultValue={profeDetail.telefono}
              onChangeFuncion={(e) => handleChangePhone(e, 'clase-detail-guardar', false)}
              min={7}
              max={12}
            />
            <p className="feedbackInline" style={{ color: feedback.telefonoFB.color }}>
              {feedback.telefonoFB.text}
            </p>
          </div>

          {waitingUpdate ? <LoadingSpinner active={waitingUpdate} containerClass={'contenedorLogin'} loaderClass={'loader'}/> : (
            <div id="clase-detail-btns">
              {(feedback.nombreFBCorrecto === false || feedback.telefonoFBCorrecto === false || feedback.emailFBCorrecto === false) ?
                <button id="clase-detail-disabled" type='button' disabled={true}> Guardar </button>
              :
                <button id="clase-detail-guardar" onClick={actualizar}> Guardar </button>
            }
              <button id="clase-detail-cancelar" onClick={handleCloseForm}> Cancelar </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
