import NavBar from 'pages/Navbar/NavBar'
import { useState } from 'react'
import AgregarPago from 'components/Proveedor/AgregarPago'
import AgregarProveedor from 'components/Proveedor/AgregarProveedor'
import AgregarYBuscarProveedor from 'components/Proveedor/AgregarYBuscarProveedor'
import EliminarProveedor from 'components/Proveedor/EliminarProveedor'
import LoaderSpinner from 'components/LoaderSpinner'
import PaginationControls from 'components/Proveedor/PaginationControls'
import ProveedorList from 'components/Proveedor/ProveedorList'
import ProveedorTableHeader from 'components/Proveedor/ProveedorTableHead'
import { UpdateProveedor } from 'components/Proveedor/UpdateProveedor'
import { ShowProveedor } from '../../components/Proveedor/ShowProveedor'
import { useModalManager } from 'hooks/Proveedores/useModalManager'
import { useProveedores } from 'hooks/Proveedores/useProveedores'
import { usePaginacion } from 'hooks/Proveedores/usePaginacion'
import '../../styles/proveedores/main-component.css'
import '../../styles/proveedores/background.css'
import Modal from 'components/Modal/Modal'

function Proveedores() {
  const URL_BASE = `http://localhost:8083/api/`

  const CANT_FILAS = 5

  const { proveedores, loading, update } = useProveedores(URL_BASE)

  const {
    modals,
    proveedor,
    idProveedor,
    actions: {
      openFormAdd,
      closeForm,
      openFormEdit,
      openFormPay,
      closeFormPay,
      openFormDelete,
      closeFormDelete,
      openFormShow,
      closeFormShow,
    },
  } = useModalManager(update)

  const [sortOrder, setSortOrder] = useState({
    field: 'nombre',
    direction: 'asc',
  })

  const [searchQuery, setSearchQuery] = useState('')

  const filteredAndSortedProveedores = () => {
    let lista = proveedores
    if (searchQuery) {
      lista = lista.filter((p) =>
        p.nombre.toUpperCase().includes(searchQuery.toUpperCase())
      )
    }
    return (lista = lista.sort((a, b) => {
      const fieldA = a[sortOrder.field].toLowerCase()
      const fieldB = b[sortOrder.field].toLowerCase()
      if (fieldA < fieldB) return sortOrder.direction === 'asc' ? -1 : 1
      if (fieldA > fieldB) return sortOrder.direction === 'asc' ? 1 : -1
      return 0
    }))
  }

  const filteredData = filteredAndSortedProveedores()

  const { pagina, atras, siguiente, totalDePaginas } = usePaginacion(
    CANT_FILAS,
    filteredData.length
  )

  const paginatedProveedores = () => {
    const startIndex = pagina * CANT_FILAS
    return filteredData.slice(startIndex, startIndex + CANT_FILAS)
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

  return (
    <div id="proveedores-component">
      <NavBar title={'Proveedores'} />
      <div id="proveedores-component-mainContent">
        <AgregarYBuscarProveedor
          onAgregar={openFormAdd}
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
              proveedores={paginatedProveedores()}
              onEdit={openFormEdit}
              onDelete={openFormDelete}
              onPay={openFormPay}
              onShow={openFormShow}
            />
            <div>
              <PaginationControls
                pagina={pagina}
                totalDePaginas={totalDePaginas}
                atras={atras}
                siguiente={siguiente}
              />
            </div>
          </>
        )}

        {modals.addModal && (
          <Modal isVisible={modals.addModal} onClose={closeForm}>
            <AgregarProveedor
              handleCloseForm={closeForm}
              proveedores={proveedores}
            />
          </Modal>
        )}
        {modals.editModal && (
          <Modal isVisible={modals.editModal} onClose={closeForm}>
            <UpdateProveedor
              handleCloseForm={closeForm}
              proveedor={proveedor}
            />
          </Modal>
        )}
        {modals.deleteModal && (
          <Modal isVisible={modals.deleteModal} onClose={closeFormDelete}>
            <EliminarProveedor
              idProveedor={proveedor.id}
              isOpen={modals.deleteModal}
              handleClose={closeFormDelete}
            />
          </Modal>
        )}
        {modals.payModal && (
          <Modal isVisible={modals.payModal} onClose={closeFormPay}>
            <AgregarPago
              handleCloseForm={closeFormPay}
              proveedorFijo={proveedor}
            />
          </Modal>
        )}
        {modals.showModal && (
          <Modal isVisible={modals.showModal} onClose={closeFormShow}>
            <ShowProveedor idProveedor={idProveedor} proveedor={proveedor} />
          </Modal>
        )}
      </div>
    </div>
  )
}

export default Proveedores
