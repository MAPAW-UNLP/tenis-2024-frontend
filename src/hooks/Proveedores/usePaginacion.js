import { useEffect, useState } from 'react'

export const usePaginacion = (CANT_FILAS, totalItems) => {
  const [pagina, setPagina] = useState(0)
  const totalDePaginas = Math.ceil(totalItems / CANT_FILAS)

  useEffect(() => {
    // Reseteamos la página a 0 si cambian los elementos filtrados
    setPagina(0)
  }, [totalItems])

  const atras = () => setPagina((prev) => Math.max(prev - 1, 0))
  const siguiente = () =>
    setPagina((prev) => Math.min(prev + 1, totalDePaginas - 1))

  return { pagina, totalDePaginas, atras, siguiente }
}
