const PROFESOR_URL = `${process.env.REACT_APP_BASE_URL}/profesores`

export async function getProfesores() {
  const resp = await fetch(PROFESOR_URL)
  const data = await resp.json()
  return data
}
