//react tools
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

/* Components */
import LinkItem from '../../components/LinkItem'

import '../../styles/navbar.css'

import { useState } from 'react'
import { useSession } from '../../hooks/useSession'

const NavBar = ({ title }) => {
  const [active, setActive] = useState('link')
  const { logOut } = useSession()

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

  const esProfesor = true // Simula la sesión para ocultar elementos, eventualmente esta información debe
  // ser sacada de la sesión actual obtenida.

  return (
    <div id="navBar-component">
      <div id="navBar-transparent"></div>
      <nav id="navBar">
        <ul id="navBar-list">
          <LinkItem to={'/inicio'} setActive={setActive} name={'Inicio'} />
          <LinkItem to={'/reservas'} setActive={setActive} name={'Reservas'} />
          <LinkItem
            to={'/crearClase'}
            setActive={setActive}
            name={'Crear clase'}
          />
          {esProfesor ? (
            <>
              <LinkItem
                to={'/ausencias'}
                setActive={setActive}
                name={'Ausencias y suspenciones'}
              />
            </>
          ) : (
            <>
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
              <LinkItem to={'/cobros'} setActive={setActive} name={'Cobros'} />
              <LinkItem
                to={'/proveedores'}
                setActive={setActive}
                name={'Proveedores'}
              />
              <LinkItem
                to={'/movimientos'}
                setActive={setActive}
                name={'Movimientos'}
              />
              <LinkItem
                to={'/ajustes'}
                setActive={setActive}
                name={'Ajustes'}
              />
            </>
          )}
          <li>
            {' '}
            <Link to="/" className="linkCerrarSesion" onClick={logOut}>
              Cerrar Sesión{' '}
            </Link>
          </li>
        </ul>
      </nav>
      <h1>{title}</h1>
    </div>
  )
}

export default NavBar
