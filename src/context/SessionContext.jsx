import { createContext, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Swal from 'sweetalert2'
import '../styles/alerts.css'

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

  function logIn(detail) {
    setSession({
      id: detail.id,
      roles: detail.roles,
      rolPorDefecto: detail.rolPorDefecto,
    })
  }

  function logOut() {
    setSession('')
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      iconColor: '#d18b3d',
      title: 'Se cerro la sesión',
      showConfirmButton: false,
      timer: 6000,
      background: '#fc9e33',
      color: 'black',
      toast: true,
      customClass: {
        popup: 'small-alert',
      },
    })
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
