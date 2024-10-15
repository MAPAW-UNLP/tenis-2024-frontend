import React, { useState } from 'react'
import InputReComponent from '../Utils/InputReComponent'
import useInputValidation from 'hooks/Proveedores/useInputValidation'
import { wait } from 'components/Utils/Functions'

function AgregarPago({
  handleCloseForm,
  proveedores = [], // Este arreglo contendrá los proveedores
  updateList = () => {},
}) {
  const [pagoForm, setPagoForm] = useState({
    proveedor: '',
    descripcion: '',
    monto: '',
  })

  const {
    value: proveedor,
    feedback: proveedorFeedback,
    isValid: proveedorValid,
    handleChange: handleChangeProveedor,
  } = useInputValidation('', 'proveedor', setPagoForm, 'proveedor', proveedores)

  const {
    value: monto,
    feedback: montoFeedback,
    isValid: montoValid,
    handleChange: handleChangeMonto,
  } = useInputValidation('', 'monto', setPagoForm, 'monto')

  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [descripcion, setDescripcion] = useState('')

  const habilitarBoton = () => {
    return !(proveedorValid && montoValid && !loading)
  }

  const addPago = async (e) => {
    e.preventDefault()

    setLoading(true)

    const data = {
      idProveedor: pagoForm.proveedor,
      descripcion: descripcion,
      monto: pagoForm.monto,
    }

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const response = await fetch(
      `http://localhost:8083/api/pagosProveedor`,
      requestOptions
    )
    await response.json()
    setShowSuccessPopup(true)

    await wait(2000)

    setShowSuccessPopup(false)
    setLoading(false)
    updateList()
    handleCloseForm()
  }

  return (
    <div id="proveedor-add-component">
      <button id="close-proveedor-add-form" onClick={handleCloseForm}>
        x
      </button>
      <h2>Nuevo Pago</h2>
      <form onSubmit={addPago}>
        <label className="textoFormulario">Proveedor</label>
        <div className="inputlabel">
          <select
            name="proveedor"
            className="proveedor-add-form-input"
            value={proveedor}
            onChange={handleChangeProveedor}
          >
            <option value="">Seleccionar Proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.nombre}
              </option>
            ))}
          </select>
          <p
            className="feedbackInline"
            style={{ color: proveedorFeedback.color }}
          >
            {proveedorFeedback.text}
          </p>
        </div>

        <label className="textoFormulario">Descripción</label>
        <div className="inputlabel">
          <InputReComponent
            type={'text'}
            name={'descripcion'}
            className={'proveedor-add-form-input'}
            placeholder={'Descripción del pago'}
            onChangeFuncion={(e) => {
              setDescripcion(e.target.value)
            }}
            value={descripcion}
          />
        </div>

        <label className="textoFormulario">Monto</label>
        <div className="inputlabel">
          <InputReComponent
            type={'number'}
            name={'monto'}
            className={'proveedor-add-form-input'}
            placeholder={'Monto del pago'}
            onChangeFuncion={handleChangeMonto}
            value={monto}
          />
          <p className="feedbackInline" style={{ color: montoFeedback.color }}>
            {montoFeedback.text}
          </p>
        </div>

        <div className="button-container">
          <button
            disabled={habilitarBoton()}
            id="proveedor-add-form-addBtn"
            type="submit"
          >
            <p className="textoBotonAceptar">Agregar Pago</p>
          </button>
          <button onClick={handleCloseForm} id="proveedor-add-form-cancelBtn">
            <p className="textoBotonCancelar">Cancelar</p>
          </button>
        </div>
        {loading && <div className="spinner"></div>}
      </form>
      {showSuccessPopup && (
        <div className="popup">¡Pago agregado con éxito!</div>
      )}
    </div>
  )
}

export default AgregarPago