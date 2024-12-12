const COBROS_URL = `${process.env.REACT_APP_BASE_URL}/cobros`

export const getCobros = async () => {
  const resp = await fetch(COBROS_URL)
  const data = await resp.json()
  return data
}

export const getCobrosPorCliente = async (idCliente) => {
  const resp = await fetch(`${COBROS_URL}_por_cliente?clienteId=${idCliente}`)
  const data = await resp.json()
  return data
}
