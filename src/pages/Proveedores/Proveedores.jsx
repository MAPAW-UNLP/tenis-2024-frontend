import NavBar from 'pages/Navbar/NavBar'
import { useState } from 'react'
import '../../styles/proveedores.css'
import AgregarProveedor from 'components/Proveedor/AgregarProveedor'
import { UpdateProveedor } from 'components/Proveedor/UpdateProveedor'
import EliminarProveedor from 'components/Proveedor/EliminarProveedor'
import AgregarPago from 'components/Proveedor/AgregarPago'
import LoaderSpinner from 'components/LoaderSpinner'
import { ShowProveedor } from '../../components/Proveedor/ShowProveedor'
import { useProveedores } from 'hooks/Proveedores/useProveedores'
import { usePaginacion } from 'hooks/Proveedores/usePaginacion'
import ProveedorTableHeader from 'components/Proveedor/ProveedorTableHead'
import ProveedorList from 'components/Proveedor/ProveedorList'
import AgregarYBuscarProveedor from 'components/Proveedor/AgregarYBuscarProveedor'
import PaginationControls from 'components/Proveedor/PaginationControls'

function Proveedores() {
  const URL_BASE = `http://localhost:8083/api/`
  const CANT_FILAS = 5

  const { proveedores, loading, update } = useProveedores(URL_BASE)
  const { pagina, atras, siguiente, totalDePaginas } = usePaginacion(
    CANT_FILAS,
    proveedores.length
  )

  const [mostrarPopup, setMostrarPopup] = useState(false)
  const [payModal, setPayModal] = useState(false)
  const [modalEliminar, setmodalEliminar] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  const [proveedor, setProveedor] = useState({})
  const [idProveedor, setIdProveedor] = useState(null)

  const [sortOrder, setSortOrder] = useState({
    field: 'nombre',
    direction: 'asc',
  })
  const [searchQuery, setSearchQuery] = useState('')

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
        <AgregarYBuscarProveedor
          onAgregar={activarFormulario}
          onBuscar={handleSearchNombre}
        />
        <ProveedorTableHeader onSort={handleSort} sortOrder={sortOrder} />
        {loading ? (
          <LoaderSpinner
            active={loading}
            containerClass={'canchasLoader'}
            loaderClass={'canchasLoaderSpinner'}
          />
        ) : (
          <>
            <ProveedorList
              proveedores={filteredAndSortedProveedores()}
              onEdit={openEditModal}
              onDelete={handleTrash}
              onPay={openFormPay}
              onShow={openShowModal}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <PaginationControls
                pagina={pagina}
                totalDePaginas={totalDePaginas}
                atras={atras}
                siguiente={siguiente}
              />
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
          />
        )}
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
