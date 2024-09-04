import React from 'react'

const InputComponent = ({type, id, className, placeholder, onChangeFuncion, deshabilitado, min, max}) => {
  return (
    <input
      type={type}
      name=""
      id={id}
      className={className}
      placeholder={placeholder}
      onChange={onChangeFuncion}
      disabled={deshabilitado}
      minLength={min}
      maxLength={max}
      min={min}
    />
  );
}

export default InputComponent