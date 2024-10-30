import { useState } from 'react'
import { GenericButton } from '../../components/Utils/GenericButton'
import '../../styles/ajustes/tipoClaseForm.css'

const FormularioItemAlquiler = ({ onClose, onSubmit }) => {
  const [desc, seItem] = useState('')
  const [importe, setImporte] = useState('')
  const [errores, setErrores] = useState({ desc: false, importe: false })

  const MAX_LENGTH = 50

  const handleSubmit = (e) => {
    e.preventDefault()

    const nuevosErrores = {
      desc: '',
      importe: '',
    }

    if (tipo.trim() === '') {
      nuevosErrores.desc = '*Debes ingresar la descripcion del item.'
    } else if (desc.length > MAX_LENGTH) {
      nuevosErrores.tipo = `*La descripción no debe exceder ${MAX_LENGTH} caracteres`
    }

    if (importe === '') {
      nuevosErrores.importe = '*Debes ingresar el importe'
    } else if (!Number.isInteger(Number(importe)) || parseFloat(importe) <= 0) {
      nuevosErrores.importe = '*El importe debe ser un número  mayor a 0'
    }

    setErrores(nuevosErrores)

    // Si hay algún error, no enviar el formulario
    if (nuevosErrores.desc || nuevosErrores.importe) return

    onSubmit({ desc, importe: parseInt(importe) })
    onClose()
  }

  const handleImporteChange = (e) => {
    const valor = e.target.value.replace(/[^0-9]/g, '') // Permitir solo dígitos
    setImporte(valor)
  }

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Agregar nuevo Item</h2>
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
              onChange={(e) => seItem(e.target.value.toUpperCase())}
              className="new-clase-input"
            />
            {errores.tipo && <p style={{ color: 'red' }}>{errores.tipo}</p>}
          </div>
          <div>
            <label htmlFor="importe" className="new-clase-add-form-label">
              $Importe:
              <span style={{ color: 'green', marginLeft: '1rem' }}> *</span>
            </label>
            <input
              id="importe"
              type="text" // Cambiado a "text" para aplicar la regex
              value={importe}
              onChange={handleImporteChange} // Usar la nueva función
            />
            {errores.importe && (
              <p style={{ color: 'red' }}>{errores.importe}</p>
            )}
          </div>
          <button>Crear</button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormularioItemAlquiler
