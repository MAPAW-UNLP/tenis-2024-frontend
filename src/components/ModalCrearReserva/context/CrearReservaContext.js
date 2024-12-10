import { getCanchas } from 'api/canchas'
import { getClientes } from 'api/cliente'
import { getProfesores } from 'api/profesores'
import { createContext, useCallback, useEffect, useState } from 'react'

const initialFormValues = {
  fecha: { value: null, errors: [] },
  horaInicio: { value: '', errors: [] },
  horaFin: { value: '', errors: [] },
  cancha: { value: -1, errors: [] },
  tipoReserva: { value: '', errors: [] },

  // Alquiler:
  nombreCliente: { value: '', errors: [] },
  telefonoCliente: { value: '', errors: [] },

  // Clase:
  profesor: { value: '', errors: [] },
  tipoClase: { value: '', errors: [] },
  alumnos: { value: [], errors: [] },
  seRepite: { value: false, errors: [] },
}

export const CrearReservaContext = createContext(null)

export function CrearReservaProvider({ children }) {
  const [canchas, setCanchas] = useState({ isLoading: true, data: [] })
  const [profesores, setProfesores] = useState({ isLoading: true, data: [] })
  const [alumnosData, setAlumnosData] = useState({ isLoading: true, data: [] })

  const [form, setForm] = useState(initialFormValues)

  useEffect(() => {
    getClientes().then((data) => setAlumnosData({ isLoading: false, data }))
    getProfesores().then((data) => setProfesores({ isLoading: false, data }))
    getCanchas().then((data) =>
      setCanchas({ isLoading: false, data: data.detail })
    )
  }, [])

  function updateField(name, value) {
    setForm((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value: value,
        errors: [],
      },
    }))
  }

  function restore() {
    setForm(initialFormValues)
  }

  function clearErrors() {
    setForm((prevState) =>
      Object.keys(prevState).reduce((newState, key) => {
        newState[key] = {
          ...prevState[key],
          errors: initialFormValues[key].errors,
        }
        return newState
      }, {})
    )
  }

  function addError(name, error) {
    setForm((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        errors: [...prevState[name].errors, error],
      },
    }))
  }

  function validateForm() {
    const MSG = 'Este campo es obligatorio'
    let isValid = true

    clearErrors()

    if (form.fecha.value === null) {
      console.log('fecha isEmpty')

      addError('fecha', MSG)
      isValid = false
    }

    if (isEmpty(form.horaInicio.value)) {
      console.log('horaInicio isEmpty')

      addError('horaInicio', MSG)
      isValid = false
    }

    if (isEmpty(form.horaFin.value)) {
      console.log('horaFin isEmpty')

      addError('horaFin', MSG)
      isValid = false
    }

    if (form.cancha.value === -1) {
      console.log('cancha isEmpty')

      addError('cancha', MSG)
      isValid = false
    } else if (canchas.data.every(({ id }) => id !== form.cancha.value)) {
      console.log('cancha isInvalid')

      addError('cancha', 'Cancha inválida')
      isValid = false
    }

    if (isEmpty(form.tipoReserva.value)) {
      console.log('tipoReserva isEmpty')

      addError('tipoReserva', MSG)
      isValid = false
    } else {
      if (form.tipoReserva.value === 'alquiler') {
        if (isEmpty(form.nombreCliente.value)) {
          console.log('nombreCliente isEmpty')

          addError('nombreCliente', MSG)
          isValid = false
        }
        if (isEmpty(form.telefonoCliente.value)) {
          console.log('telefonoCliente isEmpty')

          addError('telefonoCliente', MSG)
          isValid = false
        }
      } else if (form.tipoReserva.value === 'clase') {
      }
    }

    // Como los campos a validar varían según el tipo de clase esto es lo más
    // fácil (aunque bastante feo, no voy a mentir)
    return isValid
  }

  function handleSubmit() {
    if (!validateForm()) {
      console.log('hay errores')
    } else {
      console.log('todo bien')
    }
  }

  return (
    <CrearReservaContext.Provider
      value={{
        alumnosData,
        profesores,
        canchas,
        ...form,
        updateField,
        restore,
        handleSubmit,
      }}
    >
      {children}
    </CrearReservaContext.Provider>
  )
}

function isEmpty(value) {
  return !value || value.trim().length === 0
}
