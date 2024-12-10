const PROFESOR_URL = `${process.env.REACT_APP_BASE_URL}/profesoress`
const BASE_CLASES_PROFESOR_URL = `${process.env.REACT_APP_BASE_URL}/clases-profesor?profesor_id=`

export async function getClasesProfesor(profesorSeleccionado, formattedDate) {
  const url = `${BASE_CLASES_PROFESOR_URL}${profesorSeleccionado}&fecha=${formattedDate}`
  const resp = await fetch(url)
  return await resp.json()
}

export async function getProfesores() {
  const resp = await fetch(PROFESOR_URL)
  return await resp.json()
}

export async function getProfesorById(id) {
  const resp = await fetch(
    `${process.env.REACT_APP_BASE_URL}/profesorr?profesorId=${id}`
  )
  return await resp.json()
}

export const getCobrosProfesor = async (profesorId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/pagos_por_profesor/${profesorId}`
    )
    if (!response.ok) {
      throw new Error('Error al obtener los cobros del profesor')
    }
    return await response.json()
  } catch (error) {
    throw error
  }
}
