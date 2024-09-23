import { createContext, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const SessionContext = createContext(null)

export function SessionProvider({ children }) {
  const navigate = useNavigate()

  // Con el custom hook useLocalStorage todos los cambios al estado `session`
  // se actualizan automáticamente en el localStorage con la key 'session'
  const [session, setSession] = useLocalStorage('session', '')

  const isLoggedIn = useCallback(() => {
    return session === ''
  }, [session])

  useEffect(() => {
    // Si no tiene sesión iniciada enviar al log in
    if (isLoggedIn()) navigate('/')
  }, [isLoggedIn, navigate, session])

  function logIn() {
    setSession('sesión iniciada :D')
  }

  function logOut() {
    setSession('')
  }

  return (
    <SessionContext.Provider
      value={{
        session,
        logIn,
        logOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
