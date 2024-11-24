import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserEdit,
  faTrash,
  faMoneyBillAlt,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons'
import '../../styles/proveedores/items-table.css'
import '../../styles/proveedores/buttons-table.css'

const ProveedorItem = ({ proveedor, onEdit, onDelete, onPay, onShow }) => (
  <div className="proveedores-item-list">
    <p>{proveedor.nombre}</p>
    <p>{proveedor.telefono}</p>
    <button
      className="proveedor-btn edit-proveedor-btn"
      title="Modificar proveedor"
      onClick={() => onEdit(proveedor)}
    >
      <FontAwesomeIcon icon={faUserEdit} />
    </button>
    <button
      className="proveedor-btn delete-proveedor-btn"
      title="Eliminar proveedor"
      onClick={() => onDelete(proveedor.id)}
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
    <button
      className="proveedor-btn pay-proveedor-btn"
      title="Realizar pago a proveedor"
      onClick={() => onPay(proveedor)}
    >
      <FontAwesomeIcon icon={faMoneyBillAlt} />
    </button>
    <button
      className="proveedor-btn detail-proveedor-btn"
      title="Ver detalle de proveedor"
      onClick={() => onShow(proveedor.id, proveedor.nombre, proveedor.telefono)}
    >
      <FontAwesomeIcon icon={faAddressBook} />
    </button>
  </div>
)

export default ProveedorItem
