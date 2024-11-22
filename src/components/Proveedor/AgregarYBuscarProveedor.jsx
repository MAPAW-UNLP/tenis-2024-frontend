import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import InputComponent from 'components/Utils/InputComponent'

const AgregarYBuscarProveedor = ({ onAgregar, onBuscar }) => {
  return (
    <div className="boton-add-and-search">
      <button className="btn-agregar-proveedor" onClick={onAgregar}>
        Agregar nuevo Proveedor
      </button>
      <div className="nombre-searchbar">
        <FontAwesomeIcon
          className="nombre-magnify-icon"
          icon={faMagnifyingGlass}
        />
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
