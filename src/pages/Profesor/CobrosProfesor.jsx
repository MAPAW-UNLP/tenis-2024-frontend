import React, { useState, useEffect } from 'react'
import Modal from 'components/Modal/Modal'
import { getCobrosProfesor } from 'api/profesores'
import 'styles/cobrosProfesor.css'

const CobrosProfesor = ({ profesorId, isVisible, onClose }) => {
  const [cobros, setCobros] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true)
      setError(null)
      getCobrosProfesor(profesorId)
        .then((data) => {
          console.log('DATA RECIBIDA:', data) // Verifica qué datos devuelve el endpoint
          setCobros(data)
        })
        .catch(() => setError('Error al cargar los cobros.'))
        .finally(() => setIsLoading(false))
    }
  }, [isVisible, profesorId])

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      showHeader={true}
      title="Tus cobros"
    >
      <div className="cobros-profesor">
        {isLoading ? (
          <p className="loading-text">Cargando cobros...</p> // Solo el mensaje "Cargando..."
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : cobros.length > 0 ? (
          <div className="cobros-grid">
            {cobros.map((cobro, index) => (
              <div key={index} className="cobro-card">
                <div className="cobro-info">
                  <p>
                    <strong>Monto:</strong> ${cobro.monto}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {cobro.descripcion}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {cobro.fecha}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="error-text">Todavia no tienes cobros!</p>
        )}
      </div>
    </Modal>
  )
}

export default CobrosProfesor
