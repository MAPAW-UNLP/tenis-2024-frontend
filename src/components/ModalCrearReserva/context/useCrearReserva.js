import { useContext } from 'react'
import { CrearReservaContext } from './CrearReservaContext'

export function useCrearReserva() {
  return useContext(CrearReservaContext)
}
