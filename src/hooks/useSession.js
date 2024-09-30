import { useContext } from 'react'
import { SessionContext } from '../context/SessionContext'

export function useSession() {
  return useContext(SessionContext)
}
