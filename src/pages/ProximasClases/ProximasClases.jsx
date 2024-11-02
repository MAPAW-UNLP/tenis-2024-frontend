import React, { useState } from 'react'
import '../../styles/profilesidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUser } from '@fortawesome/free-solid-svg-icons'
import { useSession } from '../../hooks/useSession'
import NavBar from 'pages/Navbar/NavBar'
import CalendarioProximasClases from './CalendarioProximasClases'
const ProximasClases = () => {
  const URL_BASE = 'http://localhost:8083/api/'
  const { session } = useSession()
  const [isLoading, setIsLoading] = useState(true)
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
        } else {
        }
      })
  }

  return (
    <div id="home-component">
      <NavBar title={'Clases'} />
      <CalendarioProximasClases />
    </div>
  )
}

export default ProximasClases
