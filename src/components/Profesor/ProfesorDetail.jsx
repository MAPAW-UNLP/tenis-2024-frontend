import { useState } from 'react'

import InputReComponent from '../Utils/InputReComponent'
import '../../styles/profesorLoader.css'

export const ProfesorDetail = ({
  activeDetail,
  setActiveDetail,
  setProfeDetail,
  profeDetail,
  handleChangeName,
  handleChangePhone,
  handleChangeEmail,
  handleChangeValorHora,
  feedback,
  clearState,
  setWillEdit,
  setActProfesores,
}) => {
  const URL_BASE = 'http://localhost:8083/api/'
  const [waitingUpdate, setWaitingUpdate] = useState(false)

  const LoadingSpinner = () => {
    return (
      <div
        className="spinnerContainer"
        style={{ marginBottom: '1.2em', marginTop: '.5em' }}
      >
        <div id="waitingUpdate" className="waiting-update"></div>
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
    const nombreProfe = document.getElementById('nombreProfesor').value
    const telProfe = document.getElementById('telefonoProfesor').value
    const emailProfe = document.getElementById('emailProfesor').value
    const valorHoraProfe = document.getElementById('valorHoraProfesor').value

    const data = {
      id: profeDetail.id,
    }

    nombreProfe === ''
      ? (data.nombre = profeDetail.nombre)
      : (data.nombre = nombreProfe)
    telProfe === ''
      ? (data.telefono = profeDetail.telefono)
      : (data.telefono = telProfe)
    emailProfe === ''
      ? (data.email = profeDetail.email)
      : (data.email = emailProfe)
    valorHoraProfe === ''
      ? (data.valorHora = profeDetail.valorHora)
      : (data.valorHora = valorHoraProfe)

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }

    fetch(`${URL_BASE}profesorr/update`, requestOptions)
      .then((response) => response.json())
      .then(() => setWaitingUpdate(false))
      .then(() => handleCloseForm())
      .then(() => setProfeDetail({}))
      .then(() => setActProfesores((v) => !v))
  }

  return (
    <>
      {activeDetail && (
        <div id="profesor-edit-component">
          <button id="close-profesor-add-form" onClick={handleCloseForm}>
            {' '}
            x{' '}
          </button>
          <h2>Editar Profesor</h2>
          <div className="inputlabel">
            <label htmlFor="nombreInput" className="profesor-edit-label">
              Nombre:{' '}
              <span style={{ color: 'green', marginLeft: '0.1rem' }}>*</span>
            </label>
            <InputReComponent
              type={'text'}
              id={'nombreProfesor'}
              name={'nombre'}
              className={'profesor-add-form-input'}
              placeholder={profeDetail.nombre}
              defaultValue={profeDetail.nombre}
              onChangeFuncion={(e) =>
                handleChangeName(e, 'clase-detail-guardar', '', false)
              }
            />
            <p
              className="feedbackInline"
              style={{ color: feedback.nombreFB.color }}
            >
              {feedback.nombreFB.text}
            </p>
          </div>

          <div className="inputlabel">
            <label htmlFor="emailInput" className="profesor-edit-label">
              Email:{' '}
              <span style={{ color: 'green', marginLeft: '0.1rem' }}>*</span>
            </label>
            <InputReComponent
              type={'text'}
              id={'emailProfesor'}
              name={'email'}
              className={'profesor-add-form-input'}
              placeholder={profeDetail.email}
              defaultValue={profeDetail.email}
              onChangeFuncion={(e) =>
                handleChangeEmail(e, 'clase-detail-guardar', '', false)
              }
            />
            <p
              className="feedbackInline"
              style={{ color: feedback.emailFB.color }}
            >
              {feedback.emailFB.text}
            </p>
          </div>

          <div className="inputlabel">
            <label htmlFor="telefonoInput" className="profesor-edit-label">
              Telefono:{' '}
              <span style={{ color: 'green', marginLeft: '0.1rem' }}>*</span>
            </label>
            <InputReComponent
              type={'text'}
              name={'telefono'}
              id={'telefonoProfesor'}
              className={'profesor-add-form-input'}
              placeholder={profeDetail.telefono}
              defaultValue={profeDetail.telefono}
              onChangeFuncion={(e) =>
                handleChangePhone(e, 'clase-detail-guardar', false)
              }
              min={7}
              max={12}
            />
            <p
              className="feedbackInline"
              style={{ color: feedback.telefonoFB.color }}
            >
              {feedback.telefonoFB.text}
            </p>
          </div>

          <div className="inputlabel">
            <label htmlFor="valorHoraInput" className="profesor-edit-label">
              Valor/Hora:{' '}
              <span style={{ color: 'green', marginLeft: '0.1rem' }}>*</span>
            </label>
            <InputReComponent
              type={'number'}
              name={'valorHora'}
              id={'valorHoraProfesor'}
              className={'profesor-add-form-input'}
              placeholder={profeDetail.valorHora}
              defaultValue={profeDetail.valorHora}
              onChangeFuncion={(e) =>
                handleChangeValorHora(e, 'clase-detail-guardar', true)
              }
            />
            <p
              className="feedbackInline"
              style={{ color: feedback.valorHoraFB.color }}
            >
              {feedback.valorHoraFB.text}
            </p>
          </div>

          {waitingUpdate ? (
            <LoadingSpinner
              active={waitingUpdate}
              containerClass={'contenedorLogin'}
              loaderClass={'loader'}
            />
          ) : (
            <div id="profesor-edit-buttons">
              {feedback.nombreFBCorrecto === false ||
                feedback.telefonoFBCorrecto === false ||
                feedback.emailFBCorrecto === false ||
                feedback.valorHoraFB.isValid  === false? (
                <button
                  id="profesor-edit-disabled"
                  type="button"
                  disabled={true}
                >
                  {' '}
                  Guardar{' '}
                </button>
              ) : (
                <button id="profesor-button-guardar" onClick={actualizar}>
                  {' '}
                  Guardar{' '}
                </button>
              )}
              <button id="profesor-button-cancelar" onClick={handleCloseForm}>
                {' '}
                Cancelar{' '}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
