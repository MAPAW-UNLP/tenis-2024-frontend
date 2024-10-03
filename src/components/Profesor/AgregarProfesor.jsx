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
  handleChangeValorHora,
  feedback,
  submitProfesorForm,
}) => {
  // Comprobar si el formulario está listo para ser enviado
  const isFormValid =
    feedback.nombreFB.isValid &&
    feedback.emailFB.isValid &&
    feedback.telefonoFB.isValid &&
    feedback.valorHoraFB.isValid; // Verificar que el 
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
              <label htmlFor="nombreInput">Nombre *</label>
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
              <label htmlFor="emailInput">Email *</label>
              <InputReComponent
                type={'text'}
                name={'email'}
                id={'emailInput'}
                className={'profesor-add-form-input'}
                placeholder={'Email'}
                onChangeFuncion={(e) =>
                  handleChangeEmail(
                    e,
                    'profesor-add-form-addBtn',
                    'telefonoInput',
                    true
                  )
                }
                deshabilitado={true}
              />
              <p
                className="feedbackInline"
                style={{ color: feedback.emailFB.color }}
              >
                {feedback.emailFB.text}
              </p>
            </div>
            <div className="inputlabel">
              <label htmlFor="telefonoInput">Teléfono *</label>
              <InputReComponent
                type={'text'}
                name={'telefono'}
                id={'telefonoInput'}
                className={'profesor-add-form-input'}
                placeholder={'Telefono'}
                onChangeFuncion={(e) =>
                  handleChangePhone(e, 'profesor-add-form-addBtn', true)
                }
                deshabilitado={true}
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
              <label htmlFor="valorHoraInput">Valor/Hora *</label>
              <InputReComponent
                type={'number'}
                name={'valorHora'}
                id={'valorHoraInput'}
                className={'profesor-add-form-input'}
                placeholder={'Valor por hora'}
                onChangeFuncion={(e) =>
                  handleChangeValorHora(e)
                }
              />
              <p
                className="feedbackInline"
                style={{ color: feedback.valorHoraFB.color }}
              >
                {feedback.valorHoraFB.text}
              </p>
            </div>
            <button
              id="clase-detail-guardar"
              type="submit"
              disabled={!isFormValid} // Habilitar solo si el formulario es válido
            >
              Guardar
            </button>
            <button
              id="clase-detail-cancelar"
              type="button"
              onClick={(e) => {
                e.preventDefault(); // Evitar cualquier acción de envío
                handleCloseForm(); // Cierra el formulario
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default AgregarProfesor
