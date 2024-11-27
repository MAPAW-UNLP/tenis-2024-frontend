import { useState } from 'react'
import { wait } from 'components/Utils/Functions'
import '../../styles/proveedores/delete.css'
import '../../styles/proveedores/popup.css'
import '../../styles/proveedores/spinner.css'
import { deleteProveedor } from 'api/proveedores'
import Button from 'components/Button/Button'

const EliminarProveedor = ({ idProveedor, isOpen, handleClose }) => {
  const [loading, setLoading] = useState(false)
  const [activePopup, setActivePopup] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    await deleteProveedor(idProveedor)
    setActivePopup(true)
    await wait(2000)
    setLoading(false)
    handleClose(true)
  }

  if (!isOpen) return null

  return (
    <>
      <>
        <h2>Eliminar Proveedor</h2>
        <p>¿Estás seguro de que deseas eliminar este proveedor?</p>
        <div className="button-container">
          <Button onClick={handleDelete} size="lg">
            Aceptar
          </Button>
          <Button color="secondary" onClick={handleClose} size="lg">
            Cancelar
          </Button>
        </div>
        {loading && <div className="spinner spinner-centered"></div>}
      </>
      {activePopup && (
        <div className="popup">¡Proveedor eliminado con éxito!</div>
      )}
    </>
  )
}

export default EliminarProveedor
