import { useEffect, useState } from 'react'
import { ProveedorPagosDetail } from './ProveedorPagosDetail'
import '../../styles/proveedores.css'

export const ShowProveedor = ({ handleClose, idProveedor, proveedor }) => {
  const URL_BASE = `http://localhost:8083/api`

  const [proveedorPayments, setProveedorPayments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProveedorPayments = async () => {
    setLoading(true)
    await fetch(`${URL_BASE}/pagos_por_proveedor/${idProveedor}`)
      .then((response) => response.json())
      .then((data) => {
        const sortedPayments = data.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        )
        const lastTwoPayments = sortedPayments.slice(0, 2)
        setProveedorPayments(lastTwoPayments)
      })
  }

  useEffect(() => {
    fetchProveedorPayments()
  })
  return (
    <div id="proveedor-add-component" className="show-proveedor">
      <button
        id="close-proveedor-add-form"
        className="close-btn"
        onClick={handleClose}
      >
        x
      </button>
      <div className="show-proveedor">
        <div className="provider-details-container">
          <div className="provider-info">
            <h2>Nombre:</h2>
            <p>{proveedor.nombre}</p>
            <h2>Telefono:</h2>
            <p>{proveedor.telefono}</p>
          </div>
          <div className="provider-payments">
            <h2>Pagos asociados</h2>
            {loading ? (
              <div className="container-table-proveedores">
                <div
                  className="spinner"
                  style={{ position: 'relative', marginTop: '10%' }}
                ></div>
              </div>
            ) : proveedorPayments.length > 0 ? (
              proveedorPayments.map((pago) => (
                <ProveedorPagosDetail key={pago.id} pago={pago} />
              ))
            ) : (
              <div>No hay pagos asociados a este proveedor</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
