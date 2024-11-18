const CLIENTE_URL = `${process.env.REACT_APP_BASE_URL}/cliente`

export function getHistorialPagos(id) {
  const dataDefault = {
    1: [
      {
        id: 1,
        fecha: '2024-11-03',
        concepto: 'Concepto 1',
        importe: 100,
      },
    ],
    2: [
      {
        id: 2,
        fecha: '2024-11-03',
        concepto: 'Concepto 2',
        importe: 200,
      },
    ],
    3: [
      {
        id: 3,
        fecha: '2024-11-03',
        concepto: 'Concepto 3',
        importe: 300,
      },
    ],
    4: [
      {
        id: 4,
        fecha: '2024-11-03',
        concepto: 'Concepto 4',
        importe: 400,
      },
    ],
    5: [
      {
        id: 5,
        fecha: '2024-11-03',
        concepto: 'Concepto 5',
        importe: 500,
      },
    ],
    6: [
      {
        id: 6,
        fecha: '2024-11-03',
        concepto: 'Concepto 6',
        importe: 600,
      },
    ],
  }

  return fetch(`${CLIENTE_URL}/historialpagos?clienteId=${id}`, {
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
        return dataDefault
      }
    })
    .catch(() => {
      return dataDefault
    })
}
