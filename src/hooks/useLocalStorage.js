import { useEffect, useState } from 'react'

/**
 * Hook que permite mantener un estado sincronizado con un valor en el localStorage.
 * @param key - Clave bajo la cual se almacena el valor en el localStorage.
 * @param initialState - Valor inicial del estado. Se utiliza solo si no existe el elemento en el localStorage.
 * @returns los valores que devuelve `useState`. Una tupla con el estado y su setter.
 */
export function useLocalStorage(key, initialState) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (initialState instanceof Function) return initialState()
    return initialState
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
