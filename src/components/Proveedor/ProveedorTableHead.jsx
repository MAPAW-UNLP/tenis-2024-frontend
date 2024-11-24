import '../../styles/proveedores/table.css'

const ProveedorTableHeader = ({ onSort, sortOrder }) => (
  <div className="table-head-proveedores">
    <span
      style={{
        fontSize: '1.8em',
        width: 200,
        textAlign: 'center',
        cursor: 'pointer',
      }}
      onClick={() => onSort('nombre')}
    >
      Nombre {sortOrder.direction === 'asc' ? '▲' : '▼'}
    </span>
    <span style={{ fontSize: '1.8em', width: 200, textAlign: 'center' }}>
      Teléfono
    </span>
    <span></span>
    <span></span>
    <span style={{ fontSize: '1.8em', width: 200, textAlign: 'center' }}>
      Acciones
    </span>
    <span></span>
    <span></span>
  </div>
)
export default ProveedorTableHeader
