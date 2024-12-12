const GRUPOS_URL = `${process.env.REACT_APP_BASE_URL}/grupos`

export const getGrupos = async () => {
  const resp = await fetch(GRUPOS_URL)
  const data = await resp.json()
  return data
}
