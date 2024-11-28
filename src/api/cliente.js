const CLIENTE_URL = `${process.env.REACT_APP_BASE_URL}/cliente`
const API_URL = `${process.env.REACT_APP_BASE_URL}`

export function getHistorialPagos(id, params = {}) {
  const dataDefault = {
    rta: 'ok',
    detail: {
      pagos: [
        {
          id: 1,
          fecha: '2024-11-18',
          concepto: 'clase x',
          importe: 100,
        },
        {
          id: 2,
          fecha: '2024-11-01',
          concepto: 'clase y',
          importe: 400,
        },
        {
          id: 3,
          fecha: '2024-10-19',
          concepto: 'clase b',
          importe: 1000,
        },
        {
          id: 4,
          fecha: '2024-10-20',
          concepto: 'clase c',
          importe: 2000,
        },
        {
          id: 5,
          fecha: '2024-10-21',
          concepto: 'clase d',
          importe: 3000,
        },
        {
          id: 6,
          fecha: '2024-10-22',
          concepto: 'pago x',
          importe: 500,
        },
        {
          id: 7,
          fecha: '2024-10-23',
          concepto: 'pago x',
          importe: 600,
        },
        {
          id: 8,
          fecha: '2024-10-24',
          concepto: 'pago x',
          importe: 700,
        },
        {
          id: 9,
          fecha: '2024-10-25',
          concepto: 'pago x',
          importe: 800,
        },
        {
          id: 10,
          fecha: '2024-10-18',
          concepto: 'pago x',
          importe: 900,
        },
      ],
      page: '1',
      total: 16,
      totalPages: 2,
      nextPage: 2,
      previousPage: null,
    },
  }

  const baseUrl = `${API_URL}/cobrosCliente`

  const queryParams = {
    cliente_id: id,
    fecha_inicio: params.fecha_inicio || null,
    fecha_fin: params.fecha_fin || null,
    concepto: params.concepto || null,
    monto: params.monto || null,
    page: params.page || 1,
  }

  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value != null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&')

  return fetch(`${baseUrl}/?${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.rta === 'ok') {
        return data.detail
      } else {
        return dataDefault.detail
      }
    })
    .catch(() => {
      return dataDefault.detail
    })
}
