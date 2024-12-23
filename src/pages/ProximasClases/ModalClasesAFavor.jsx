import React, { useState } from 'react'
import Modal from 'components/Modal/Modal'
import '../../styles/modal-clases-a-favor.css'
import { reservarClaseAFavor } from 'api/cliente'
import Swal from 'sweetalert2'
import { useSession } from '../../hooks/useSession'
function FormModal({ isVisible, onClose }) {
  const { session } = useSession()
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    clienteID: session.id,
  })

  const horas = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const reservarClase = async (formData) => {
    const data = await reservarClaseAFavor(formData)
    if (data.status == 200) {
      Swal.fire({
        icon: 'success',
        title: 'Clase creada con éxito',
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        window.location.reload()
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrió un error al reservar la clase',
        text: 'Intente mas tarde',
        toast: true,
        position: 'top-end',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formattedData = {
      ...formData,
      startTime: `${formData.startTime}:00`,
      endTime: `${formData.endTime}:00`,
    }
    console.log('Enviando datos:', formattedData)
    reservarClase(formattedData)
    onClose()
  }

  if (!isVisible) return null

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="clases-a-favor-modal">
        <div className="clases-a-favor-modal__header">
          <h3 className="clases-a-favor-modal__title">Formulario</h3>
          <button className="clases-a-favor-modal__close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="clases-a-favor-modal__body">
          <div className="clases-a-favor-modal__input-group">
            <label htmlFor="date" className="clases-a-favor-modal__label">
              Fecha:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="clases-a-favor-modal__input"
              required
            />
          </div>
          <div className="clases-a-favor-modal__input-group">
            <label htmlFor="startTime" className="clases-a-favor-modal__label">
              Hora de inicio:
            </label>
            <select
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              className="clases-a-favor-modal__select"
              required
            >
              <option value="">Selecciona una hora</option>
              {horas.map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          </div>
          <div className="clases-a-favor-modal__input-group">
            <label htmlFor="endTime" className="clases-a-favor-modal__label">
              Hora de fin:
            </label>
            <select
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              className="clases-a-favor-modal__select"
              required
            >
              <option value="">Selecciona una hora</option>
              {horas.map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="clases-a-favor-modal__submit-btn">
            Reservar
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default FormModal
