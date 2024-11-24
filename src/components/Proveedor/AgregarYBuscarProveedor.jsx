import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import InputComponent from 'components/Utils/InputComponent'
import '../../styles/proveedores/add-and-search.css'

const AgregarYBuscarProveedor = ({ onAgregar, onBuscar }) => {
  return (
    <div className="add-and-search-container">
      <button className="add-proveedor-btn" onClick={onAgregar}>
        Agregar nuevo Proveedor
      </button>
      <div className="searchbar">
        <FontAwesomeIcon className="searchbar-icon" icon={faMagnifyingGlass} />
        <InputComponent
          type={'text'}
          placeholder={'Buscar por nombre'}
          onChangeFuncion={onBuscar}
        />
      </div>
    </div>
  )
}

export default AgregarYBuscarProveedor
