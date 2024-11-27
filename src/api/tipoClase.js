const TIPO_URL = `${process.env.REACT_APP_BASE_URL}`

export const tipoClaseService = {
  async getTipoClases() {
    try {
      const response = await fetch(`${TIPO_URL}/clases`)
      if (!response.ok) {
        throw new Error()
      }
      return await response.json()
    } catch (error) {
      console.error('Error al obtener tipos de clase', error)
      throw error
    }
  },

  async crearModificarTipoClase(data, url, method) {
    try {
      const response = await fetch(`${TIPO_URL}/${url}`, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error()
      }
      return await response.json()
    } catch (error) {
      console.error('Error al realizar operacion', error)
      throw error
    }
  },

  async borrarTipoClase(id) {
    try {
      const response = await fetch(`${TIPO_URL}/bajaClase`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id }),
      })
      if (!response.ok) {
        throw new Error()
      }
      return await response.json()
    } catch (error) {
      console.error('Error al eliminar tipo de clase', error)
      throw error
    }
  },
}
