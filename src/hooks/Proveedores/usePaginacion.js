import { useState } from 'react'

export const usePaginacion = (CANT_FILAS, totalItems) => {
  const [pagina, setPagina] = useState(0)
  const totalDePaginas = Math.ceil(totalItems / CANT_FILAS)

  const atras = () => setPagina((prev) => Math.max(prev - 1, 0))
  const siguiente = () =>
    setPagina((prev) => Math.min(prev + 1, totalDePaginas - 1))

  return { pagina, totalDePaginas, atras, siguiente }
}
