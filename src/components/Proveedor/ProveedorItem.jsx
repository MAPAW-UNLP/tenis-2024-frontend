import {
  faUserEdit,
  faTrash,
  faMoneyBillAlt,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons'
import '../../styles/proveedores/items-table.css'
import '../../styles/proveedores/buttons-table.css'
import Button from 'components/Button/Button'

const ProveedorItem = ({ proveedor, onEdit, onDelete, onPay, onShow }) => (
  <div className="proveedores-item-list">
    <p>{proveedor.nombre}</p>
    <p>{proveedor.telefono}</p>
    <Button
      color="warning"
      faIconStart={faUserEdit}
      onClick={() => onEdit(proveedor)}
      size="lg"
      title="Modificar proveedor"
    />
    <Button
      color="danger"
      faIconStart={faTrash}
      onClick={() => onDelete(proveedor.id)}
      size="lg"
      title="Eliminar proveedor"
    />
    <Button
      faIconStart={faMoneyBillAlt}
      onClick={() => onPay(proveedor)}
      size="lg"
      title="Realizar pago a proveedor"
    />
    <Button
      color="info"
      faIconStart={faAddressBook}
      onClick={() => onShow(proveedor.id, proveedor.nombre, proveedor.telefono)}
      size="lg"
      title="Ver detalle de proveedor"
    />
  </div>
)

export default ProveedorItem
