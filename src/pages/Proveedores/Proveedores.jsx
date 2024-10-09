import NavBar from 'pages/Navbar/NavBar'
import { useEffect, useState } from 'react'
import '../../styles/proveedores.css'
import AgregarProveedor from 'components/Proveedor/AgregarProveedor'
import { UpdateProveedor } from 'components/Proveedor/UpdateProveedor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'

function Proveedores() {
  const URL_BASE = `http://localhost:8083/api/`

  const [proveedores, setProveedores] = useState([])

  const [mostrarPopup, setMostrarPopup] = useState(false)

  const [editModal, setEditModal] = useState(false)

  const [proveedor, setProveedor] = useState({})

  useEffect(() => {
    fetch(`${URL_BASE}proveedor`)
      .then((response) => response.json())
      .then((data) => {
        setProveedores(data)
      })
    // .then(() => setAlumnosLoader(() => false))
  }, [])

  const activarFormulario = () => {
    setMostrarPopup(true)
  }
  const ocultarFormulario = () => {
    setMostrarPopup(false)
    setEditModal(false)
  }

  const openEditModal = (p) => {
    setProveedor({
      id: p.id,
      nombre: p.nombre,
      telefono: p.telefono,
    })
    setEditModal(true)
  }

  return (
    <div id="proveedores-component">
      <NavBar title={'Proveedores'} />
      <div id="proveedores-component-mainContent">
        <div className="botones-proveedor-main">
          <button className="btn-agregar-proveedor" onClick={activarFormulario}>
            Agregar nuevo Proveedor
          </button>
        </div>
        <div className="table-head-proveedores">
          <span style={{ fontSize: '1.8em', width: 200, textAlign: 'center' }}>
            Nombre
          </span>
          <span style={{ fontSize: '1.8em', width: 200, textAlign: 'center' }}>
            Telefono
          </span>
          <span></span>
        </div>
        <div className="container-table-proveedores">
          {proveedores.map((p) => {
            return (
              <div key={p.id} className="proveedores-item-list">
                <p>{p.nombre}</p>
                <p>{p.telefono}</p>
                <button className="edit-proveedor-btn">
                  <FontAwesomeIcon
                    icon={faUserEdit}
                    onClick={() => openEditModal(p)}
                  />
                </button>
              </div>
            )
          })}
        </div>
        {mostrarPopup && (
          <AgregarProveedor
            handleCloseForm={ocultarFormulario}
            proveedores={proveedores}
          />
        )}
        {editModal && (
          <UpdateProveedor
            handleCloseForm={ocultarFormulario}
            proveedor={proveedor}
          />
        )}
      </div>
    </div>
  )
}

export default Proveedores
