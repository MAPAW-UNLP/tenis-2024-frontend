import Button from './Button'

const EliminarProveedor = ({ idProveedor, isOpen, handleClose }) => {
  const handleDelete = async () => {
    handleClose()
    const deletedProveedor = await fetch(
      `http://localhost:8083/api/proveedor/${idProveedor}`,
      {
        method: 'DELETE',
      }
    )
  }

  if (!isOpen) return null

  return (
    <div className="proveedor-delete-modal">
      <h2>Eliminar Proveedor</h2>
      <p>¿Estás seguro de que deseas eliminar este proveedor?</p>
      <div className="botones-delete-proveedor">
        <Button text="Eliminar" handleClick={handleDelete} />
        <Button text="Cancelar" handleClick={handleClose} color="white" />
      </div>
    </div>
  )
}

export default EliminarProveedor
