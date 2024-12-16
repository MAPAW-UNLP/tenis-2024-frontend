import Modal from 'components/Modal/Modal'
import { GenericButton } from 'components/Utils/GenericButton'
import '../../styles/ajustes/ModalEliminar.css'
import Button from 'components/Button/Button'

function ModalEliminar({
  isVisible,
  mensaje,
  titulo,
  onClose,
  confirmarBorrar,
}) {
  return (
    <Modal isVisible={isVisible} onClose={onClose} title={titulo}>
      <div className="modal-eliminar">
        <p>{mensaje}</p>
        <div className="button-container">
          <Button color="danger" size="lg" onClick={confirmarBorrar}>
            Aceptar
          </Button>
          <Button color="success" size="lg" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalEliminar
