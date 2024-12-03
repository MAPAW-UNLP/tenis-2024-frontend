import InputReComponent from '../Utils/InputReComponent'
import InputValueComponent from '../Utils/InputValueComponent'
import SelectReComponent from '../Utils/SelectReComponent'
import '../../styles/movimiento/movimientoForm.css'
import { useEffect, useState } from 'react'

export const MovimientoForm = ({
  handleCloseForm,
  submitMovimientoForm,
  personas,
  proveedores,
  handleChangeFormData,
  movimientoAddForm,
  movimientoOptions,
  movimiento,
  clasesOptions,
  itemOptions,
}) => {
  const [errors, setErrors] = useState([])
  const [selectedItem, setSelectedItem] = useState([])
  const [cantidad, setCantidad] = useState(1)
  const [monto, setMonto] = useState(0)
  const handleResetOptions = () => {
    movimientoAddForm.personaId = ''
    movimientoAddForm.tipoClaseId = ''
    movimientoAddForm.personaSeleccionada = ''
    movimientoAddForm.descripcion = ''
    movimientoAddForm.monto = ''
    setCantidad(1)
  }

  useEffect(() => {
    handleResetItem()
    handleResetOptions()
  }, [movimientoAddForm.concepto])

  const handleCheckAddForm = (event) => {
    event.preventDefault()
    setErrors([])
    let result = false

    if (movimiento === 'Cobro') {
      result = verifyFormCobro()
    } else {
      result = verifyFormPago()
    }
    if (result) {
      submitMovimientoForm()
    }
  }

  const handleCloseMovimientoForm = () => {
    setErrors([])
    handleCloseForm()
  }

  const verifyFormCobro = () => {
    const verify = []
    if (!movimientoAddForm.concepto)
      verify.push('El concepto no puede estar vacio')
    if (movimientoAddForm.concepto === '1') {
      if (!movimientoAddForm.personaId)
        verify.push('Debe seleccionar un alumno')
      if (!movimientoAddForm.tipoClaseId)
        verify.push('Debe seleccionar un tipo de clase')
    }
    if (!movimientoAddForm.descripcion)
      verify.push('La descripcion no puede estar vacia')
    if (!movimientoAddForm.monto) {
      verify.push('El monto no puede estar vacio')
    } else if (!/^\d+$/.test(movimientoAddForm.monto)) {
      verify.push('El monto debe ser un número entero')
    }

    setErrors(verify)
    return verify.length === 0
  }

  const verifyFormPago = () => {
    const verify = []
    if (!movimientoAddForm.concepto)
      verify.push('El concepto no puede estar vacio')
    if (movimientoAddForm.concepto === '1') {
      if (!movimientoAddForm.personaId)
        verify.push('Debe seleccionar un profesor')
    } else if (movimientoAddForm.concepto === '2') {
      if (!movimientoAddForm.proveedorId) {
        verify.push('Debe seleccionar un proveedor')
      }
    }
    if (!movimientoAddForm.descripcion)
      verify.push('La descripcion no puede estar vacia')
    if (!movimientoAddForm.monto) verify.push('El monto no puede estar vacio')

    setErrors(verify)
    return verify.length === 0
  }

  const handleChangeFormItem = (event) => {
    const selectedValue = event.target.value

    if (selectedValue === '') {
      setSelectedItem({ importe: 'Monto' })
      movimientoAddForm.monto = 'Monto'
      movimientoAddForm.descripcion = '' // Resetea la descripción
    } else {
      const selectedOption = itemOptions.find(
        (option) => option.id.toString() === selectedValue
      )
      setSelectedItem(selectedOption)
      movimientoAddForm.monto = selectedOption.importe * cantidad

      setMonto(selectedOption.importe)
      movimientoAddForm.descripcion = selectedOption.concepto
    }
  }

  const handleCantidadChange = (event) => {
    const value = event.target.value
    if (value < 1) {
      value = 1 // Si la cantidad es menor que 1, se establece como 1
    }
    setCantidad(value)
    handleChangeCant(value)
  }

  function handleChangeCant(cant) {
    movimientoAddForm.monto = monto * cant
  }

  const handleResetItem = () => {
    setSelectedItem({ importe: 'Monto' })
    movimientoAddForm.monto = 'Monto'
    movimientoAddForm.descripcion = ''
  }

  return (
    <div className="movimiento-add-component">
      <button
        className="close-movimiento-add-form"
        onClick={handleCloseMovimientoForm}
      >
        {' '}
        x{' '}
      </button>
      <h2>Nuevo {movimiento}</h2>
      <form className="movimiento-add-form">
        <label htmlFor="concepto" className="movimiento-form-label">
          *{' '}
        </label>
        <SelectReComponent
          name={'concepto'}
          onChange={handleChangeFormData}
          options={movimientoOptions}
          placeholder={'Concepto'}
        />

        {(() => {
          switch (movimientoAddForm.concepto) {
            case '1':
              return (
                <>
                  <label htmlFor="personaId" className="movimiento-form-label">
                    *{' '}
                  </label>
                  <SelectReComponent
                    name={'personaId'}
                    onChange={handleChangeFormData}
                    options={personas}
                    placeholder={`Seleccionar ${movimiento === 'Cobro' ? 'alumno' : 'profesor'}`}
                  />
                  {movimiento === 'Cobro' && (
                    <>
                      <label
                        htmlFor="tipoClaseId"
                        className="movimiento-form-label"
                      >
                        *{' '}
                      </label>
                      <select
                        name={'tipoClaseId'}
                        onChange={handleChangeFormData}
                      >
                        <option value="">Tipo de clase</option>
                        {clasesOptions.map((option) => (
                          <option value={option.id} key={option.id}>
                            {option.tipo}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </>
              )
            case '2':
              return (
                <>
                  <label
                    htmlFor="proveedorId"
                    className="movimiento-form-label"
                  >
                    *{' '}
                  </label>
                  <SelectReComponent
                    name={'proveedorId'}
                    onChange={handleChangeFormData}
                    options={proveedores}
                    placeholder={`Seleccionar proveedor`}
                  />
                </>
              )
            case '3':
              return (
                <>
                  <label htmlFor="itemId" className="movimiento-form-label">
                    *{' '}
                  </label>
                  <SelectReComponent
                    name={'itemId'}
                    onChange={handleChangeFormItem}
                    options={itemOptions || []}
                    placeholder={`Seleccionar item`}
                  />
                  <label htmlFor="Cantidad" className="movimiento-form-label">
                    *{' '}
                  </label>
                  <input
                    type="number"
                    name="Cantidad"
                    value={cantidad}
                    onChange={handleCantidadChange}
                    placeholder="Cantidad"
                  />
                </>
              )
            default:
              return null
          }
        })()}

        {movimientoAddForm.concepto !== '3' && (
          <>
            <label htmlFor="descripcion" className="movimiento-form-label">
              *{' '}
            </label>
            <InputValueComponent
              type={'text'}
              name={'descripcion'}
              onChangeFuncion={handleChangeFormData}
              placeholder={'Descripción'}
              value={movimientoAddForm.descripcion}
            />
          </>
        )}

        <label htmlFor="monto" className="movimiento-form-label">
          *{' '}
        </label>
        <InputReComponent
          name="monto"
          onChangeFuncion={handleChangeFormData}
          placeholder="Monto"
          value={movimientoAddForm.monto}
        />

        <div
          style={{
            fontFamily: 'var(--normal-text)',
            width: '80%',
            color: 'red',
            fontSize: '.9em',
          }}
        >
          {errors.map((error, index) => (
            <p key={`error-${index}`}>* {error}</p>
          ))}
        </div>
        <button
          className="movimiento-add-form-addBtn"
          style={{ marginTop: '.5em' }}
          onClick={handleCheckAddForm}
        >
          Aceptar
        </button>
      </form>
    </div>
  )
}
