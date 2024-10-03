//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import InputReComponent from '../Utils/InputReComponent'

const AgregarProfesor = ({
  active,
  handleCloseForm,
  handleChangeName,
  handleChangeEmail,
  handleChangePhone,
  feedback,
  submitProfesorForm,
}) => {
  return (
    <>
      {active && (
        <div id="profesor-add-component">
          <button id="close-profesor-add-form" onClick={handleCloseForm}>
            x
          </button>
          <h2>Nuevo Profesor</h2>
          <form id="alumno-add-form" onSubmit={submitProfesorForm}>
            <div className="inputlabel">
              <InputReComponent
                type={'text'}
                name={'nombre'}
                className={'profesor-add-form-input'}
                placeholder={'Nombre'}
                onChangeFuncion={(e) =>
                  handleChangeName(
                    e,
                    'profesor-add-form-addBtn',
                    'emailInput',
                    true
                  )
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
              <InputReComponent
                type={'text'}
                name={'email'}
                id={'emailInput'}
                className={'profesor-add-form-input'}
                placeholder={'Email'}
              />
              <p
                className="feedbackInline"
                style={{ color: feedback.emailFB.color }}
              >
                {feedback.emailFB.text}
              </p>
            </div>
            <div className="inputlabel">
              <InputReComponent
                type={'text'}
                name={'telefono'}
                id={'telefonoInput'}
                className={'profesor-add-form-input'}
                placeholder={'Telefono'}
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
            <button disabled id="clase-detail-guardar" type="sumbit">
              {''}
              Guardar{''}
            </button>
            <button disabled id="clase-detail-cancelar" type="sumbit">
              {''}
              Cancelar{''}
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default AgregarProfesor
