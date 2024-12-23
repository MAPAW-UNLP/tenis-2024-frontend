import ProveedorItem from './ProveedorItem'

const ProveedorList = ({ proveedores, onEdit, onDelete, onPay, onShow }) => (
  <div className="container-table-proveedores">
    {proveedores.map((p) => (
      <ProveedorItem
        key={p.id}
        proveedor={p}
        onEdit={onEdit}
        onDelete={onDelete}
        onPay={onPay}
        onShow={onShow}
      />
    ))}
  </div>
)

export default ProveedorList
