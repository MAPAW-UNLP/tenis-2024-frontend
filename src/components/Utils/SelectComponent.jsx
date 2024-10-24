import React from 'react'

/**
 * @typedef {{
 *  displayValue: string
 *  value: string
 * }} SelectOptions
 *
 * @typedef {React.HTMLProps<HTMLSelectElement> & {
 *  options: SelectOptions[]
 *  placeholder: string
 * }} SelectComponentProps
 * @param {SelectComponentProps} props
 */
function SelectComponent({ options, placeholder, ...props }) {
  return (
    <select {...props} defaultValue="">
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map(({ displayValue, value }) => (
        <option value={value} key={displayValue}>
          {displayValue}
        </option>
      ))}
    </select>
  )
}

export default SelectComponent
