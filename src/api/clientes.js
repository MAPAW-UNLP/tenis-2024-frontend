const CLIENTES_URL = `${process.env.REACT_APP_BASE_URL}/clientes`

export async function getClientes() {
  const resp = await fetch(CLIENTES_URL)
  const data = await resp.json()
  console.log(data) // Verifica qué datos están siendo retornados
  return data
}
