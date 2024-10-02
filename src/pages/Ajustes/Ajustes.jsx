import { useState, useEffect } from 'react'
import NavBar from '../Navbar/NavBar'
import '../../styles/ajustes/ajustes.css'
import { GenericButton } from '../../components/Utils/GenericButton'
import LoaderSpinner from '../../components/LoaderSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export const Ajustes = () => {
  const URL_BASE = `http://localhost:8083/api/`
  const [tipoClases, setTipoClases] = useState([])
  const [cargando, setCargando] = useState(true)
  const [tempChanges, setTempChanges] = useState({})

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

  const handleTipoClaseChange = (tipo, valor) => {
    const nuevoImporte = valor.replace(/\D/g, '') // Solo permite números
    setTempChanges((prev) => ({
      ...prev,
      [tipo.id]: nuevoImporte,
    }))

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

  const handleEliminarTipoClase = async (idTipoClase) => {
    setCargando(true)
    try {
      const response = await fetch(`${URL_BASE}bajaClase`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: idTipoClase }),
      })
      const data = await response.json()
      if (data.status === 'ok') {
        console.log('Tipo de clase eliminado exitosamente')
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error('Error al eliminar el tipo de clase:', error)
    } finally {
      setCargando(false)
      fetchTipoClases() // Recargar los datos después de eliminar
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
                    onClick={() => handleEliminarTipoClase(tipoClase.id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <GenericButton
            marginBottom={'1.5em'}
            backgroundColor={'#92bc1e'}
            color="white"
            borderRadius="1em"
            width="20em"
            centrado
            onClick={handleConfirmarCambios}
          >
            Confirmar cambios
          </GenericButton>
        </div>
      )}
    </div>
  )
}
