import InputReComponent from '../Utils/InputReComponent';
import '../../styles/movimiento/movimientoForm.css'
import '../../styles/alumnos/alumnoForm.css'
import { useState } from 'react';
import NacimientoComponent from '../Utils/NacimientoComponent';

export const AlumnoForm = ({ handleCloseForm, submitAlumnoForm, handleChangeFormData, alumnoForm,
  setAlumnoForm, checkStudentExistence }) => {

  // Arreglo de errores
  const [errors, setErrors] = useState([])

  // Funcion para revisar si todos los inputs estan completos antes de hacer el envio
  const handleCheckAddForm = (event) => {
    event.preventDefault();
    setErrors([])
    let result = false;
    result = verifyFormAlumno()
    if (result) {
      submitAlumnoForm(event)
    }
  }

  // Reset errores
  const handleCloseAlumnoForm = () => {
    setErrors([])
    handleCloseForm()
  }

  // Verificar cuando el movimiento es un COBRO
  const verifyFormAlumno = () => {
    const verify = []
    if (!alumnoForm.nombre) verify.push('Debe ingresar un nombre');
    if (!checkStudentExistence(alumnoForm.nombre)) {
      verify.push('El nombre de alumno ya se encuentra registrado')
    }
    if (!alumnoForm.telefono) verify.push('Debe ingresar un numero de telefono')
    if (!alumnoForm.nacimiento) verify.push('La fecha de nacimiento no puede estar vacia')

    setErrors(verify)
    return verify.length === 0 ? true : false
  }

  return (
    <div className="movimiento-add-component">
      <button className="close-movimiento-add-form" onClick={handleCloseAlumnoForm}> x </button>
      <h2>Nuevo alumno</h2>
      <form className="new-alumno-add-form">

        {/* Inputs */}
        <label htmlFor="nombre" className="new-alumno-add-form-label"> * </label>
        <InputReComponent name={'nombre'} onChangeFuncion={handleChangeFormData} placeholder={'Nombre'} />

        <label htmlFor="nombre" className="new-alumno-add-form-label"> * </label>
        <InputReComponent name={'telefono'} onChangeFuncion={handleChangeFormData} placeholder={'Telefono'}/>

        <label htmlFor="nombre" className="new-alumno-add-form-label"> * </label>
        <NacimientoComponent alumnoForm={alumnoForm} setNacimiento={setAlumnoForm} nombre={'nacimiento'} />

        {/* Errores */}
        <div style={{ fontFamily: 'var(--normal-text)', width: '80%', color: 'red', fontSize: '.9em' }}>
          {errors.map((error, index) => (
            <p key={`error-${index}`}>* {error}</p>
          ))}
        </div>

        <button className="new-alumno-add-form-addBtn " style={{ marginTop: '.5em' }} onClick={handleCheckAddForm}> Aceptar </button>
      </form>
    </div>
  )
}