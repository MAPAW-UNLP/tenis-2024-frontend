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
        alumnosData,
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
