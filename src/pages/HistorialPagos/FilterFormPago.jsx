import React, { useState } from 'react'
import { getHistorialPagos } from 'api/cliente'
import '../../styles/filter-form-pago.css'

const ResponsiveForm = ({ onSubmitSuccess, userId }) => {
  const [formData, setFormData] = useState({
    fecha_inicio: '',
    fecha_fin: '',
    concepto: '',
    monto: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    getHistorialPagos(userId, formData).then((data) => {
      onSubmitSuccess(data)
    })
  }

  return (
    <div className="responsive-form-container">
      <form className="responsive-form" onSubmit={handleSubmit}>
        <label className="responsive-form-label">
          Fecha Inicio:
          <input
            type="date"
            name="fecha_inicio"
            value={formData.fecha_inicio}
            onChange={handleChange}
            className="responsive-form-input"
          />
        </label>
        <label className="responsive-form-label">
          Fecha Fin:
          <input
            type="date"
            name="fecha_fin"
            value={formData.fecha_fin}
            onChange={handleChange}
            className="responsive-form-input"
          />
        </label>
        <label className="responsive-form-label">
          Concepto:
          <input
            type="text"
            name="concepto"
            value={formData.concepto}
            onChange={handleChange}
            className="responsive-form-input"
          />
        </label>
        <label className="responsive-form-label">
          Monto Minimo:
          <input
            type="number"
            name="monto"
            value={formData.monto}
            onChange={handleChange}
            className="responsive-form-input"
          />
        </label>
        <button type="submit" className="responsive-form-button">
          Filtrar
        </button>
      </form>
    </div>
  )
}

export default ResponsiveForm
