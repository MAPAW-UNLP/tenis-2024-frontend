const Button = ({ text, handleClick, color = 'green' }) => {
  const buttonClass =
    color === 'green' ? 'btn-agregar-proveedor' : 'btn-proveedor-white'
  return (
    <button className={buttonClass} onClick={handleClick}>
      {text}
    </button>
  )
}

export default Button
