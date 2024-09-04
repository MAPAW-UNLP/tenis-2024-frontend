import { useState } from 'react';
import InputReComponent from '../Utils/InputReComponent';

export const EditarAlumno = ({ editAlumnoActive, handleChangeFormData, handleCloseForm, alumnoEditForm,
  checkStudentExistence, submitEditAlumnoForm }) => {

  // Arreglo de errores
  const [errors, setErrors] = useState([])

  // Funcion para revisar si todos los inputs estan completos antes de hacer el envio
  const handleCheckAddForm = (event) => {
    event.preventDefault();
    setErrors([])
    let result = false;
    result = verifyFormEditAlumno()
    if (result) {
      submitEditAlumnoForm(event)
    }
  }

  // Verificar edicion de alumno
  const verifyFormEditAlumno = () => {
    const verify = []
    if (!alumnoEditForm.nombre) verify.push('Debe ingresar un nombre');
    if (!checkStudentExistence(alumnoEditForm.nombre)) {
      verify.push('El nombre de alumno ya se encuentra registrado')
    }
    if (!alumnoEditForm.telefono) verify.push('Debe ingresar un numero de telefono')
    setErrors(verify)
    return verify.length === 0 ? true : false
  }

  const handleCloseEditAlumnoForm = () => {
    setErrors([])
    handleCloseForm()
  }
  return (
    <>
      {editAlumnoActive &&
        (
          <div className="movimiento-add-component" style={{boxShadow:'-2px -4px 400px 600px rgba(0, 0, 0, 0.64)'}}>
            <button className="close-movimiento-add-form" onClick={handleCloseEditAlumnoForm}> x </button>
            <h2>Editar alumno</h2>
            <form className="new-alumno-add-form">

              {/* Inputs */}
              <label htmlFor="nombreEdit" className="new-alumno-add-form-label"> * </label>
              <InputReComponent name={'nombre'} onChangeFuncion={handleChangeFormData} placeholder={'Nombre'} />

              <label htmlFor="nombre" className="new-alumno-add-form-label"> * </label>
              <InputReComponent name={'telefono'} onChangeFuncion={handleChangeFormData} placeholder={'Telefono'} />

              {/* Errores */}
              <div style={{ fontFamily: 'var(--normal-text)', width: '80%', color: 'red', fontSize: '.9em' }}>
                {errors.map((error, index) => (
                  <p key={`error-${index}`}>* {error}</p>
                ))}
              </div>

              <button className="new-alumno-add-form-addBtn " style={{ marginTop: '.5em' }} onClick={handleCheckAddForm}> Aceptar </button>
            </form>
          </div>
        )}
    </>
  )
}