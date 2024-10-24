import { useState } from 'react'
import '../../styles/buttons/genericButton.css'

export const GenericButtonDisabled = ({
  marginBottom,
  marginTop,
  backgroundColor,
  color,
  borderRadius,
  width,
  centrado,
  fontSize,
  fontWeight,
  children,
  boxShadow,
  onClick,
  disabled,
}) => {
  const [hovered, setHovered] = useState(false)

  const handleHover = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  const styles = {
    backgroundColor: backgroundColor || '#7CBD1E',
    boxShadow: hovered
      ? boxShadow
        ? boxShadow
        : '0px 2px 1px #75b21a'
      : '0px 2px 1px #5d5d5d',
    color: color || 'white',
    borderRadius: borderRadius || '5px',
    padding: '10px 15px',
    cursor: disabled ? 'not-allowed' : 'pointer', // Cambia el cursor si está deshabilitado
    width: width || 'auto',
    margin: centrado ? '0 auto' : '0',
    marginBottom: marginBottom || 'none',
    border: 'none',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    fontSize: fontSize || '1em',
    fontWeight: fontWeight || 'bold',
    marginTop: marginTop || '1.2em',
    opacity: disabled ? 0.5 : 1, // Reducir opacidad si está deshabilitado
    pointerEvents: disabled ? 'none' : 'auto', // Deshabilitar interacciones si está deshabilitado
  }

  return (
    <button
      style={styles}
      onClick={!disabled ? onClick : undefined} // No ejecutar onClick si está deshabilitado
      onMouseOver={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  )
}
