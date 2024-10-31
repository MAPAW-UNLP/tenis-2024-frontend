import { useEffect, useState } from 'react'
import { GenericButton } from '../../components/Utils/GenericButton'
import '../../styles/ajustes/tipoClaseForm.css'

const FormularioItemAlquiler = ({ onClose, onSubmit, item }) => {
  const [desc, setItem] = useState('')
  const [importe, setImporte] = useState('')
  const [errores, setErrores] = useState({ desc: false, importe: false })
  const [botonHabilitado, setBotonHabilitado] = useState(true)

  const MAX_LENGTH = 50

  useEffect(() => {
    if (item) {
      setItem(item.description)
      setImporte(item.importe)
    } else {
      setItem('')
      setImporte('')
    }
  }, [item])

  useEffect(() => {
    // Comprobar si los valores actuales son iguales a los del ítem
    if (item) {
      const unchanged =
        desc.trim() === item.description && importe == item.importe
      setBotonHabilitado(!unchanged)
    }
  }, [desc, importe, item])

  const handleSubmit = (e) => {
    e.preventDefault()

    const nuevosErrores = {
      desc: '',
      importe: '',
    }

    if (desc.trim() === '') {
      nuevosErrores.desc = '*Debes ingresar la descripcion del item.'
    } else if (desc.length > MAX_LENGTH) {
      nuevosErrores.desc = `*La descripción no debe exceder ${MAX_LENGTH} caracteres`
    }

    if (importe === '') {
      nuevosErrores.importe = '*Debes ingresar el importe'
    } else if (!Number.isInteger(Number(importe)) || parseFloat(importe) <= 0) {
      nuevosErrores.importe = '*El importe debe ser un número mayor a 0'
    }

    setErrores(nuevosErrores)

    // Si hay algún error, no enviar el formulario
    if (nuevosErrores.desc || nuevosErrores.importe) return

    onSubmit({ id: item?.id, desc, importe: parseInt(importe) })
    onClose()
  }

  const handleDescChange = (e) => {
    const value = e.target.value.toUpperCase()
    setItem(value)
  }

  const handleImporteChange = (e) => {
    const valor = e.target.value.replace(/[^0-9]/g, '') // Permitir solo dígitos
    setImporte(valor)
  }

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>{item ? 'Editar Item' : 'Agregar nuevo Item'}</h2>
        <form className="new-clase-add-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="desc" className="new-clase-add-form-label">
              Nombre:{' '}
              <span style={{ color: 'green', marginLeft: '1.8rem' }}>*</span>
            </label>
            <input
              id="desc"
              type="text"
              value={desc}
              placeholder={item ? item.description : ''}
              onChange={handleDescChange}
              className="new-clase-input"
            />
            {errores.desc && <p style={{ color: 'red' }}>{errores.desc}</p>}
          </div>
          <div>
            <label htmlFor="importe" className="new-clase-add-form-label">
              $Importe:
              <span style={{ color: 'green', marginLeft: '1rem' }}> *</span>
            </label>
            <input
              id="importe"
              type="text" // Cambiado a "text" para aplicar la regex
              placeholder={item ? item.importe : ''}
              value={importe}
              onChange={handleImporteChange}
            />
            {errores.importe && (
              <p style={{ color: 'red' }}>{errores.importe}</p>
            )}
          </div>
          <button
            className={
              botonHabilitado ? 'boton-habilitado' : 'boton-deshabilitado'
            }
            disabled={!botonHabilitado}
          >
            {item ? 'Editar' : 'Crear'}
          </button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormularioItemAlquiler
