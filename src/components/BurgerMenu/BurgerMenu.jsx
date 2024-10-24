import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSession } from '../../hooks/useSession'
import LinkItem from '../../components/LinkItem'
import '../../styles/profilesidebar.css'
import '../../styles/burgermenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }
  const [active, setActive] = useState('link')
  const { session } = useSession()

  useEffect(() => {
    //cambia la clase active del nav y se las saca a los que no lo tienen
    var pathName = window.location.pathname
      .replace('/', '')
      .split(' ')
      .join(' ')
    pathName = pathName.charAt(0).toUpperCase() + pathName.slice(1)
    const links = Array.from(document.getElementsByClassName('link'))
    links.map((el) => {
      if (el.innerHTML === pathName) el.className += ' active'
      else {
        el.className = 'link'
      }
    })
  }, [active])

  return (
    <div className="burger-menu">
      {!isOpen && (
        <button onClick={toggleSidebar} className="profile-button">
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button onClick={toggleSidebar} className="close-btn">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="profile-sidebar-container">
          <h2 className="h2-sidebar">Opciones del Perfil</h2>

          <ul className="options-list">
            <LinkItem
              to={'/inicio'}
              setActive={setActive}
              name={'Inicio'}
              className="options-sidebar"
            />
            <LinkItem
              to={'/reservas'}
              setActive={setActive}
              name={'Reservas'}
              className="options-sidebar"
            />
            <LinkItem
              to={'/movimientos'}
              setActive={setActive}
              name={'Movimientos'}
              className="options-sidebar"
            />

            {(() => {
              switch (session.rolPorDefecto) {
                case 'ROLE_ADMIN':
                  return (
                    <>
                      <LinkItem
                        to={'/crearClase'}
                        setActive={setActive}
                        name={'Crear clase'}
                        className="options-sidebar"
                      />
                      <LinkItem
                        to={'/ausencias'}
                        setActive={setActive}
                        name={'Ausencias y suspenciones'}
                        className="options-sidebar"
                      />
                      <LinkItem
                        to={'/canchas'}
                        setActive={setActive}
                        name={'Canchas'}
                        className="options-sidebar"
                      />
                      <LinkItem
                        to={'/alumnos'}
                        setActive={setActive}
                        name={'Alumnos'}
                        className="options-sidebar"
                      />
                      <LinkItem
                        to={'/profesores'}
                        setActive={setActive}
                        name={'Profesores'}
                        className="options-sidebar"
                      />
                      <LinkItem
                        to={'/cobros'}
                        setActive={setActive}
                        name={'Cobros'}
                        className="options-sidebar"
                      />
                      <LinkItem
                        to={'/ajustes'}
                        setActive={setActive}
                        name={'Ajustes'}
                        className="options-sidebar"
                      />
                    </>
                  )
                case 'ROLE_PROFESOR':
                  return (
                    <>
                      <LinkItem
                        to={'/crearClase'}
                        setActive={setActive}
                        name={'Crear clase'}
                        className="options-sidebar"
                      />
                      <LinkItem
                        to={'/ausencias'}
                        setActive={setActive}
                        name={'Ausencias y suspenciones'}
                        className="options-sidebar"
                      />
                    </>
                  )
                case 'ROLE_CLIENTE':
                  return (
                    <>
                      {/* // Queda disponible para funciones exclusivas de cliente */}
                    </>
                  )
                default:
                  return null // Puedes agregar un mensaje de error o un componente por defecto aquí
              }
            })()}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BurgerMenu
