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
  const [selectedOption, setSelectedOption] = useState(null)
  const { logOut } = useSession()
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
    setExpanded(false)
  }

  const handleRolesClick = () => {
    setExpanded(!expanded)
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option)
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
  }

  const submitForm = () => {
    const formData = {
      param: selectedOption,
    }
    console.log('Form data:', formData)
  }

  // const habldeChangeROle = (e) => {
  //   e.preventDefault()

  //   const requestOptions = {
  //     method: 'PUT',
  //     body: JSON.stringify({ user: user, password: pass }),
  //   }
  //   fetch(`${URL_BASE}usuario`, requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.rta === 'ok') {
  //         logIn()
  //         setActiveLoader(false)
  //         navigate('../inicio')
  //       } else {
  //         setActive(true)
  //         const loginBtn = document.getElementById('login-btn')
  //         loginBtn.disabled = true
  //         setActiveLoader(false)
  //       }
  //     })
  // }

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
          <button
            className="list-toggle options-sidebar"
            onClick={handleRolesClick}
          >
            Roles
          </button>
          {expanded && (
            <ul className="options-list">
              <li
                onClick={() => handleOptionClick('admin')}
                className="options-sidebar"
              >
                Admin
              </li>
              <li
                onClick={() => handleOptionClick('profesor')}
                className="options-sidebar"
              >
                Profesor
              </li>
              <li
                onClick={() => handleOptionClick('cliente')}
                className="options-sidebar"
              >
                Cliente
              </li>
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
