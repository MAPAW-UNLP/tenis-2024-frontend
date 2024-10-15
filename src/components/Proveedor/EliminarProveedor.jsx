import { useState } from 'react'
import CancelButton from './CancelButton'
import ConfirmButton from './ConfirmButton'

const EliminarProveedor = ({
  idProveedor,
  isOpen,
  handleClose,
  upgrade = () => {},
}) => {
  const [loading, setLoading] = useState(false)
  const [activePopup, setActivePopup] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const deletedProveedor = await fetch(
      `http://localhost:8083/api/proveedor/${idProveedor}`,
      {
        method: 'DELETE',
      }
    )
    setLoading(false)
    setActivePopup(true)
    handleClose()
    upgrade()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="proveedor-delete-modal">
        <button id="close-proveedor-add-form" onClick={handleClose}>
          x
        </button>
        <h2>Eliminar Proveedor</h2>
        <p>¿Estás seguro de que deseas eliminar este proveedor?</p>
        <div className="button-container">
          <ConfirmButton text="Eliminar" handleClick={handleDelete} />
          <CancelButton handleClick={handleClose} />
        </div>
        {loading && <div className="spinner spinner-centered"></div>}
      </div>
      {activePopup && (
        <div className="popup">¡Proveedor eliminado con éxito!</div>
      )}
    </>
  )
}

export default EliminarProveedor
