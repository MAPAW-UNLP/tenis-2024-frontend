import { useState, useEffect } from 'react'

import { Profesor } from './Profesor'
import InputComponent from '../Utils/InputComponent'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export const ProfesoresList = ({
  profesores,
  setProfeDetail,
  profeDetail,
  setWillEdit,
  setLoadingDetails,
  loadingDetails,
}) => {
  const [profesoresFiltrados, setProfesoresFiltrados] = useState(profesores)

  const handleChangeSearchProfessor = (e) => {
    const profesorEnBusqueda = e.target.value

    const posibles = profesores.filter(
      (a) =>
        a.nombre.toUpperCase().includes(profesorEnBusqueda.toUpperCase()) ||
        a.email.includes(profesorEnBusqueda)
    )

    if (profesorEnBusqueda === '') {
      setProfesoresFiltrados(profesores)
    } else {
      setProfesoresFiltrados(posibles)
    }
  }

  useEffect(() => {
    setProfesoresFiltrados(profesores)
  }, [profesores])

  return (
    <>
      <div id="profesores-list-options">
        <p>Nombre</p>
        <p>Telefono</p>
        <p>Email</p>
        <p>Valor/Hora</p>
        <div id="profesores-searchbar">
          <FontAwesomeIcon id="magnify-icon" icon={faMagnifyingGlass} />
          <InputComponent
            type={'text'}
            placeholder={'Busca un profesor'}
            onChangeFuncion={handleChangeSearchProfessor}
          />
        </div>
      </div>
      <div id="profesores-list">
        {profesoresFiltrados.length > 0 ? (
          profesoresFiltrados.map((p) => (
            <Profesor
              key={p.id}
              info={p}
              setProfeDetail={setProfeDetail}
              profeDetail={profeDetail}
              setWillEdit={setWillEdit}
              loadingDetails={loadingDetails}
              setLoadingDetails={setLoadingDetails}
            />
          ))
        ) : (
          <p className="new-profesor-inside-title">Aun no se ha registrado ningún profesor.</p>
        )}
      </div>
    </>
  )
}
