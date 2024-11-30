import React, { useState, useEffect } from 'react'
import NavBar from 'pages/Navbar/NavBar'
import TablaHistorialPagos from './TablaHistorialPagos'
import LoaderSpinner from 'components/LoaderSpinner'
import { useSession } from '../../hooks/useSession'
import { getHistorialPagos } from 'api/cliente'
import FilterFormPago from './FilterFormPago'

const HistorialPagos = () => {
  const getCurrentMonthRange = () => {
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    return {
      fecha_inicio: firstDay.toISOString().split('T')[0],
      fecha_fin: lastDay.toISOString().split('T')[0],
      concepto: '',
      monto: '',
    }
  }

  const [historial, setHistorial] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState(getCurrentMonthRange())
  const user = useSession().session

  const fetchHistorialPagos = async (appliedFilters = {}) => {
    setIsLoading(true)
    try {
      const data = await getHistorialPagos(user.id, appliedFilters)
      setHistorial(data)
    } catch (error) {
      console.error('Error fetching historial pagos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormSubmit = (appliedFilters) => {
    setFilters(appliedFilters)
    fetchHistorialPagos(appliedFilters)
  }

  const handleResetFilters = () => {
    const defaultFilters = getCurrentMonthRange()
    setFilters(defaultFilters) // Actualizar los filtros al valor inicial
    fetchHistorialPagos(defaultFilters) // Recargar datos con filtros iniciales
  }

  useEffect(() => {
    fetchHistorialPagos(filters)
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
          <FilterFormPago
            onSubmitSuccess={handleFormSubmit}
            onResetFilters={handleResetFilters} // Pasar la función de reset
            userId={user.id}
            initialValues={filters} // Pasar los valores actuales del filtro
          />
          <TablaHistorialPagos data={historial} />
        </>
      )}
    </div>
  )
}

export default HistorialPagos
