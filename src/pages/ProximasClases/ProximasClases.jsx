import React, { useState } from 'react'
import NavBar from 'pages/Navbar/NavBar'
import CalendarioProximasClases from './CalendarioProximasClases'
const ProximasClases = () => {
  return (
    <div id="home-component">
      <NavBar title={'Clases'} />
      <CalendarioProximasClases />
    </div>
  )
}

export default ProximasClases
