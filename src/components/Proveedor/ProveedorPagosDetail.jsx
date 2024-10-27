export const ProveedorPagosDetail = ({ pago }) => {
  return (
    <>
      <p>{pago.nombreProveedor}</p>
      <p>{pago.monto}</p>
      <p>{pago.fecha}</p>
      <p>{pago.descripcion}</p>
    </>
  )
}
