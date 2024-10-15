import React, { useState } from 'react'
import InputReComponent from '../Utils/InputReComponent'
import useInputValidation from 'hooks/Proveedores/useInputValidation'
import { wait } from 'components/Utils/Functions'

function AgregarProveedor({ handleCloseForm, proveedores = [] }) {
  const [proveedorForm, setProveedorForm] = useState({
    nombre: '',
    telefono: '',
  })

  const {
    value: nombre,
    feedback: nombreFeedback,
    isValid: nombreValid,
    handleChange: handleChangeName,
  } = useInputValidation('', 'nombre', setProveedorForm, 'nombre', proveedores)

  const {
    value: telefono,
    feedback: telefonoFeedback,
    isValid: telefonoValid,
    handleChange: handleChangeTelefono,
  } = useInputValidation('', 'telefono', setProveedorForm, 'telefono')

  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const [loading, setLoading] = useState(false)

  const habilitarBoton = () => {
    return !(nombreValid && telefonoValid && !loading)
  }

  const addProveedor = async (e) => {
    e.preventDefault()

    setLoading(true)

    const data = {
      nombre: proveedorForm.nombre,
      telefono: proveedorForm.telefono,
    }

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const response = await fetch(
      `http://localhost:8083/api/proveedor`,
      requestOptions
    )
    await response.json()
    setShowSuccessPopup(true)

    await wait(2000)

    setShowSuccessPopup(false)
    setLoading(false)
    handleCloseForm(true)
  }

  return (
    <div id="proveedor-add-component">
      <button id="close-proveedor-add-form" onClick={handleCloseForm}>
        x
      </button>
      <h2>Nuevo Proveedor</h2>
      <form onSubmit={addProveedor}>
        <label className="textoFormulario">Nombre</label>
        <div className="inputlabel">
          <InputReComponent
            type={'text'}
            name={'nombre'}
            className={'proveedor-add-form-input'}
            placeholder={'Juan Carlos Medina'}
            onChangeFuncion={handleChangeName}
            value={nombre}
          />
          <p className="feedbackInline" style={{ color: nombreFeedback.color }}>
            {nombreFeedback.text}
          </p>
        </div>
        <label className="textoFormulario">Teléfono</label>
        <div className="inputlabel">
          <InputReComponent
            type={'text'}
            name={'telefono'}
            className={'proveedor-add-form-input'}
            placeholder={'2245 043201'}
            onChangeFuncion={handleChangeTelefono}
            value={telefono}
          />
          <p
            className="feedbackInline"
            style={{ color: telefonoFeedback.color }}
          >
            {telefonoFeedback.text}
          </p>
        </div>
        <div className="button-container">
          <button
            disabled={habilitarBoton()}
            id="proveedor-add-form-addBtn"
            type="submit"
          >
            <p className="textoBotonAceptar">Agregar</p>
          </button>
          <button onClick={handleCloseForm} id="proveedor-add-form-cancelBtn">
            <p className="textoBotonCancelar">Cancelar</p>
          </button>
        </div>
        {loading && <div className="spinner"></div>}
      </form>
      {showSuccessPopup && (
        <div className="popup">¡Proveedor agregado con éxito!</div>
      )}
    </div>
  )
}

export default AgregarProveedor
