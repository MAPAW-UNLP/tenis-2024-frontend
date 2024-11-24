const InputReComponent = ({
  type,
  name,
  id,
  className,
  placeholder,
  defaultValue,
  onChangeFuncion,
  deshabilitado,
  min,
  max,
  readOnly,
  value,
}) => {
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
      readOnly={readOnly}
      value={value}
    />
  )
}

export default InputReComponent
