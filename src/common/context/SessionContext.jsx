import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export const SessionContext = createContext(null)

export function SessionProvider({ children }) {
  //para la sesion
  const navigate = useNavigate()
  const [session, setSession] = useState('')

  //sesion Effect D:
  useEffect(() => {
    const user = localStorage.getItem('session')
    if (user === '') {
      navigate('/')
    }
  }, [navigate, session])

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
