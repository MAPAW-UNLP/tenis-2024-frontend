import { getProveedores } from 'api/proveedores'
import { useState, useEffect } from 'react'

export const useProveedores = (URL_BASE) => {
  const [proveedores, setProveedores] = useState([])
  const [loading, setLoading] = useState(false)
  const [updateList, setUpdateList] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchProveedores = async () => {
      const data = await getProveedores()
      setProveedores(data)
      setLoading(false)
    }
    fetchProveedores()
  }, [updateList])

  const update = () => {
    setUpdateList((prev) => !prev)
  }

  return { proveedores, loading, update }
}
