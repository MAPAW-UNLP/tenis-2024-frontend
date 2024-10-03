const RESERVAS_URL = `${process.env.REACT_APP_BASE_URL}/reservas`

export async function getReservas() {
  const resp = await fetch(RESERVAS_URL)
  const data = await resp.json()
  return data
}
