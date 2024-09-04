import React from 'react'

const InputValueComponent = ({type, name, id, className, placeholder, defaultValue, onChangeFuncion, deshabilitado, min, max, value}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className={className}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChangeFuncion}
      disabled={deshabilitado}
      minLength={min}
      maxLength={max}
      min={min}
      value={value}
    />
  );
}

export default InputValueComponent