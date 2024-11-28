import React, { useState, useEffect } from 'react'
import NavBar from 'pages/Navbar/NavBar'
import TablaHistorialPagos from './TablaHistorialPagos'
import LoaderSpinner from 'components/LoaderSpinner'
import { useSession } from '../../hooks/useSession'
import { getHistorialPagos } from 'api/cliente'
import FilterFormPago from './FilterFormPago'

const HistorialPagos = () => {
  const [historial, setHistorial] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const user = useSession().session
  useEffect(() => {
    getHistorialPagos(user.id).then((data) => {
      setHistorial(data)
      setIsLoading(false)
    })
  }, [])

  const handleFormSubmit = (filteredData) => {
    setHistorial(filteredData)
  }

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
          <FilterFormPago onSubmitSuccess={handleFormSubmit} userId={user.id} />
          <TablaHistorialPagos data={historial} />
        </>
      )}
    </div>
  )
}

export default HistorialPagos
