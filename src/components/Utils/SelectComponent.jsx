import React from 'react'

const SelectComponent = ({className, id, onChange, options, deshabilitado, placeholder}) => {
  return (
    <select name="" id={id} className={className} onChange={onChange} disabled={deshabilitado}>
        <option value=''> {placeholder} </option>
        {options.map((option, index) => <option value={option.id} id={`${option}-${index}`} key={`${option}-${index}`}>{option.concepto}</option>)}
    </select>
  )
}

export default SelectComponent