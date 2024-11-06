export const ProveedorPagosDetail = ({ pago }) => {
  return (
    <div className="pago-detail">
      <p>
        <strong>Proveedor:</strong> {pago.nombreProveedor}
      </p>
      <p>
        <strong>Monto:</strong> ${pago.monto}
      </p>
      <p>
        <strong>Fecha:</strong> {pago.fecha}
      </p>
      <p>
        <strong>Descripción:</strong> {pago.descripcion}
      </p>
    </div>
  )
}
