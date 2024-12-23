const PROVEEDORES_URL = `${process.env.REACT_APP_BASE_URL}/proveedores`

export const getProveedores = async () => {
  const resp = await fetch(PROVEEDORES_URL)
  const data = await resp.json()
  return data
}

export const getProveedor = async (id) => {
  const resp = await fetch(`${PROVEEDORES_URL}/${id}`)
  const data = await resp.json()
  return data
}

export const createProveedor = async (proveedor) => {
  const resp = await fetch(PROVEEDORES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(proveedor),
  })
  const data = await resp.json()
  return data
}

export const actualizarProveedor = async (proveedor) => {
  const resp = await fetch(`${PROVEEDORES_URL}/${proveedor.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(proveedor),
  })
  const data = await resp.json()
  return data
}

export const deleteProveedor = async (id) => {
  const resp = await fetch(`${PROVEEDORES_URL}/${id}`, {
    method: 'DELETE',
  })
  const data = await resp.json()
  return data
}
