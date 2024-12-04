import { useState, useEffect } from 'react'
import NavBar from '../Navbar/NavBar'
import '../../styles/ajustes/ajustes.css'
import { GenericButton } from '../../components/Utils/GenericButton'
import LoaderSpinner from '../../components/LoaderSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/Button/Button'
import FormularioTipoClase from '../../components/Clase/AgregarTipoClase'
import Swal from 'sweetalert2'
import { tipoClaseService } from 'api/tipoClase'
import ButtonArrow from 'Img/arrow'
import ButtonHome from 'Img/home'
import ModalEliminar from 'components/Clase/ModalEliminar'

export const Ajustes = () => {
  const URL_BASE = `http://localhost:8083/api/`
  const [tipoClases, setTipoClases] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mensajeUsuario, setMensajeUsuario] = useState('')
  const [tipoClasePorBorrar, setTipoClasePorBorrar] = useState(null) // Tipo de clase a eliminar
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [tipoClaseEditar, setTipoClaseEditar] = useState(null)
  const [modalEliminar, setModalEliminar] = useState(false)

  useEffect(() => {
    fetchTipoClases()
  }, [])

  const fetchTipoClases = async () => {
    setCargando(true)
    try {
      const data = await tipoClaseService.getTipoClases()
      setTipoClases(data)
      // Almacenar los valores originales de importe
    } catch (error) {
      console.error('Error al obtener datos desde la BD', error)
    } finally {
      setCargando(false)
    }
  }

  const handleAgregarTipoClase = async (nuevoTipoClase) => {
    setCargando(true)
    let data
    if (nuevoTipoClase.id) {
      data = await tipoClaseService.crearModificarTipoClase(
        nuevoTipoClase,
        'modClase',
        'PUT'
      )
    } else {
      data = await tipoClaseService.crearModificarTipoClase(
        nuevoTipoClase,
        'addClase',
        'POST'
      )
    }
    if (data.status === 'ok') {
      console.log('Tipo de clase creado exitosamente')
      await fetchTipoClases() // Recargar los tipos de clase
      Swal.fire({
        position: 'bottom-right',
        icon: 'success',
        title: nuevoTipoClase.id ? 'Clase editado' : 'Clase creado',
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
        title: nuevoTipoClase.id
          ? 'Error al editar clase'
          : 'Error al crear clase.',
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

  const handleEliminarTipoClase = (tipoClase) => {
    setModalEliminar(true)
    setTipoClasePorBorrar(tipoClase)
    setMensajeUsuario(
      <span style={{ fontSize: '1.2em' }}>
        ¿Está seguro de que quiere eliminar la clase:{' '}
        <span style={{ color: 'red' }}>{tipoClase.tipo}</span>?<br></br> Esta
        acción no se puede deshacer.
      </span>
    )
    document.getElementById('mensajesUsuario').style.display = 'flex'
  }

  const handleCerrarMensaje = () => {
    setMensajeUsuario('')
    setTipoClasePorBorrar(null)
    setModalEliminar(false)
    document.getElementById('mensajesUsuario').style.display = 'none'
  }

  const handleAceptarBorrado = async () => {
    handleCerrarMensaje()
    setModalEliminar(false)
    if (!tipoClasePorBorrar) return
    setCargando(true)
    const data = await tipoClaseService.borrarTipoClase(tipoClasePorBorrar.id)
    if (data.status === 'ok') {
      console.log('Clase eliminada exitosamente')
      await fetchTipoClases() // Recargar los datos después de eliminar
      Swal.fire({
        position: 'bottom-right',
        icon: 'success',
        title: 'Clase eliminada exitosamente',
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
        title: 'Error al eliminar la clase',
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
      <NavBar title={'Clases'} />
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
              size="lg"
              onClick={() => setMostrarFormulario(true)}
            >
              Crear clase
            </Button>

            {mostrarFormulario && (
              <FormularioTipoClase
                onClose={() => {
                  setMostrarFormulario(false)
                  setTipoClaseEditar(null)
                }}
                onSubmit={handleAgregarTipoClase}
                tipoClase={tipoClaseEditar}
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
                Clase
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

            {tipoClases.map((tipoClase) => (
              <div
                className="table-row-ajustes"
                key={`tipoClase-${tipoClase.id}`}
              >
                <div
                  className="table-cell-ajustes"
                  style={{ color: '#5d5d5d' }}
                >
                  {tipoClase.tipo}
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
                    value={'$' + (tipoClase.importe || '')}
                    /**        onChange={(e) =>
                      handleTipoClaseChange(tipoClase, e.target.value)
                    }*/
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
                      setTipoClaseEditar(tipoClase)
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{
                      cursor: 'pointer',
                      marginLeft: '10px',
                      color: 'red',
                    }}
                    onClick={() => handleEliminarTipoClase(tipoClase)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje de confirmación */}
      <ModalEliminar
        isVisible={modalEliminar}
        onClose={handleCerrarMensaje}
        mensaje={mensajeUsuario}
        titulo={''}
        confirmarBorrar={handleAceptarBorrado}
      />
    </div>
  )
}
