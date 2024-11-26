const PROVEEDORES_URL = `${process.env.REACT_APP_BASE_URL}/proveedores`

export const getProveedores = async () => {
  const resp = await fetch(PROVEEDORES_URL)
  const data = await resp.json()
  return data
}
