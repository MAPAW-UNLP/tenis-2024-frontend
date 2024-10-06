import NavBar from 'pages/Navbar/NavBar'
import React, { useEffect, useState } from 'react'
import '../../styles/proveedores.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import AgregarProveedor from 'components/Proveedor/AgregarProveedor'
import Button from 'components/Proveedor/Button'
import EliminarProveedor from 'components/Proveedor/EliminarProveedor'

function Proveedores() {
  const URL_BASE = `http://localhost:8083/api/`

  const [proveedores, setProveedores] = useState([])
  const [mostrarPopup, setMostrarPopup] = useState(false)
  const [modalEliminar, setmodalEliminar] = useState(false)
  const [idProveedor, setIdProveedor] = useState(null)
  const [upgrade, setUpgrade] = useState(false)

  useEffect(() => {
    fetch(`${URL_BASE}proveedor`)
      .then((response) => response.json())
      .then((data) => {
        setProveedores(data)
      })
    // .then(() => setAlumnosLoader(() => false))
  }, [upgrade])

  const activarFormulario = () => {
    setMostrarPopup(true)
  }
  const ocultarFormulario = () => {
    setMostrarPopup(false)
  }

  const handleTrash = (id) => {
    setmodalEliminar(true)
    setIdProveedor(id)
  }

  const handleClose = () => {
    setmodalEliminar(false)
  }

  return (
    <div id="proveedores-component">
      <NavBar title={'Proveedores'} />
      <div id="proveedores-component-mainContent">
        <div className="botones-proveedor-main">
          <Button
            text="Agregar nuevo proveedor"
            handleClick={activarFormulario}
          />
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
        {mostrarPopup && (
          <AgregarProveedor
            handleCloseForm={ocultarFormulario}
            proveedores={proveedores}
            upgrade={upgrade}
            setUpgrade={setUpgrade}
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
