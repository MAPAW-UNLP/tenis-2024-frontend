import InputReComponent from '../Utils/InputReComponent';
import InputValueComponent from '../Utils/InputValueComponent';
import SelectReComponent from '../Utils/SelectReComponent';
import '../../styles/movimiento/movimientoForm.css'

import { useState } from 'react';

export const MovimientoForm = ({ handleCloseForm, submitMovimientoForm, personas, handleChangeFormData, movimientoAddForm,
  movimientoOptions, movimiento, clasesOptions }) => {

  // Arreglo de errores
  const [errors, setErrors] = useState([])

  const handleResetOptions = () => {
    movimientoAddForm.personaId = ''
    movimientoAddForm.tipoClaseId = ''
    movimientoAddForm.personaSeleccionada = ''
  }


  // RFuncion para revisar si todos los inputs estan completos antes de hacer el envio
  const handleCheckAddForm = (event) => {
    event.preventDefault();
    setErrors([])
    let result = false;

    if (movimiento === "Cobro") {
      result = verifyFormCobro()
    }
    else {
      result = verifyFormPago()
    }
    if (result) {
      submitMovimientoForm()
    }
  }

  // Reset errores
  const handleCloseMovimientoForm = () => {
    setErrors([])
    handleCloseForm()
  }

  // Verificar cuando el movimiento es un COBRO
  const verifyFormCobro = () => {
    const verify = []
    if (!movimientoAddForm.concepto) verify.push('El concepto no puede estar vacio');
    if (movimientoAddForm.concepto === '1') {
      if (!movimientoAddForm.personaId)
        verify.push('Debe seleccionar un alumno')
      if (!movimientoAddForm.tipoClaseId)
        verify.push('Debe seleccionar un tipo de clase')
    }
    if (!movimientoAddForm.descripcion) verify.push('La descripcion no puede estar vacia')
    if (!movimientoAddForm.monto) verify.push('El monto no puede estar vacio')

    setErrors(verify)
    return verify.length === 0 ? true : false
  }

  // Verificar cuando el movimiento es un PAGO
  const verifyFormPago = () => {
    const verify = []
    if (!movimientoAddForm.concepto) verify.push('El concepto no puede estar vacio');
    if (movimientoAddForm.concepto === '1') {
      if (!movimientoAddForm.personaId)
        verify.push('Debe seleccionar un profesor')
    }
    if (!movimientoAddForm.descripcion) verify.push('La descripcion no puede estar vacia')
    if (!movimientoAddForm.monto) verify.push('El monto no puede estar vacio')

    setErrors(verify)
    return verify.length === 0 ? true : false
  }

  return (
    <div className="movimiento-add-component">
      <button className="close-movimiento-add-form" onClick={handleCloseMovimientoForm}> x </button>
      <h2>Nuevo {movimiento}</h2>
      <form className="movimiento-add-form">
        <label htmlFor="concepto" className="movimiento-form-label"> * </label>
        <SelectReComponent name={'concepto'} onChange={handleChangeFormData} options={movimientoOptions} placeholder={'Concepto'} />

        {/* Si es un alumno/profesor muestro desplegable con la lista de usuarios correspondiente.
            Al seleccionar otra opcion reseteamos personaID del formulario para no enviarlo en el endpoint */}
        {movimientoAddForm.concepto === '1' ?
          <>
            <label htmlFor="personaId" className="movimiento-form-label"> * </label>
            <SelectReComponent name={'personaId'} onChange={handleChangeFormData} options={personas}
              placeholder={`Seleccionar ${movimiento === 'Cobro' ? 'alumno' : 'profesor'}`} />
            {movimiento === "Cobro" &&
              <>
                <label htmlFor="tipoClaseId" className="movimiento-form-label"> * </label>
                <select name={'tipoClaseId'} onChange={handleChangeFormData} >
                  <option value=''> Tipo de clase </option>
                  {clasesOptions.map((option) =>
                    <option value={option.id} id={`tipo-clase-${option.id}`} key={`tipo-clase-${option.id}`}>
                      {option.tipo}
                    </option>)}
                </select>
              </>
            }
          </>
          : handleResetOptions()
        }

        <label htmlFor="descripcion" className="movimiento-form-label"> * </label>
        <InputValueComponent type={'text'} name={'descripcion'} onChangeFuncion={handleChangeFormData} placeholder={'Descripcion'}
          value={movimientoAddForm.descripcion} />
          
        <label htmlFor="monto" className="movimiento-form-label"> * </label>
        <InputReComponent name={'monto'} onChangeFuncion={handleChangeFormData} placeholder={'Monto'} />

        <div style={{ fontFamily: 'var(--normal-text)', width: '80%', color: 'red', fontSize: '.9em' }}>
          {errors.map((error, index) => (
            <p key={`error-${index}`}>* {error}</p>
          ))}
        </div>

        <button className="movimiento-add-form-addBtn" style={{ marginTop: '.5em' }} onClick={handleCheckAddForm}> Aceptar </button>
      </form>
    </div>
  )
}