import { useState, useEffect } from 'react'

export const useProveedores = (URL_BASE) => {
  const [proveedores, setProveedores] = useState([])
  const [loading, setLoading] = useState(false)
  const [updateList, setUpdateList] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${URL_BASE}proveedor`)
      .then((response) => response.json())
      .then((data) => {
        setProveedores(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [updateList])

  const update = () => {
    setUpdateList((prev) => !prev)
  }

  return { proveedores, loading, update }
}
