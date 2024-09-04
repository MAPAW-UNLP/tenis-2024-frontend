import React from 'react';
import InputReComponent from '../Utils/InputReComponent';

const AlumnoDetail = ({
  activeDetail,
  setActiveDetail,
  setAluDetail,
  setActAlu,
  actAlu,
  handleChangeName,
  handleChangePhone,
  feedback,
  clearState,
  setActAlumnos
}) => {  
  const URL_BASE = 'http://localhost:8083/api/';

  const handleCloseForm = () => {
    setActiveDetail(false);
    clearState()
    setActAlu('')
  };

  const actualizarAlumno = () => {
    const nombreAlu = document.getElementById('nombreAlumno').value;
    const telAlu = document.getElementById('telefonoAlumno').value;
    // const nacAlu = document.getElementById('nacimientoPicker').value;
    const data = {
      id: actAlu.id,
      esalumno: true,
    };
    nombreAlu === '' ? (data.nombre = actAlu.nombre) : (data.nombre = nombreAlu);
    telAlu === '' ? (data.telefono = actAlu.telefono) : (data.telefono = telAlu);
    // nacAlu === '' ? (data.fechanac = actAlu.fechanac) : (data.fechanac = nacAlu);

    setActiveDetail(false);

    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(data),
    };

    fetch(`${URL_BASE}alumno`, requestOptions)
      .then((response) => response.json())
      .then(() => setAluDetail((v) => !v))
      .then(() => setActAlumnos((v) => !v))
  };

  return (
    <>
      {activeDetail && (
        <div id="profesor-edit-component">
          <button id="close-profesor-add-form" onClick={handleCloseForm}>
            x
          </button>
          <h2>Editar Alumno</h2>
          <div className="inputlabel">
            <InputReComponent
              type={'text'}
              id={'nombreAlumno'}
              name={'nombre'}
              className={'profesor-add-form-input'}
              placeholder={actAlu.nombre}
              onChangeFuncion={(e) => handleChangeName(e, 'clase-detail-guardar', 'telefonoAlumno', false)}
            />
            <p className="feedbackInline" style={{ color: feedback.nombreFB.color }}>
              {feedback.nombreFB.text}
            </p>
          </div>
          <div className="inputlabel">
            <InputReComponent
              type={'text'}
              name={'telefono'}
              id={'telefonoAlumno'}
              className={'profesor-add-form-input'}
              placeholder={actAlu.telefono}
              onChangeFuncion={(e) => handleChangePhone(e, 'clase-detail-guardar', false)}
              min={7}
              max={12}
            />
            <p className="feedbackInline" style={{ color: feedback.telefonoFB.color }}>
              {feedback.telefonoFB.text}
            </p>
          </div>
          
          <div id="clase-detail-btns">
            {(feedback.nombreFBCorrecto === false || feedback.telefonoFBCorrecto === false)
              ? <button id="clase-detail-disabled" type='button' disabled={true}> Guardar </button>
              : <button id="clase-detail-guardar" onClick={actualizarAlumno}> Guardar </button>
            }
            <button id="clase-detail-cancelar" onClick={handleCloseForm}> Cancelar </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AlumnoDetail;
