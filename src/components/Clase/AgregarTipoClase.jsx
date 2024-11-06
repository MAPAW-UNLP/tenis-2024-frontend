import { useEffect, useState } from 'react'
import { GenericButton } from '../../components/Utils/GenericButton'
import '../../styles/ajustes/tipoClaseForm.css'

const FormularioTipoClase = ({ onClose, onSubmit, tipoClase }) => {
  const [tipo, setTipo] = useState('')
  const [importe, setImporte] = useState('')
  const [errores, setErrores] = useState({ tipo: false, importe: false })
  const [botonHabilitado, setBotonHabilitado] = useState(true)

  const MAX_LENGTH = 20

  useEffect(() => {
    if (tipoClase) {
      setTipo(tipoClase.tipo)
      setImporte(tipoClase.importe)
    } else {
      setTipo('')
      setImporte('')
    }
  }, [tipoClase])

  useEffect(() => {
    if (tipoClase) {
      const unchanged =
        tipo.trim() === tipoClase.tipo && importe == tipoClase.importe
      setBotonHabilitado(!unchanged)
    }
  }, [tipo, importe, tipoClase])

  const handleSubmit = (e) => {
    e.preventDefault()

    const nuevosErrores = {
      tipo: '',
      importe: '',
    }

    if (tipo.trim() === '') {
      nuevosErrores.tipo = '*Debes ingresar el nombre'
    } else if (tipo.length > MAX_LENGTH) {
      nuevosErrores.tipo = `*El nombre no debe exceder ${MAX_LENGTH} caracteres`
    }

    if (importe === '') {
      nuevosErrores.importe = '*Debes ingresar el importe'
    } else if (!Number.isInteger(Number(importe)) || parseFloat(importe) <= 0) {
      nuevosErrores.importe = '*El importe debe ser un número  mayor a 0'
    }

    setErrores(nuevosErrores)

    // Si hay algún error, no enviar el formulario
    if (nuevosErrores.tipo || nuevosErrores.importe) return

    onSubmit({ id: tipoClase?.id, tipo, importe: parseInt(importe) })
    onClose()
  }

  const handleTipoChange = (e) => {
    const value = e.target.value.toUpperCase()
    setTipo(value)
  }

  const handleImporteChange = (e) => {
    const valor = e.target.value.replace(/[^0-9]/g, '') // Permitir solo dígitos
    setImporte(valor)
  }

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>
          {' '}
          {tipoClase ? 'Editar tipo de clase' : 'Crear nuevo tipo de clase'}
        </h2>
        <form className="new-clase-add-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="tipo" className="new-clase-add-form-label">
              Nombre:{' '}
              <span style={{ color: 'red', marginLeft: '1.8rem' }}>*</span>
            </label>
            <input
              id="tipo"
              type="text"
              value={tipo}
              placeholder={tipoClase ? tipoClase.tipo : 'MIXTA'}
              onChange={handleTipoChange}
              className="new-clase-input"
            />
            {errores.tipo && <p style={{ color: 'red' }}>{errores.tipo}</p>}
          </div>
          <div>
            <label htmlFor="importe" className="new-clase-add-form-label">
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '1em',
                  color: ' green',
                }}
              >
                $
              </span>{' '}
              Importe:
              <span style={{ color: 'red', marginLeft: '1rem' }}> *</span>
            </label>
            <input
              id="importe"
              type="text" // Cambiado a "text" para aplicar la regex
              value={importe}
              placeholder={tipoClase ? tipoClase.importe : '500'}
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
            {tipoClase ? 'Editar' : 'Crear'}{' '}
          </button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormularioTipoClase
