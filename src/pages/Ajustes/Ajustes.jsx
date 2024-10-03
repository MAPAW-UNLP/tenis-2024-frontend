import { useState, useEffect } from 'react'
import NavBar from '../Navbar/NavBar'
import '../../styles/ajustes/ajustes.css'
import { GenericButton } from '../../components/Utils/GenericButton'
import LoaderSpinner from '../../components/LoaderSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { GenericButtonDisabled } from '../../components/Utils/GenericButtonDisabled'
import FormularioTipoClase from '../../components/Clase/AgregarTipoClase'

export const Ajustes = () => {
  const URL_BASE = `http://localhost:8083/api/`
  const [tipoClases, setTipoClases] = useState([])
  const [cargando, setCargando] = useState(true)
  const [tempChanges, setTempChanges] = useState({})
  const [mensajeUsuario, setMensajeUsuario] = useState('')
  const [tipoClasePorBorrar, setTipoClasePorBorrar] = useState(null) // Tipo de clase a eliminar
  const [botonHabilitado, setBotonHabilitado] = useState(false)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  useEffect(() => {
    fetchTipoClases()
  }, [])

  const fetchTipoClases = async () => {
    setCargando(true)
    try {
      const response = await fetch(`${URL_BASE}clases`, { method: 'GET' })
      const data = await response.json()
      setTipoClases(data)
    } catch (error) {
      console.error('Error al obtener datos desde la BD', error)
    } finally {
      setCargando(false)
    }
  }

  const handleAgregarTipoClase = async (nuevoTipoClase) => {
    setCargando(true)

    const response = await fetch(`${URL_BASE}addClase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoTipoClase),
    })

    const data = await response.json()

    if (data.status === 'ok') {
      fetchTipoClases() // Recargar los tipos de clase
    } else {
      console.error(data.message)
    }

    setCargando(false)
    fetchTipoClases()
  }

  const handleTipoClaseChange = (tipo, valor) => {
    const nuevoImporte = valor.replace(/\D/g, '') // Solo permite numeros enteros
    setTempChanges((prev) => ({
      ...prev,
      [tipo.id]: nuevoImporte,
    }))

    // Actualizar la vista localmente
    setTipoClases((prevTipoClases) =>
      prevTipoClases.map((tipoClase) =>
        tipoClase.id === tipo.id
          ? { ...tipoClase, importe: nuevoImporte }
          : tipoClase
      )
    )
  }

  const handleConfirmarCambios = async () => {
    setCargando(true)
    for (const idTipoClase in tempChanges) {
      const nuevoImporte = tempChanges[idTipoClase]
      try {
        await fetch(`${URL_BASE}modClase`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: idTipoClase, importe: nuevoImporte }),
        })
      } catch (error) {
        console.error('Error al actualizar el importe:', error)
      }
    }
    setCargando(false)
    fetchTipoClases()
  }

  const handleEliminarTipoClase = (tipoClase) => {
    setTipoClasePorBorrar(tipoClase)
    setMensajeUsuario(
      <span style={{ fontSize: '1.2em' }}>
        ¿Está seguro de que quiere eliminar el tipo de clase:{' '}
        <span style={{ color: 'red' }}>{tipoClase.tipo}</span>? Esta acción no
        se puede deshacer.
      </span>
    )
    document.getElementById('mensajesUsuario').style.display = 'flex'
  }

  const handleCerrarMensaje = () => {
    setMensajeUsuario('')
    setTipoClasePorBorrar(null)
    document.getElementById('mensajesUsuario').style.display = 'none'
  }

  const handleAceptarBorrado = async () => {
    handleCerrarMensaje()
    if (!tipoClasePorBorrar) return

    setCargando(true)
    try {
      const response = await fetch(`${URL_BASE}bajaClase`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: tipoClasePorBorrar.id }),
      })
      const data = await response.json()
      if (data.status === 'ok') {
        console.log('Tipo de clase eliminado exitosamente')
        fetchTipoClases() // Recargar los datos después de eliminar
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error('Error al eliminar el tipo de clase:', error)
    } finally {
      setCargando(false)
      fetchTipoClases()
    }
  }

  return (
    <div id="ajustes-component">
      <NavBar title={'Ajustes'} />
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
              Crear tipo de clase
            </GenericButton>

            {mostrarFormulario && (
              <FormularioTipoClase
                onClose={() => setMostrarFormulario(false)}
                onSubmit={handleAgregarTipoClase}
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
                Tipo de clase
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
                    style={{
                      backgroundColor: '#d9d9d9',
                      border: 'none',
                      color: '#5d5d5d',
                      fontSize: 'inherit',
                    }}
                    value={'$' + (tipoClase.importe || '')}
                    onChange={(e) =>
                      handleTipoClaseChange(tipoClase, e.target.value)
                    }
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
          <GenericButtonDisabled
            marginBottom={'1.5em'}
            backgroundColor={'#92bc1e'}
            color="white"
            borderRadius="1em"
            width="20em"
            centrado
            onClick={handleConfirmarCambios}
            disabled={false}
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
