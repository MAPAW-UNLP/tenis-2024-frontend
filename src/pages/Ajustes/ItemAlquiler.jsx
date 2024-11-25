import { useState, useEffect } from 'react'
import NavBar from '../Navbar/NavBar'
import '../../styles/ajustes/ajustes.css'
import { GenericButton } from '../../components/Utils/GenericButton'
import LoaderSpinner from '../../components/LoaderSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import FormularioItemAlquiler from 'components/Item/AgregarItemAlquiler'
import Swal from 'sweetalert2'
import { itemAlquilerService } from 'api/itemalquiler'
import Button from 'components/Button/Button'
import Arrow from 'Img/arrow'
import ButtonArrow from 'Img/arrow'
import ButtonHome from 'Img/home'

export const ItemsAlquiler = () => {
  const URL_BASE = `http://localhost:8083/api/`
  const [itemAlquiler, setItemAlquiler] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mensajeUsuario, setMensajeUsuario] = useState('')
  const [itemPorBorrar, setItemPorBorrar] = useState(null) // Item a eliminar
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [itemEditar, setItemEditar] = useState(null)

  useEffect(() => {
    fetchItemAlquiler()
  }, [])

  const fetchItemAlquiler = async () => {
    setCargando(true)
    try {
      const data = await itemAlquilerService.getItemAlquiler()
      setItemAlquiler(data)
    } catch (error) {
      console.error('Error al obtener datos desde la BD', error)
    } finally {
      setCargando(false)
    }
  }

  const handleAddItemAlquiler = async (nuevoItem) => {
    setCargando(true)
    const method = nuevoItem.id ? 'PUT' : 'POST'
    const url = nuevoItem.id ? `modItemAlquiler` : `addItemAlquiler`
    const data = await itemAlquilerService.crearModificarItemAlquiler(
      nuevoItem,
      url,
      method
    )
    if (data.status === 'ok') {
      console.log('Item agregado exitosamente')
      await fetchItemAlquiler() // Recargar los items
      Swal.fire({
        position: 'bottom-right',
        icon: 'success',
        title: nuevoItem.id ? 'Item actualizado' : 'Item agregado',
        showConfirmButton: false,
        timer: 4000,
        background: '#4CAF50',
        color: 'white',
        toast: true,
        customClass: {
          popup: 'small-alert',
        },
      })
    } else {
      console.error(data.message)
      Swal.fire({
        position: 'bottom-right',
        icon: 'error',
        title: nuevoItem.id ? 'Error al editar item' : 'Error al agregar item',
        showConfirmButton: false,
        timer: 4000,
        background: '#F44336',
        color: 'white',
        toast: true,
        customClass: {
          popup: 'small-alert',
        },
      })
      setCargando(false)
    }
  }

  const handleEliminarItem = (item) => {
    setItemPorBorrar(item)
    setMensajeUsuario(
      <span style={{ fontSize: '1.2em' }}>
        ¿Está seguro de que quiere eliminar el item:{' '}
        <span style={{ color: 'red' }}>{item.description}</span>?<br></br> Esta
        acción no se puede deshacer.
      </span>
    )
    document.getElementById('mensajesUsuario').style.display = 'flex'
  }

  const handleCerrarMensaje = () => {
    setMensajeUsuario('')
    setItemPorBorrar(null)
    document.getElementById('mensajesUsuario').style.display = 'none'
  }

  const handleAceptarBorrado = async () => {
    handleCerrarMensaje()
    if (!itemPorBorrar) return

    setCargando(true)
    const data = await itemAlquilerService.borrarItemAlquiler(itemPorBorrar.id)
    if (data.status === 'ok') {
      console.log('Item eliminado exitosamente')
      await fetchItemAlquiler() // Recargar los datos después de eliminar
      Swal.fire({
        position: 'bottom-right',
        icon: 'success',
        title: 'Item eliminado',
        showConfirmButton: false,
        timer: 4000,
        background: '#4CAF50',
        color: 'white',
        toast: true,
        customClass: {
          popup: 'small-alert',
        },
      })
    } else {
      console.error(data.message)
      setCargando(false)
      Swal.fire({
        position: 'bottom-right',
        icon: 'error',
        title: 'Error al eliminar item',
        showConfirmButton: false,
        timer: 4000,
        background: '#F44336',
        color: 'white',
        toast: true,
        customClass: {
          popup: 'small-alert',
        },
      })
    }
  }

  return (
    <div id="ajustes-component">
      <NavBar title={'Items'} />
      {cargando ? (
        <LoaderSpinner
          active={cargando}
          containerClass={'canchasLoader'}
          loaderClass={'canchasLoaderSpinner'}
        />
      ) : (
        <div
          className="container-ajustes"
          style={{ backgroundColor: '#ffffff' }}
        >
          <div
            className="table-head-ajustes"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              marginBottom: '20px',
            }}
          >
            <span style={{ fontSize: '1.8em', marginBottom: '10px' }}>
              Valores
            </span>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <ButtonArrow style={{ marginLeft: '15%' }} />
              <ButtonHome style={{ marginTop: '3%' }} />
            </div>
          </div>
          <div className="container-table-ajustes">
            <Button
              color="success"
              size="md"
              onClick={() => setMostrarFormulario(true)}
            >
              Agregar item
            </Button>

            {mostrarFormulario && (
              <FormularioItemAlquiler
                onClose={() => {
                  setMostrarFormulario(false)
                  setItemEditar(null)
                }}
                onSubmit={handleAddItemAlquiler}
                item={itemEditar}
              />
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                backgroundColor: '#78a1ca',
                borderRadius: '1em',
                marginBottom: '.5em',
                height: '2.5em',
              }}
            >
              <div
                className="table-cell-ajustes"
                style={{
                  alignSelf: 'center',
                  fontFamily: 'var(--title-text)',
                  color: 'var(--neutral-white-text)',
                  fontSize: '1.2em',
                }}
              >
                Item
              </div>
              <div
                className="table-cell-ajustes"
                style={{
                  alignSelf: 'center',
                  fontFamily: 'var(--title-text)',
                  color: 'var(--neutral-white-text)',
                  fontSize: '1.2em',
                }}
              >
                Valor
              </div>
            </div>

            {itemAlquiler.map((item) => (
              <div className="table-row-ajustes" key={`item-${item.id}`}>
                <div
                  className="table-cell-ajustes"
                  style={{ color: '#5d5d5d' }}
                >
                  {item.description}
                </div>
                <div
                  className="table-cell-ajustes"
                  style={{ color: '#5d5d5d' }}
                >
                  <input
                    type="text"
                    className="table-input-ajustes"
                    disabled={true}
                    style={{
                      backgroundColor: '#d9d9d9',
                      border: 'none',
                      color: '#5d5d5d',
                      fontSize: 'inherit',
                    }}
                    value={'$' + (item.importe || '')}
                    /*onChange={(e) => handleItemChange(item, e.target.value)} **/
                  />
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{
                      cursor: 'pointer',
                      marginLeft: '10px',
                      color: '#2170DF',
                    }}
                    onClick={() => {
                      setMostrarFormulario(true)
                      setItemEditar(item)
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{
                      cursor: 'pointer',
                      marginLeft: '10px',
                      color: 'red',
                    }}
                    onClick={() => handleEliminarItem(item)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje de confirmación */}
      <div id="mensajesUsuario" style={{ display: 'none' }}>
        <p>{mensajeUsuario}</p>
        <GenericButton
          id="button-aceptarMensaje"
          onClick={handleAceptarBorrado}
          className="botones-MensajesUsuario"
          backgroundColor="#FF0000"
          width="200px"
          height="70px"
        >
          Aceptar
        </GenericButton>
        <GenericButton
          id="button-cerrarMensaje"
          onClick={handleCerrarMensaje}
          className="botones-MensajesUsuario"
          width="200px"
          height="70px"
        >
          Cancelar
        </GenericButton>
      </div>
    </div>
  )
}
