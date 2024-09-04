import React from 'react'

const SelectReComponent = ({ className, name, id, onChange, options, deshabilitado, placeholder }) => {
  return (
    <select name={name} id={id} className={className} onChange={onChange} disabled={deshabilitado}>
      <option value=''> {placeholder} </option>
      {options.map((option) =>
        <option value={option.id} id={`persona-${option.id}`} key={`persona-${option.id}`}>{option.concepto || option.nombre}</option>)}
    </select>
  )
}

export default SelectReComponent