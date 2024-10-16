const PROFESOR_URL = `${process.env.REACT_APP_BASE_URL}/profesoress`
const BASE_CLASES_PROFESOR_URL = `${process.env.REACT_APP_BASE_URL}/clases-profesor?profesor_id=`



export async function getClasesProfesor(profesorSeleccionado, formattedDate) {
  const url = `${BASE_CLASES_PROFESOR_URL}${profesorSeleccionado}&fecha=${formattedDate}`;
  const resp = await fetch(url);
  const data = await resp.json()
  return data
}


export async function getProfesores() {
  console.log(PROFESOR_URL)
  const resp = await fetch(PROFESOR_URL)
  const data = await resp.json()
  return data
}


