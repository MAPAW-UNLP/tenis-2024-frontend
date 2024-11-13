import NavBar from 'pages/Navbar/NavBar'
import { useEffect, useState } from 'react'
import '../../styles/proveedores.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AgregarProveedor from 'components/Proveedor/AgregarProveedor'
import { UpdateProveedor } from 'components/Proveedor/UpdateProveedor'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import EliminarProveedor from 'components/Proveedor/EliminarProveedor'
import AgregarPago from 'components/Proveedor/AgregarPago'
import LoaderSpinner from 'components/LoaderSpinner'
import InputComponent from 'components/Utils/InputComponent'
import { ShowProveedor } from '../../components/Proveedor/ShowProveedor'


function Proveedores() {
  const URL_BASE = `http://localhost:8083/api/`

  const CANT_FILAS = 5

  const [proveedores, setProveedores] = useState([])
  const [mostrarPopup, setMostrarPopup] = useState(false)
  const [payModal, setPayModal] = useState(false)
  const [modalEliminar, setmodalEliminar] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [proveedor, setProveedor] = useState({})
  const [idProveedor, setIdProveedor] = useState(null)
  const [loading, setLoading] = useState(false)
  const [updateList, setUpdateList] = useState(false)
  const [pagina, setPagina] = useState(0)
  const [sortOrder, setSortOrder] = useState({
    field: 'nombre',
    direction: 'asc',
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [modalShow, setModalShow] = useState(false)

  const totalDePaginas = Math.ceil(proveedores.length / CANT_FILAS)

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

  const openFormPay = (p) => {
    setPayModal(true)
    setProveedor({
      id: p.id,
      nombre: p.nombre,
      telefono: p.telefono,
    })
  }

  const closeFormPay = (bool = false) => {
    setPayModal(false)
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

  const closeShow = () => {
    setModalShow(false)
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

  const atras = () => setPagina((prev) => Math.max(prev - 1, 0))

  const siguiente = () =>
    setPagina((prev) => Math.min(prev + 1, totalDePaginas - 1))

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
  // Nueva función para obtener proveedores paginados, ordenados y filtrados
  const filteredAndSortedProveedores = () => {
    let lista = proveedores
    if (searchQuery) {
      lista = lista.filter((p) =>
        p.nombre.toUpperCase().includes(searchQuery.toUpperCase())
      )
    }
    lista = lista.sort((a, b) => {
      const fieldA = a[sortOrder.field].toLowerCase()
      const fieldB = b[sortOrder.field].toLowerCase()
      if (fieldA < fieldB) return sortOrder.direction === 'asc' ? -1 : 1
      if (fieldA > fieldB) return sortOrder.direction === 'asc' ? 1 : -1
      return 0
    })
    return lista.slice(pagina * CANT_FILAS, (pagina + 1) * CANT_FILAS)
  }

  const handleSort = (field) => {
    const isAscending =
      sortOrder.field === field && sortOrder.direction === 'asc'
    const direction = isAscending ? 'desc' : 'asc'
    setSortOrder({ field, direction })
  }

  const getSortIcon = () => {
    return sortOrder.direction === 'asc' ? '▲' : '▼'
  }

  const handleSearchNombre = (e) => {
    setSearchQuery(e.target.value)
  }

  const openShowModal = (id, name, cellphone) => {
    setIdProveedor(id)
    setProveedor({
      nombre: name,
      telefono: cellphone,
    })
    setModalShow(true)
  }

  return (
    <div id="proveedores-component">
      <NavBar title={'Proveedores'} />
      <div id="proveedores-component-mainContent">
        <div className="boton-add-and-search">
          <button className="btn-agregar-proveedor" onClick={activarFormulario}>
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
              onChangeFuncion={handleSearchNombre}
            />
          </div>
        </div>
        <div className="table-head-proveedores">
          <span
            style={{
              fontSize: '1.8em',
              width: 200,
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleSort('nombre')}
          >
            Nombre {getSortIcon()}
          </span>
          <span style={{ fontSize: '1.8em', width: 200, textAlign: 'center' }}>
            Teléfono
          </span>
          <span></span>
          <span style={{ fontSize: '1.8em', width: 200, textAlign: 'center' }}>
            Acciones
          </span>
          <span></span>
        </div>
        {loading ? (
          <LoaderSpinner
            active={loading}
            containerClass={'canchasLoader'}
            loaderClass={'canchasLoaderSpinner'}
          />
        ) : (
          <>
            <div className="container-table-proveedores">
              {filteredAndSortedProveedores().map((p) => {
                return (
                  <div
                    key={p.id}
                    className="proveedores-item-list"
                    onClick={() => openShowModal(p.id, p.nombre, p.telefono)}
                  >
                    <p>{p.nombre}</p>
                    <p>{p.telefono}</p>
                    <button
                      className="edit-proveedor-btn"
                      title="Modificar proveedor"
                      onClick={() => openEditModal(p)}
                    >
                      <FontAwesomeIcon icon={faUserEdit} />
                    </button>
                    <button
                      className="delete-proveedor-btn"
                      title="Eliminar proveedor"
                      onClick={() => handleTrash(p.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="pay-proveedor-btn"
                      title="Realizar pago a proveedor"
                      onClick={() => openFormPay(p)}
                    >
                      <FontAwesomeIcon icon={faMoneyBillAlt} />
                    </button>
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
        {payModal && (
          <AgregarPago
            handleCloseForm={closeFormPay}
            proveedorFijo={proveedor}

        {modalShow && (
          <ShowProveedor
            isOpen={modalShow}
            handleClose={closeShow}
            idProveedor={idProveedor}
            proveedor={proveedor}
          />
        )}
      </div>
    </div>
  )
}

export default Proveedores
