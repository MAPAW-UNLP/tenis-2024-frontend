import NavBar from 'pages/Navbar/NavBar'
import { useState } from 'react'
import '../../styles/proveedores/main-component.css'
import '../../styles/proveedores/background.css'

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
import { useModalManager } from 'hooks/Proveedores/useModalManager'

function Proveedores() {
  const URL_BASE = `http://localhost:8083/api/`

  const CANT_FILAS = 5

  const { proveedores, loading, update } = useProveedores(URL_BASE)

  const { pagina, atras, siguiente, totalDePaginas } = usePaginacion(
    CANT_FILAS,
    proveedores.length
  )

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
              proveedores={filteredAndSortedProveedores()}
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
          <AgregarProveedor
            handleCloseForm={closeForm}
            proveedores={proveedores}
          />
        )}
        {modals.editModal && (
          <UpdateProveedor handleCloseForm={closeForm} proveedor={proveedor} />
        )}
        {modals.deleteModal && (
          <EliminarProveedor
            idProveedor={idProveedor}
            isOpen={modals.deleteModal}
            handleClose={closeFormDelete}
          />
        )}
        {modals.payModal && (
          <AgregarPago
            handleCloseForm={closeFormPay}
            proveedorFijo={proveedor}
          />
        )}
        {modals.showModal && (
          <ShowProveedor
            isOpen={modals.showModal}
            handleClose={closeFormShow}
            idProveedor={idProveedor}
            proveedor={proveedor}
          />
        )}
      </div>
    </div>
  )
}

export default Proveedores
