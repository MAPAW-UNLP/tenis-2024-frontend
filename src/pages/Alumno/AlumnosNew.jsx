import { useState, useEffect } from 'react'
import NavBar from '../Navbar/NavBar'
import LoaderSpinner from '../../components/LoaderSpinner'
import { GenericLargeButton } from '../../components/Utils/GenericLargeButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import '../../styles/alumnos.css'
import '../../styles/alumnos/alumnos.css'
import { ordenarPorNombre } from '../../components/Utils/Functions'
import { AlumnosList } from '../../components/AlumnoNew/AlumnosList'
import { AgregarAlumno } from '../../components/AlumnoNew/AgregarAlumno'
import { AlumnoDetails } from '../../components/AlumnoNew/AlumnoDetails'
import { EditarAlumno } from '../../components/AlumnoNew/EditarAlumno'

export const AlumnosNew = () => {
  const URL_BASE = `http://localhost:8083/api/`

  // Lista de cobros actuales del alumno
  const [cobrosActUser, setCobrosActUser] = useState()

  // Estado booleano para abrir formulario de creacion de nuevo alumno
  const [active, setActive] = useState(false)

  const [alumnos, setAlumnos] = useState([])
  const [grupos, setGrupos] = useState([])
  const [reservas, setReservas] = useState([])

  // Spinner - loaders
  const [alumnosLoader, setAlumnosLoader] = useState(true) // Principal
  const [loadingDetails, setLoadingDetails] = useState(false) // Secundario (cuando se quiere ver los detalles de un alumno)

  // La lista de alumnos que se renderiza al cargar el componente
  const [actAlumnos, setActAlumnos] = useState(false)

  // Alumnos filtrados
  const [alumnosFiltrados, setAlumnosFiltrados] = useState(alumnos)

  // Estado para el formulario de "Agregar Alumno"
  const [alumnoForm, setAlumnoForm] = useState({
    nombre: '',
    telefono: '',
    nacimiento: '',
  })

  // ALUMNO DETAIL
  const [activeDetails, setActiveDetails] = useState(false) // Estado para renderizar la vista de los detalles del alumno
  const [actAlu, setActAlu] = useState('') // Estado para guardar el alumno actual
  const [aluDetail, setAluDetail] = useState({})

  // ALUMNO EDICION
  const [editAlumnoActive, setEditAlumnoActive] = useState(false)
  const [alumnoEditForm, setAlumnoEditForm] = useState({
    nombre: '',
    telefono: '',
  })

  // useEffect principal para la obtencion de alumnos desde la BD
  useEffect(() => {
    const fetchClientesConCobros = async () => {
      // setLoading(true)
      try {
        const response = await fetch(`${URL_BASE}clientes`)
        const clientesData = await response.json()
        const grupos = await fetch(`${URL_BASE}grupos`)
        const gruposData = await grupos.json()
        const reservas = await fetch(`${URL_BASE}reservas`)
        const reservasData = await reservas.json()
        console.log('🚀 ~ fetchClientesConCobros ~ reservasData:', reservasData)

        const clientesConCobros = await Promise.all(
          clientesData.map(async (cliente) => {
            const cobrosResponse = await fetch(
              `${URL_BASE}cobros_por_cliente?clienteId=${cliente.id}`
            )
            const cobrosData = await cobrosResponse.json()
            const newCliente = { ...cliente, cobros: cobrosData }
            const deuda = calcularDeuda(
              newCliente,
              gruposData,
              reservasData.detail
            )
            return { ...cliente, cobros: cobrosData, deuda }
          })
        )

        setAlumnos(
          clientesConCobros.length !== 0
            ? ordenarPorNombre(clientesConCobros)
            : clientesConCobros
        )
        setAlumnosLoader(() => false)
      } catch (error) {
        console.error('Error al obtener clientes y cobros:', error)
      } finally {
        // setLoading(false)
      }
    }

    const fetchGrupos = async () => {
      try {
        const response = await fetch(`${URL_BASE}grupos`)
        const gruposData = await response.json()
        setGrupos(gruposData)
      } catch (error) {
        console.error('Error al obtener grupos:', error)
      }
    }

    const fetchReservas = async () => {
      try {
        const response = await fetch(`reservas.json`)
        const reservasData = await response.json()
        setReservas(reservasData)
      } catch (error) {
        console.error('Error al obtener reservas:', error)
      }
    }

    fetchGrupos()
    fetchReservas()
    fetchClientesConCobros()
  }, [actAlumnos])

  const calcularDeuda = (cliente, gruposData, reservasData) => {
    console.log('🚀 ~ calcularDeuda ~ reservasData:', reservasData)
    console.log('🚀 ~ calcularDeuda ~ grupos:', gruposData)

    // const reservasData = reservasData.filter(
    //   (reserva) => new Date(reserva.fecha) < new Date()
    // )

    const gruposCliente = gruposData.filter(
      (grupo) => grupo.personaId === cliente.id
    )
    const gruposPasadosCliente = gruposCliente.filter((grupo) =>
      reservasData.find((reserva) => reserva.reservaId === grupo.reservaId)
    )

    const reservasDataCliente = reservasData.filter((reserva) =>
      gruposPasadosCliente.some(
        (grupo) => grupo.reservaId === reserva.reservaId
      )
    )

    const cantClases = cliente.cobros.length - gruposPasadosCliente.length
    console.log(
      '🚀 ~ calcularDeuda ~ gruposPasadosCliente.length:',
      gruposPasadosCliente.length
    )
    console.log(
      '🚀 ~ calcularDeuda ~ cliente.cobros.length:',
      cliente.cobros.length
    )
    console.log(
      '🚀 ~ cliente.cobros.length ~ cantClases:',
      cliente.cobros.length - gruposPasadosCliente.length
    )

    let reservasDataClienteReducidaPorHaberCobros = reservasDataCliente.filter(
      (reserva) =>
        cliente.cobros.some((cobro) => cobro.clienteId === reserva.reservaId)
    )

    if (cliente.cobros.length === 0) {
      reservasDataClienteReducidaPorHaberCobros = reservasDataCliente
    }

    const montoCobros = reservasDataClienteReducidaPorHaberCobros.reduce(
      (acc, elem) => {
        if (elem.tipo === 1) {
          return acc + 50
        } else {
          return acc + 100
        }
      },
      0
    )

    console.log('🚀 ~ montoCobros ~ montoCobros:', montoCobros)

    return {
      cantClases,
      montoCobros,
    }
  }

  // Este useEffect se dispara cuando traemos los datos para editar un alumno.
  // Si actAlu es modificado entonces obtenemos datos de BD sobre el alumno,
  // muestra desplegable de edicion (ya que pone en true el estado que lo renderiza)
  // y por ultimo vuelve a poner en false el estado que maneja el spinner de carga
  useEffect(() => {
    if (actAlu !== '') {
      fetch(`${URL_BASE}cliente?clienteId=${actAlu.id}`)
        .then((response) => response.json())
        .then((data) => setAluDetail(data))
        .then(() => setLoadingDetails(false))

      fetch(`${URL_BASE}cobros_por_cliente_v2?clienteId=${actAlu.id}`)
        .then((response) => response.json())
        .then((data) => setCobrosActUser(data))
        .then(() => setActiveDetails(true))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actAlu])

  // AGREGAR ALUMNO
  const handleSubmitAlumnoForm = (e) => {
    e.preventDefault()
    setAlumnosLoader((prevValue) => !prevValue)
    setActive(false)
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        nombre: alumnoForm.nombre,
        telefono: alumnoForm.telefono,
        fechaNac: alumnoForm.nacimiento,
      }),
    }

    fetch(`${URL_BASE}cliente`, requestOptions)
      .then((response) => response.json())
      .then(() => setActAlumnos((v) => !v))
      .then(clearState)
  }

  // EDITAR ALUMNO
  const handleSubmitAlumnoEditForm = (e) => {
    e.preventDefault()
    setEditAlumnoActive(false)
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        nombre: alumnoEditForm.nombre,
        telefono: alumnoEditForm.telefono,
        id: actAlu.id,
        esalumno: true,
      }),
    }

    fetch(`${URL_BASE}cliente`, requestOptions)
      .then((response) => response.json())
      .then(() => setActAlumnos((v) => !v))
      .then(() => setActAlu({ id: actAlu.id }))
      .then(clearEditState)
  }

  const clearState = () => {
    setAlumnoForm({
      nombre: '',
      telefono: '',
      nacimiento: '',
    })
  }

  const clearEditState = () => {
    setAlumnoEditForm({
      nombre: '',
      telefono: '',
    })
  }

  const checkStudentExistence = (student) => {
    return (
      alumnos
        .map((each) => each.nombre.toUpperCase())
        .indexOf(student.toUpperCase()) === -1
    )
  }

  // Reseteo el formulario de Alumnos (carga)
  const resetAlumnoForm = () => {
    setAlumnoForm({
      nombre: '',
      telefono: '',
      nacimiento: '',
    })
  }

  // Reseteo el formulario de Alumnos (edicion)
  const resetAlumnoEditForm = () => {
    setAlumnoEditForm({
      nombre: '',
      telefono: '',
    })
  }

  // Funcion para cerrar el formulario de CREACION de Alumno
  // Se debe eliminar cualquier valor existente en el estado - formulario
  const handleCloseForm = () => {
    resetAlumnoForm()
    setActive(false)
  }

  // Funcion para cerrar el formulario de EDICION de Alumno
  // Se debe eliminar cualquier valor existente en el estado - formulario
  const handleCloseEditForm = () => {
    resetAlumnoEditForm()
    setEditAlumnoActive(false)
  }

  // Cierra la ventana de detalles de Alumno y elimina los valores del estado
  const handleCloseDetails = () => {
    setActiveDetails(false)
    setActAlu('')
  }

  // Actualiza los datos del formulario para AGREGRAR un Alumno
  const handleChangeFormData = (e) => {
    setAlumnoForm({ ...alumnoForm, [e.target.name]: e.target.value })
  }

  // Actualiza los datos del formulario para EDICION un Alumno
  const handleChangeEditFormData = (e) => {
    setAlumnoEditForm({ ...alumnoEditForm, [e.target.name]: e.target.value })
  }

  // Buscador
  const handleChangeSearchAlumnno = (e) => {
    const posibles = alumnos.filter((a) =>
      a.nombre.toUpperCase().includes(e.target.value.toUpperCase())
    )
    if (e.target.value === '') {
      setAlumnosFiltrados(alumnos)
    } else {
      setAlumnosFiltrados(posibles)
    }
  }

  const filtrarAlumnos = (e) => {
    const value = e.target.value
    if (value === '1') {
      setAlumnosFiltrados(alumnos)
      return
    }

    if (value === '2') {
      setAlumnosFiltrados(() => alumnos.filter((a) => a.deuda.cantClases < 0))
    } else if (value === '3') {
      setAlumnosFiltrados(() => alumnos.filter((a) => a.deuda.cantClases >= 0))
    }
  }

  useEffect(() => {
    setAlumnosFiltrados(alumnos)
  }, [alumnos])

  return (
    <div id="alumnos-component" style={{ position: 'relative' }}>
      <AlumnoDetails
        activeDetails={activeDetails}
        handleCloseDetails={handleCloseDetails}
        aluDetail={aluDetail}
        cobrosActUser={cobrosActUser}
        setEditAlumnoActive={setEditAlumnoActive}
      />
      <NavBar title={'Alumnos'} />
      <div id="alumnos-component-mainContent">
        {/* Agregar alumno - Formulario flotante */}
        <GenericLargeButton
          title={'Crear nuevo alumno'}
          doSomething={() => setActive(true)}
        />
        <AgregarAlumno
          active={active}
          handleCloseForm={handleCloseForm}
          submitAlumnoForm={handleSubmitAlumnoForm}
          handleChangeFormData={handleChangeFormData}
          alumnoForm={alumnoForm}
          setAlumnoForm={setAlumnoForm}
          checkStudentExistence={checkStudentExistence}
        />

        {/* Detalles de alumno */}
        <EditarAlumno
          editAlumnoActive={editAlumnoActive}
          handleChangeFormData={handleChangeEditFormData}
          setEditAlumnoActive={setEditAlumnoActive}
          handleCloseForm={handleCloseEditForm}
          alumnoEditForm={alumnoEditForm}
          checkStudentExistence={checkStudentExistence}
          submitEditAlumnoForm={handleSubmitAlumnoEditForm}
        />

        {alumnosLoader ? (
          <LoaderSpinner
            active={alumnosLoader}
            containerClass={'canchasLoader'}
            loaderClass={'canchasLoaderSpinner'}
          />
        ) : (
          <>
            <select className="btn-agregar-proveedor" onClick={filtrarAlumnos}>
              <option value="1" selected onChange={filtrarAlumnos}>
                Todos
              </option>
              <option value="2" onChange={filtrarAlumnos}>
                Alumnos deudores
              </option>
              <option value="3" onChange={filtrarAlumnos}>
                Alumnos no deudores
              </option>
            </select>
            <div
              className="container-new-alumnos-list"
              style={{ backgroundColor: '#ffffff' }}
            >
              <div className="table-head-alumnos">
                <span style={{ fontSize: '1.8em' }}>Nombre</span>
                <span style={{ fontSize: '1.8em' }}>Clases</span>
                <span style={{ fontSize: '1.8em' }}>Deuda</span>
                <div
                  id="alumnos-searchbar"
                  className="list-options-header"
                  style={{ width: 'unset' }}
                >
                  <FontAwesomeIcon id="magnify-icon" icon={faMagnifyingGlass} />
                  <input
                    type="text"
                    placeholder="Busca un alumno"
                    onChange={handleChangeSearchAlumnno}
                  />
                </div>
              </div>

              {/* Lista de alumnos */}
              <AlumnosList
                alumnosFiltrados={alumnosFiltrados}
                setActAlu={setActAlu}
                actAlu={actAlu}
                setLoadingDetails={setLoadingDetails}
                loadingDetails={loadingDetails}
                calcularDeuda={calcularDeuda}
              />

              <div className="container-table-alumnos">
                <span>Deuda total:</span>
                <span>
                  {alumnos.reduce((acc, elem) => {
                    return acc + elem.deuda.montoCobros
                  }, 0)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
