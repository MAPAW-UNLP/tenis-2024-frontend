import { getCanchas } from 'api/canchas'
import { getClientes } from 'api/cliente'
import { getProfesores } from 'api/profesores'
import { createContext, useCallback, useEffect, useState } from 'react'

const initialFormValues = {
  fechaValue: { value: null, errors: [] },
  horaInicioValue: { value: '', errors: [] },
  horaFinValue: { value: '', errors: [] },
  canchaValue: { value: -1, errors: [] },
  tipoReservaValue: { value: '', errors: [] },

  // Alquiler:
  nombreClienteValue: { value: '', errors: [] },
  telefonoClienteValue: { value: '', errors: [] },

  // Clase:
  profesorValue: { value: '', errors: [] },
  tipoClaseValue: { value: '', errors: [] },
  alumnosValue: { value: [], errors: [] },
  seRepiteValue: { value: false, errors: [] },
}

export const CrearReservaContext = createContext(null)

export function CrearReservaProvider({ children }) {
  const [canchas, setCanchas] = useState({ isLoading: true, data: [] })
  const [profesores, setProfesores] = useState({ isLoading: true, data: [] })
  const [alumnos, setAlumnos] = useState({ isLoading: true, data: [] })

  const [form, setForm] = useState(initialFormValues)

  useEffect(() => {
    getClientes().then((data) => setAlumnos({ isLoading: false, data }))
    getProfesores().then((data) => setProfesores({ isLoading: false, data }))
    getCanchas().then((data) =>
      setCanchas({ isLoading: false, data: data.detail })
    )
  }, [])

  const updateField = useCallback((name, value) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value: value,
        errors: [],
      },
    }))
  }, [])

  const restore = useCallback(() => setForm(initialFormValues), [])

  return (
    <CrearReservaContext.Provider
      value={{
        alumnos,
        profesores,
        canchas,
        ...form,
        updateField,
        restore,
      }}
    >
      {children}
    </CrearReservaContext.Provider>
  )
}
