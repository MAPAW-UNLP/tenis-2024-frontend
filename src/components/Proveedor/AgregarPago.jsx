import React, { useState } from 'react'
import moment from 'moment'
import InputReComponent from '../Utils/InputReComponent'
import useInputValidation from 'hooks/Proveedores/useInputValidation'
import { wait } from 'components/Utils/Functions'
import '../../styles/proveedores/form.css'
import '../../styles/proveedores/popup.css'
import '../../styles/proveedores/spinner.css'
import Button from 'components/Button/Button'

function AgregarPago({
  handleCloseForm,
  proveedorFijo, // Este arreglo contendrá los proveedores
}) {
  const [pagoForm, setPagoForm] = useState({
    descripcion: '',
    monto: '',
  })

  const {
    value: monto,
    feedback: montoFeedback,
    isValid: montoValid,
    handleChange: handleChangeMonto,
  } = useInputValidation('', 'monto', setPagoForm, 'monto')

  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [descripcion, setDescripcion] = useState(
    `Pago a: ${proveedorFijo.nombre}`
  )

  const habilitarBoton = () => {
    return !(montoValid && !loading)
  }

  const addPago = async (e) => {
    e.preventDefault()

    setLoading(true)

    const data = {
      idProveedor: proveedorFijo.id,
      concepto: 2,
      descripcion: descripcion,
      monto: pagoForm.monto,
      fecha: moment().format('YYYY/MM/DD'),
    }

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const response = await fetch(
      `http://localhost:8083/api/nuevo_pago`,
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
    <>
      <h2>Nuevo Pago</h2>
      <form onSubmit={addPago}>
        <label className="textoFormulario">Proveedor</label>
        <div className="inputlabel">
          <InputReComponent
            type={'text'}
            defaultValue={proveedorFijo.nombre}
            readOnly={true}
            className="proveedor-add-form-input"
          />
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
            defaultValue={descripcion}
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
          <Button disabled={habilitarBoton()} type="submit">
            Agregar Pago
          </Button>
          <Button color="secondary" onClick={handleCloseForm}>
            Cancelar
          </Button>
        </div>
        {loading && <div className="spinner"></div>}
      </form>
      {showSuccessPopup && (
        <div className="popup">¡Pago agregado con éxito!</div>
      )}
    </>
  )
}

export default AgregarPago
