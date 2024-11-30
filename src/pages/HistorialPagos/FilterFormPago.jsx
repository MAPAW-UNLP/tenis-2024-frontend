import React, { useState, useEffect } from 'react'
import '../../styles/filter-form-pago.css'

const ResponsiveForm = ({ onSubmitSuccess, onResetFilters, initialValues }) => {
  const [formData, setFormData] = useState(initialValues)

  useEffect(() => {
    setFormData(initialValues) // Sincronizar con los valores iniciales
  }, [initialValues])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmitSuccess(formData) // Pasar los filtros al componente padre
  }

  const handleReset = () => {
    onResetFilters() // Llamar al método de reset en el componente padre
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
        <div className="responsive-form-buttons">
          <button type="submit" className="responsive-form-button">
            Filtrar
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="responsive-form-button reset-button"
          >
            Borrar
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResponsiveForm
