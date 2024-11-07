const ConfirmButton = ({ text, handleClick }) => {
  return (
    <button id="proveedor-add-form-addBtn" onClick={handleClick}>
      <span className="textoBotonAceptar">{text}</span>
    </button>
  )
}

export default ConfirmButton
