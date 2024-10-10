const ALUMNOS_URL = `${process.env.REACT_APP_BASE_URL}/alumnos`

export async function getAlumnos() {
  const resp = await fetch(ALUMNOS_URL)
  const data = await resp.json()
  console.log(data) // Verifica qué datos están siendo retornados

  return data
}
