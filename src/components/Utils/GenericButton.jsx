import React, { useState } from 'react';
import '../../styles/buttons/genericButton.css';

export const GenericButton = ({ marginBottom, marginTop, backgroundColor, color, borderRadius, width,
  centrado, fontSize, fontWeight, children, boxShadow, onClick }) => {

  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const styles = {
    backgroundColor: backgroundColor || '#7CBD1E',
    boxShadow: hovered ? (boxShadow ? boxShadow : '0px 2px 1px #75b21a') : '0px 2px 1px #5d5d5d',
    color: color || 'white',
    borderRadius: borderRadius || '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    width: width || 'auto',
    margin: centrado ? '0 auto' : '0',
    marginBottom: marginBottom || 'none',
    border: 'none',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    fontSize: fontSize || '1em',
    fontWeight: fontWeight || 'bold',
    marginTop: marginTop || '1.2em'
  };

  return (
    <button style={styles} onClick={onClick} onMouseOver={handleHover} onMouseLeave={handleMouseLeave}>
      {children}
    </button>
  );
};
