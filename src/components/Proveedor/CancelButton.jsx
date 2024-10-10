const CancelButton = ({ handleClick }) => {
  return (
    <button onClick={handleClick} id="proveedor-add-form-cancelBtn">
      <span className="textoBotonCancelar">Cancelar</span>
    </button>
  )
}

export default CancelButton
