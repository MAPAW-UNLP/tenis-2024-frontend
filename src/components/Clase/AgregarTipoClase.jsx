import { useState } from 'react'
import { GenericButton } from '../../components/Utils/GenericButton'
import '../../styles/ajustes/tipoClaseForm.css'

const FormularioTipoClase = ({ onClose, onSubmit }) => {
  const [tipo, setTipo] = useState('')
  const [importe, setImporte] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ tipo, importe })
    onClose()
  }

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Crear nuevo tipo de clase</h2>
        <form className="new-clase-add-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="tipo" className="new-clase-add-form-label">
              Nombre:{' '}
              <span style={{ color: 'green', marginLeft: '1.8rem' }}>*</span>
            </label>
            <input
              id="tipo"
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="new-clase-input"
            />
          </div>
          <div>
            <label htmlFor="importe" className="new-clase-add-form-label">
              $Importe:
              <span style={{ color: 'green', marginLeft: '1rem' }}> *</span>
            </label>
            <input
              id="importe"
              type="number"
              value={importe}
              onChange={(e) => setImporte(e.target.value)}
            />
          </div>
          <button> Crear</button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormularioTipoClase
