import NavBar from 'pages/Navbar/NavBar'
import { useEffect, useState } from 'react'
import '../../styles/proveedores.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AgregarProveedor from 'components/Proveedor/AgregarProveedor'
import { UpdateProveedor } from 'components/Proveedor/UpdateProveedor'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/Proveedor/Button'
import EliminarProveedor from 'components/Proveedor/EliminarProveedor'

function Proveedores() {
  const URL_BASE = `http://localhost:8083/api/`

  const CANT_FILAS = 5

  const [proveedores, setProveedores] = useState([])
  const [mostrarPopup, setMostrarPopup] = useState(false)
  const [modalEliminar, setmodalEliminar] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [proveedor, setProveedor] = useState({})
  const [idProveedor, setIdProveedor] = useState(null)
  const [loading, setLoading] = useState(false)
  const [updateList, setUpdateList] = useState(false)
  const [pagina, setPagina] = useState(0)

  const totalDePaginas = proveedores.length / CANT_FILAS

  useEffect(() => {
    setLoading(true)
    fetch(`${URL_BASE}proveedor`)
      .then((response) => response.json())
      .then((data) => {
        setProveedores(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
    // .then(() => setAlumnosLoader(() => false))
  }, [updateList])

  const activarFormulario = () => {
    setMostrarPopup(true)
  }
  const ocultarFormulario = (bool = false) => {
    setMostrarPopup(false)
    setEditModal(false)
    if (bool === true) {
      update()
    }
  }

  const handleTrash = (id) => {
    setmodalEliminar(true)
    setIdProveedor(id)
  }

  const handleClose = (bool = false) => {
    setmodalEliminar(false)
    if (bool === true) {
      update()
    }
  }

  let listado

  const filtrarArray = (paginaActual) => {
    listado = proveedores.slice(
      paginaActual * CANT_FILAS,
      (paginaActual + 1) * CANT_FILAS
    )
  }
  filtrarArray(pagina)

  const update = () => {
    setUpdateList(!updateList)
  }

  const atras = () => {
    setPagina((prev) => prev - 1)
  }

  const siguiente = () => {
    setPagina((prev) => prev + 1)
  }

  const enableBtnBack = () => {
    if (pagina === 0) {
      return (
        <button className="btnSelectPage" disabled onClick={atras}>
          Atrás
        </button>
      )
    }
    return (
      <button className="btnSelectPage" onClick={atras}>
        Atrás
      </button>
    )
  }

  const enableBtnNext = () => {
    if (pagina < Math.floor(totalDePaginas)) {
      return (
        <button className="btnSelectPage" onClick={siguiente}>
          Siguiente
        </button>
      )
    }
    return (
      <button className="btnSelectPage" disabled onClick={siguiente}>
        Siguiente
      </button>
    )
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
          {/* <div
                    
                    id="proveedores-searchbar"
                    className="list-options-header"
                    style={{ width: 'unset' }}
                >
                    <FontAwesomeIcon id="magnify-icon" icon={faMagnifyingGlass} />
                    <input
                        type="text"
                        placeholder="Busca un alumno"
                        onChange={() => {}}
                    />
                </div> */}
        </div>
        <div className="table-head-proveedores">
          <span style={{ fontSize: '1.8em', width: 200, textAlign: 'center' }}>
            Nombre
          </span>
          <span style={{ fontSize: '1.8em', width: 200, textAlign: 'center' }}>
            Teléfono
          </span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {loading ? (
          <div className="container-table-proveedores">
            <div
              className="spinner"
              style={{ position: 'relative', marginTop: '10%' }}
            ></div>
          </div>
        ) : (
          <>
            <div className="container-table-proveedores">
              {listado.map((p) => {
                return (
                  <div key={p.id} className="proveedores-item-list">
                    <p>{p.nombre}</p>
                    <p>{p.telefono}</p>
                    <button
                      className="edit-proveedor-btn"
                      onClick={() => openEditModal(p)}
                    >
                      <FontAwesomeIcon icon={faUserEdit} />
                    </button>
                    <div
                      className="botones-proveedor"
                      onClick={() => handleTrash(p.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                    </div>
                    <span></span>
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {enableBtnBack()}
              {enableBtnNext()}
            </div>
          </>
        )}

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
        {modalEliminar && (
          <EliminarProveedor
            idProveedor={idProveedor}
            isOpen={modalEliminar}
            handleClose={handleClose}
          />
        )}
      </div>
    </div>
  )
}

export default Proveedores
