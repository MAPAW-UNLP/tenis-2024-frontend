import React, { useEffect, useState } from 'react'
import { useSession } from '../../hooks/useSession'

import { getClasesAFavor } from 'api/cliente'

const ClasesAFavor = ({ onOpenModal }) => {
  const [clases, setClases] = useState(0)
  const [loading, setLoading] = useState(true)
  const { session } = useSession()

  const fetchClasesAFavor = async () => {
    try {
      const data = await getClasesAFavor(session.id)
      setClases(data)
    } catch (error) {
      console.error('Error fetching historial pagos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClasesAFavor()
  }, [])

  if (loading) {
    return <></>
  }

  return (
    <>
      {clases > 0 && (
        <div style={styles.cartel}>
          <p>Usted tiene {clases} clases a favor</p>
          <button style={styles.boton} onClick={onOpenModal}>
            Realizar acción
          </button>
        </div>
      )}
    </>
  )
}

const styles = {
  cartel: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  boton: {
    marginTop: '8px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
}

export default ClasesAFavor
