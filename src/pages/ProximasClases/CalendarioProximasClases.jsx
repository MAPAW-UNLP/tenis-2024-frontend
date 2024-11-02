import React, { useState } from 'react'
import '../../styles/profilesidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUser } from '@fortawesome/free-solid-svg-icons'
import { useSession } from '../../hooks/useSession'

// Components
import LoaderSpinner from 'components/LoaderSpinner'
import { useEffect } from 'react'
const CalendarioProximasClases = () => {
  const URL_BASE = 'http://localhost:8083/api/'
  const { session } = useSession()
  const [isLoading, setIsLoading] = useState(true)

  const params = new URLSearchParams({
    clienteId: session.id,
    startDate: '2024-11-08',
  })
  const getNextClases = () => {
    fetch(`${URL_BASE}cliente/next-clases?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.rta === 'ok') {
          setIsLoading(false)
          console.log(data)
        } else {
          console.log('not ok')
        }
      })
  }

  useEffect(() => {
    getNextClases()
  }, [])

  return (
    <>
      {isLoading && (
        <div style={{ position: 'relative' }}>
          <LoaderSpinner
            active={isLoading}
            containerClass={'homeLoader'}
            loaderClass={'homeLoaderSpinner'}
          />
        </div>
      )}
    </>
  )
}

export default CalendarioProximasClases
