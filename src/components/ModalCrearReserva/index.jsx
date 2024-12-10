import Modal from 'components/Modal/Modal'
import { CrearReservaProvider } from './context/CrearReservaContext'
import CrearReservaContent from './CrearReservaContent'

import './ModalCrearReserva.css'

export const ModalCrearReserva = ({ isVisible, onClose }) => {
  return (
    <CrearReservaProvider>
      <Modal isVisible={isVisible} onClose={onClose} title="Crear reserva">
        <CrearReservaContent />
      </Modal>
    </CrearReservaProvider>
  )
}
