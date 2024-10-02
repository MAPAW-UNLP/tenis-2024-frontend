import NavBar from 'pages/Navbar/NavBar'
import React, { useEffect, useState } from 'react'
import '../../styles/proveedores.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Proveedores() {

    const URL_BASE = `http://localhost:8083/api/`

    const [proveedores, setProveedores] = useState([])

    useEffect(() => {
        fetch(`${URL_BASE}proveedor`)
            .then((response) => response.json())
            .then((data) => {
                setProveedores(data)
            })
            // .then(() => setAlumnosLoader(() => false))
    }, [])

    return (
        <div id="proveedores-component">
            <NavBar title={'Proveedores'} />
            <div id='proveedores-component-mainContent'>
                <div className='botones-proveedor-main'>
                    <button className='btn-agregar-proveedor'>Agregar nuevo Proveedor</button>
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
                    <span style={{ fontSize: '1.8em',width:200, textAlign:"center"}}>Nombre</span>
                    <span style={{ fontSize: '1.8em', width:200,textAlign:"center"}}>Telefono</span>
                    <span></span>
                </div>
                <div className="container-table-proveedores">
                    {
                        proveedores.map(p => {
                            return <div key={p.id} className='proveedores-item-list'>
                                <p>{p.nombre}</p>
                                <p>{p.telefono}</p>
                                <span></span>
                            </div>
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Proveedores