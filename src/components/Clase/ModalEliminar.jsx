import Modal from 'components/Modal/Modal'
import { GenericButton } from 'components/Utils/GenericButton'
import '../../styles/ajustes/ModalEliminar.css'

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
        <GenericButton
          id="button-aceptarMensaje"
          onClick={confirmarBorrar}
          className="botones-MensajesUsuario"
          backgroundColor="#FF0000"
          width="200px"
          height="70px"
        >
          Aceptar
        </GenericButton>
        <GenericButton
          id="button-cerrarMensaje"
          onClick={onClose}
          className="botones-MensajesUsuario"
          width="200px"
          height="70px"
        >
          Cancelar
        </GenericButton>
      </div>
    </Modal>
  )
}

export default ModalEliminar
