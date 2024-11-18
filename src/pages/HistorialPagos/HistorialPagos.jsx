import React, { useState, useEffect } from 'react'
import NavBar from 'pages/Navbar/NavBar'
import TablaHistorialPagos from './TablaHistorialPagos'
import LoaderSpinner from 'components/LoaderSpinner'
import { getHistorialPagos } from 'api/cliente'

const HistorialPagos = () => {
  const [historial, setHistorial] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getHistorialPagos('id').then((data) => {
      setHistorial(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <div id="home-component">
      <NavBar title={'Historial Pagos'} />
      {isLoading ? (
        <div style={{ position: 'relative' }}>
          <LoaderSpinner
            active={isLoading}
            containerClass={'homeLoader'}
            loaderClass={'homeLoaderSpinner'}
          />
        </div>
      ) : (
        <>
          <TablaHistorialPagos data={historial} />
        </>
      )}
    </div>
  )
}

export default HistorialPagos
