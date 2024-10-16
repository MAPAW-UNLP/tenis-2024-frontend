import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import '../../styles/profilesidebar.css'
import '../../styles/alerts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUser } from '@fortawesome/free-solid-svg-icons'
import { useSession } from '../../hooks/useSession'

const ProfileSideBar = () => {
  const URL_BASE = 'http://localhost:8083/api/'
  const [isOpen, setIsOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const { logOut } = useSession()
  const { logIn } = useSession()
  const { session } = useSession()
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
    setExpanded(false)
  }

  const handleRolesClick = () => {
    setExpanded(!expanded)
  }

  const handleChangeRole = (option) => {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({ id: session.id, rolPorDefecto: option }),
    }
    console.log(requestOptions)
    fetch(`${URL_BASE}usuario`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.rta === 'ok') {
          logIn({
            id: session.id,
            roles: session.roles,
            rolPorDefecto: option,
          })
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Cambio de Rol Exitoso!',
            showConfirmButton: false,
            timer: 6000,
            background: '#4CAF50',
            color: 'white',
            toast: true,
            customClass: {
              popup: 'small-alert',
            },
          })
        } else {
          Swal.fire({
            position: 'bottom-end',
            icon: 'warning',
            title: 'Fallo el cambio de Rol!',
            showConfirmButton: false,
            timer: 6000,
            background: '#b22222',
            color: 'white',
            toast: true,
            customClass: {
              popup: 'small-alert',
            },
          })
        }
      })
  }

  return (
    <>
      {!isOpen && (
        <button onClick={toggleSidebar} className="profile-button">
          <FontAwesomeIcon icon={faUser} />
        </button>
      )}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button onClick={toggleSidebar} className="close-btn">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="profile-sidebar-container">
          <h2 className="h2-sidebar">Opciones del Perfil</h2>
          {session.roles.length > 1 && (
            <button
              className="list-toggle options-sidebar"
              onClick={handleRolesClick}
            >
              Roles
            </button>
          )}

          {expanded && session.roles.length > 1 && (
            <ul className="options-list">
              {session.roles.map((role) => (
                <li
                  key={role}
                  onClick={() => handleChangeRole(role)}
                  className="options-sidebar"
                  style={{
                    fontWeight:
                      role === session.rolPorDefecto ? 'bold' : 'normal',
                  }}
                >
                  {role.replace('ROLE_', '').charAt(0).toUpperCase() +
                    role.replace('ROLE_', '').slice(1).toLowerCase()}
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/"
            className="linkCerrarSesion options-sidebar"
            onClick={logOut}
          >
            Cerrar Sesión{' '}
          </Link>
        </div>
      </div>
    </>
  )
}

export default ProfileSideBar
