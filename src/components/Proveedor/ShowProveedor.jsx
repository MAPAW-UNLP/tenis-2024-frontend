import { useEffect, useState } from 'react'
import { ProveedorPagosDetail } from './ProveedorPagosDetail'

export const ShowProveedor = ({ handleClose, idProveedor }) => {
  const URL_BASE = `http://localhost:8083/api`

  const [proveedor, setProveedor] = useState({})
  const [proveedorPayments, setProveedorPayments] = useState([])

  const fetchProveedor = async () => {
    await fetch(`${URL_BASE}/proveedor/${idProveedor}`)
      .then((response) => response.json())
      .then((data) => {
        setProveedor(data)
      })
  }

  const fetchProveedorPayments = async () => {
    await fetch(`${URL_BASE}/pagos_por_proveedor/${idProveedor}`)
      .then((response) => response.json())
      .then((data) => {
        setProveedorPayments(data)
      })
  }

  useEffect(() => {
    fetchProveedor()
    fetchProveedorPayments()
  })
  return (
    <div id="proveedor-add-component">
      <button id="close-proveedor-add-form" onClick={handleClose}>
        x
      </button>
      <div>
        <h2>Nombre:</h2>
        <p>{proveedor.nombre}</p>
        <h2>Telefono:</h2>
        <p>{proveedor.telefono}</p>
        {proveedorPayments.length > 0 ? (
          proveedorPayments.map((pago) => <ProveedorPagosDetail pago={pago} />)
        ) : (
          <div>No hay pago asociados a este proveedor</div>
        )}
      </div>
    </div>
  )
}
