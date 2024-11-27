const ITEM_URL = `${process.env.REACT_APP_BASE_URL}`

export const itemAlquilerService = {
  async getItemAlquiler() {
    try {
      const response = await fetch(`${ITEM_URL}/itemalquiler`)
      if (!response.ok) {
        throw new Error()
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error al ir a buscar el item de alquiler', error)
      throw error
    }
  },

  async crearModificarItemAlquiler(data, url, method) {
    try {
      const response = await fetch(`${ITEM_URL}/${url}`, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error()
      }
      return await response.json()
    } catch (error) {
      console.error('Eroror al intentar realizar la operacíon', error)
      throw error
    }
  },

  async borrarItemAlquiler(id) {
    try {
      const response = await fetch(`${ITEM_URL}/bajaItemAlquiler`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id }),
      })
      if (!response.ok) {
        throw new Error()
      }
      return await response.json()
    } catch (error) {
      console.error('Error al eliminar item alquiler.', error)
      throw error
    }
  },
}
