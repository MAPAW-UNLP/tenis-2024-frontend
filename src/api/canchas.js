const CANCHA_URL = `${process.env.REACT_APP_BASE_URL}/canchas`

export async function getCanchas() {
  const resp = await fetch(CANCHA_URL)
  return await resp.json()
}
