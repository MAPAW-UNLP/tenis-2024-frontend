import LoaderSpinner from 'components/LoaderSpinner'
import NavBar from 'pages/Navbar/NavBar'
import { useEffect, useState } from 'react'
import '../../../styles/proveedores.css'

const AlumnosDeudores = () => {
  const URL_BASE = `http://localhost:8083/api/`

  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(false)
  const [updateList, setUpdateList] = useState(false)

  useEffect(() => {
    const fetchClientesConCobros = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${URL_BASE}clientes`)
        const clientesData = await response.json()

        const clientesConCobros = await Promise.all(
          clientesData.map(async (cliente) => {
            const cobrosResponse = await fetch(
              `${URL_BASE}cobros_por_cliente?clienteId=${cliente.id}`
            )
            const cobrosData = await cobrosResponse.json()
            return { ...cliente, cobros: cobrosData }
          })
        )

        setClientes(clientesConCobros)
      } catch (error) {
        console.error('Error al obtener clientes y cobros:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClientesConCobros()
  }, [updateList])

  const update = () => {
    setUpdateList(!updateList)
  }

  return (
    <div id="proveedores-component">
      <NavBar title={'Alumnos deudores'} />
      <div id="proveedores-component-mainContent">
        <div className="table-head-proveedores">
          <span style={{ fontSize: '1.8em', width: 200, textAlign: 'center' }}>
            Nombre
          </span>
          <span style={{ fontSize: '1.8em', width: 200, textAlign: 'center' }}>
            Teléfono
          </span>
          <span style={{ fontSize: '1.8em', width: 200, textAlign: 'center' }}>
            Clases a favor
          </span>
          <span style={{ fontSize: '1.8em', width: 200, textAlign: 'center' }}>
            Deuda total
          </span>
        </div>
        {loading ? (
          <LoaderSpinner
            active={loading}
            containerClass={'canchasLoader'}
            loaderClass={'canchasLoaderSpinner'}
          />
        ) : (
          <>
            <div className="container-table-proveedores">
              {clientes.map((c) => {
                return (
                  <div key={c.id} className="proveedores-item-list">
                    <p>{c.nombre}</p>
                    <p>{c.telefono}</p>
                    <p>{c.cobros.length}</p>
                    <p>
                      {' '}
                      $ {c.cobros.reduce((acc, cobro) => acc + cobro.monto, 0)}
                    </p>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AlumnosDeudores
