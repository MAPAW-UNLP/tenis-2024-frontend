import { useState } from 'react'

const useInputValidation = (
  initialValue,
  type,
  setForm,
  fieldName,
  proveedores = [],
  partial = false
) => {
  const [value, setValue] = useState(initialValue)
  const [feedback, setFeedback] = useState({ text: '', color: '' })
  const [isValid, setIsValid] = useState(false)

  const validate = (inputValue) => {
    const { valid, message } = wrapper(inputValue)
    setFeedback({ text: message, color: valid ? '#7CBD1E' : '#CC3636' })
    setIsValid(valid)
    setForm((prev) => ({ ...prev, [fieldName]: inputValue }))
  }

  const handleChange = (e) => {
    const inputValue = e.target.value
    setValue(inputValue)
    validate(inputValue)
  }

  const validateName = (nombre, proveedores) => {
    const pattern = /^[A-Za-z\s]+$/ // Solo letras y espacios
    if (nombre === '') {
      return { valid: false, message: 'El nombre no puede ser vacío.' }
    } else if (!pattern.test(nombre)) {
      return { valid: false, message: 'El nombre solo debe contener letras.' }
    } else if (proveedores.find((proveedor) => proveedor.nombre === nombre)) {
      return { valid: false, message: 'El nombre de proveedor ya existe.' }
    } else if (nombre.length > 30) {
      return {
        valid: false,
        message: 'El nombre debe tener menos de 30 caracteres.',
      }
    }
    return { valid: true, message: 'El nombre de proveedor es correcto.' }
  }

  const validateTelefono = (telefono) => {
    const pattern = /^\d+$/ // Solo números
    if (telefono === '') {
      return { valid: false, message: 'El teléfono no puede ser vacío.' }
    } else if (!pattern.test(telefono)) {
      return {
        valid: false,
        message: 'El teléfono solo debe contener números.',
      }
    } else if (telefono.length > 15) {
      return {
        valid: false,
        message: 'El teléfono debe tener menos de 15 caracteres.',
      }
    }
    return { valid: true, message: 'Teléfono válido.' }
  }

  const validateProveedor = (nombre) => {
    if (nombre === '') {
      return {
        valid: false,
        message: 'Debe seleccionar algun proveedor de la lista.',
      }
    }
    return { valid: true, message: 'Proveedor seleccionado correctamente.' }
  }

  const validateMonto = (monto) => {
    if (monto === '') {
      return { valid: false, message: 'El monto no puede ser vacio.' }
    } else if (Number(monto) <= 0) {
      return { valid: false, message: 'El monto ingresado debe ser mayor a 0.' }
    }
    return { valid: true, message: 'Monto valido.' }
  }

  const validatePartialName = (nombre) => {
    const pattern = /^[A-Za-z\s]+$/ // Solo letras y espacios
    if (nombre === '') {
      return { valid: true, message: 'Se registrara el nombre anterior.' }
    }
    if (!pattern.test(nombre)) {
      return { valid: false, message: 'El nombre solo debe contener letras.' }
    } else if (nombre.length > 30) {
      return {
        valid: false,
        message: 'El nombre debe tener menos de 30 caracteres.',
      }
    }
    return { valid: true, message: 'El nombre de proveedor es correcto.' }
  }

  const validatePartialTelefono = (telefono) => {
    const pattern = /^\d+$/ // Solo números
    if (telefono === '') {
      return { valid: true, message: 'Se registrara el telefono anterior.' }
    }
    if (!pattern.test(telefono)) {
      return {
        valid: false,
        message: 'El teléfono solo debe contener números.',
      }
    } else if (telefono.length > 15) {
      return {
        valid: false,
        message: 'El teléfono debe tener menos de 15 caracteres.',
      }
    }
    return { valid: true, message: 'Teléfono válido.' }
  }

  const wrapper = (inputValue) => {
    if (!partial) {
      return type === 'nombre'
        ? validateName(inputValue, proveedores)
        : type === 'proveedor'
          ? validateProveedor(inputValue)
          : type === 'monto'
            ? validateMonto(inputValue)
            : validateTelefono(inputValue)
    }

    return type === 'nombre'
      ? validatePartialName(inputValue)
      : validatePartialTelefono(inputValue)
  }

  return {
    value,
    feedback,
    isValid,
    handleChange,
  }
}

export default useInputValidation
