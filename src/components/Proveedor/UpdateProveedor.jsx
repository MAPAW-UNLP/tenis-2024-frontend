import InputReComponent from '../Utils/InputReComponent'
import useInputValidation from 'hooks/Proveedores/useInputValidation'
import { useState } from 'react'

export const UpdateProveedor = ({ handleCloseForm, proveedor = {} }) => {
  const partial = true
  const [proveedorForm, setProveedorForm] = useState({
    nombre: proveedor.nombre,
    telefono: proveedor.telefono,
  })

  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    value: nombre,
    feedback: nombreFeedback,
    handleChange: handleChangeName,
  } = useInputValidation(
    proveedor.nombre,
    'nombre',
    setProveedorForm,
    'nombre',
    proveedor,
    partial
  )

  const {
    value: telefono,
    feedback: telefonoFeedback,
    handleChange: handleChangeTelefono,
  } = useInputValidation(
    proveedor.telefono,
    'telefono',
    setProveedorForm,
    'telefono',
    proveedor,
    partial
  )

  const updateProveedor = (e) => {
    e.preventDefault()

    setLoading(true)

    const data = {
      nombre:
        proveedorForm.nombre !== '' ? proveedorForm.nombre : proveedor.nombre,
      telefono:
        proveedorForm.telefono !== ''
          ? proveedorForm.telefono
          : proveedor.telefono,
    }

    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(data),
    }

    fetch(`http://localhost:8083/api/proveedor/${proveedor.id}`, requestOptions)
      .then((response) => response.json())
      .then(
        () => setShowSuccessPopup(true),
        setTimeout(() => {
          setShowSuccessPopup(false)
          handleCloseForm()
          setLoading(false)
        }, 5000)
      )
  }

  return (
    <div id="proveedor-add-component">
      <button id="close-proveedor-add-form" onClick={handleCloseForm}>
        x
      </button>
      <h2>Editar Proveedor</h2>
      <form onSubmit={updateProveedor}>
        <label className="textoFormulario">Nombre</label>
        <div className="inputlabel">
          <InputReComponent
            type={'text'}
            name={'nombre'}
            className={'proveedor-add-form-input'}
            onChangeFuncion={handleChangeName}
            placeholder={nombre}
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
            onChangeFuncion={handleChangeTelefono}
            placeholder={telefono}
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
          <button id="proveedor-add-form-addBtn" type="submit">
            <p className="textoBotonAceptar">Guardar</p>
          </button>
          <button onClick={handleCloseForm} id="proveedor-add-form-cancelBtn">
            <p className="textoBotonCancelar">Cancelar</p>
          </button>
        </div>
        {loading && <div className="spinner"></div>}
      </form>
      {showSuccessPopup && (
        <div className="popup">¡Proveedor actualizado con éxito!</div>
      )}
    </div>
  )
}
