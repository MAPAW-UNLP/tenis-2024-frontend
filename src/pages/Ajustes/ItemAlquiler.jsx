import { useState, useEffect } from 'react'
import NavBar from '../Navbar/NavBar'
import '../../styles/ajustes/ajustes.css'
import { GenericButton } from '../../components/Utils/GenericButton'
import LoaderSpinner from '../../components/LoaderSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { GenericButtonDisabled } from '../../components/Utils/GenericButtonDisabled'
import FormularioItemAlquiler from 'components/Item/AgregarItemAlquiler'
import Swal from 'sweetalert2'

export const ItemsAlquiler = () => {
  const URL_BASE = `http://localhost:8083/api/`
  const [itemAlquiler, setItemAlquiler] = useState([])
  const [valoresOriginales, setValoresOriginales] = useState({})
  const [cargando, setCargando] = useState(true)
  const [tempChanges, setTempChanges] = useState({})
  const [mensajeUsuario, setMensajeUsuario] = useState('')
  const [itemPorBorrar, setItemPorBorrar] = useState(null) // Item a eliminar
  const [botonHabilitado, setBotonHabilitado] = useState(false)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  useEffect(() => {
    fetchItemAlquiler()
  }, [])

  const fetchItemAlquiler = async () => {
    setCargando(true)
    try {
      const response = await fetch(`${URL_BASE}itemalquiler`, { method: 'GET' })
      const data = await response.json()
      setItemAlquiler(data)
      // Almacenar los valores originales de importe
      const originales = {}
      data.forEach((item) => {
        originales[item.id] = item.importe
      })
      setValoresOriginales(originales)
    } catch (error) {
      console.error('Error al obtener datos desde la BD', error)
    } finally {
      setCargando(false)
    }
  }

  const handleAddItemAlquiler = async (nuevoItem) => {
    setCargando(true)

    const response = await fetch(`${URL_BASE}addItemAlquiler`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoItem),
    })

    const data = await response.json()

    if (data.status === 'ok') {
      console.log('Item agrego exitosamente')
      await fetchItemAlquiler() // Recargar los items
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Item agregado',
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
        position: 'bottom-end',
        icon: 'error',
        title: 'Error al agregar item',
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

  const handleItemChange = (item, valor) => {
    const nuevoImporte = valor.replace(/\D/g, '') // Solo permite números enteros
    setTempChanges((prev) => ({
      ...prev,
      [item.id]: nuevoImporte,
    }))

    // Actualizar solo la vista localmente para mostrar el valor temporal
    setItemAlquiler((prevItem) =>
      prevItem.map((itemAlquiler) =>
        itemAlquiler.id === item.id
          ? { ...itemAlquiler, importe: nuevoImporte }
          : itemAlquiler
      )
    )
  }

  useEffect(() => {
    // Revisa si hay algún valor en tempChanges que sea diferente al original
    const hayCambios = Object.keys(tempChanges).some(
      (id) => tempChanges[id] !== String(valoresOriginales[id])
    )

    // Habilitar o deshabilitar el botón según si hay cambios
    setBotonHabilitado(hayCambios)
  }, [tempChanges, valoresOriginales])

  const handleConfirmarCambios = async () => {
    setCargando(true)
    for (const idItem in tempChanges) {
      const nuevoImporte = tempChanges[idItem]
      try {
        await fetch(`${URL_BASE}modItemAlquiler`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: idItem, importe: nuevoImporte }),
        })
      } catch (error) {
        console.error('Error al actualizar el importe:', error)
      }
    }
    // Limpiar el estado de cambios temporales y deshabilitar el botón
    setTempChanges({})
    setBotonHabilitado(false)
    setCargando(false)
    await fetchItemAlquiler()
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
    const response = await fetch(`${URL_BASE}bajaItemAlquiler`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: itemPorBorrar.id }),
    })
    const data = await response.json()
    if (data.status === 'ok') {
      console.log('Item eliminado exitosamente')
      await fetchItemAlquiler() // Recargar los datos después de eliminar
      Swal.fire({
        position: 'top',
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
        position: 'top',
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
          <div className="table-head-ajustes">
            <span style={{ fontSize: '1.8em' }}>Valores</span>
          </div>
          <div className="container-table-ajustes">
            <GenericButton
              marginBottom={'0.5em'}
              backgroundColor={'#92bc1e'}
              color="white"
              borderRadius="1em"
              onClick={() => setMostrarFormulario(true)}
            >
              Agregar item
            </GenericButton>

            {mostrarFormulario && (
              <FormularioItemAlquiler
                onClose={() => setMostrarFormulario(false)}
                onSubmit={handleAddItemAlquiler}
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
                    style={{
                      backgroundColor: '#d9d9d9',
                      border: 'none',
                      color: '#5d5d5d',
                      fontSize: 'inherit',
                    }}
                    value={'$' + (item.importe || '')}
                    onChange={(e) => handleItemChange(item, e.target.value)}
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
          <GenericButtonDisabled
            marginBottom={'1.5em'}
            backgroundColor={'#92bc1e'}
            color="white"
            borderRadius="1em"
            width="20em"
            centrado
            onClick={handleConfirmarCambios}
            disabled={!botonHabilitado}
          >
            Confirmar cambios
          </GenericButtonDisabled>
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
