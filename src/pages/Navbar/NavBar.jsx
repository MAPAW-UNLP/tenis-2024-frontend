//react tools
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

/* Components */
import LinkItem from '../../components/LinkItem'
import ProfileSideBar from '../../components/ProfileMenu/ProfileSideBar'

import '../../styles/navbar.css'

import { useState } from 'react'
import { useSession } from '../../hooks/useSession'

const NavBar = ({ title }) => {
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
    <div id="navBar-component">
      <div id="navBar-transparent"></div>
      <nav id="navBar">
        <ul
          id="navBar-list"
          style={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          <LinkItem to={'/inicio'} setActive={setActive} name={'Inicio'} />
          <LinkItem to={'/reservas'} setActive={setActive} name={'Reservas'} />
          <LinkItem
            to={'/movimientos'}
            setActive={setActive}
            name={'Movimientos'}
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
                    />
                    <LinkItem
                      to={'/ausencias'}
                      setActive={setActive}
                      name={'Ausencias y suspenciones'}
                    />
                    <LinkItem
                      to={'/canchas'}
                      setActive={setActive}
                      name={'Canchas'}
                    />
                    <LinkItem
                      to={'/alumnos'}
                      setActive={setActive}
                      name={'Alumnos'}
                    />
                    <LinkItem
                      to={'/profesores'}
                      setActive={setActive}
                      name={'Profesores'}
                    />
                    <LinkItem
                      to={'/cobros'}
                      setActive={setActive}
                      name={'Cobros'}
                    />
                    <LinkItem
                      to={'/ajustes'}
                      setActive={setActive}
                      name={'Ajustes'}
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
                    />
                    <LinkItem
                      to={'/ausencias'}
                      setActive={setActive}
                      name={'Ausencias y suspenciones'}
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

          <li style={{ marginLeft: 'auto' }}>
            <ProfileSideBar />
          </li>
        </ul>
      </nav>
      <h1>{title}</h1>
    </div>
  )
}

export default NavBar
